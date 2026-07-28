import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Nama, email, dan pesan wajib diisi.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. Simpan ke database Supabase (Backup)
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await supabase.from('contacts').insert([
          { name, email, message, created_at: new Date().toISOString() }
        ]);
      } catch (dbErr) {
        console.error('Database log error:', dbErr);
      }
    }

    // 2. Kirim email via SMTP (Gmail App Password)
    const smtpHost = Deno.env.get('SMTP_HOST') || 'smtp.gmail.com';
    const smtpPort = Number(Deno.env.get('SMTP_PORT')) || 465;
    const smtpUser = Deno.env.get('SMTP_USER') || 'thoriq.sys@gmail.com';
    const smtpPass = Deno.env.get('SMTP_PASS'); // Gmail App Password (16 karakter)

    if (smtpPass) {
      const client = new SmtpClient();
      await client.connectTLS({
        hostname: smtpHost,
        port: smtpPort,
        username: smtpUser,
        password: smtpPass,
      });

      await client.send({
        from: smtpUser,
        to: 'thoriq.sys@gmail.com',
        subject: `[Pesan Portofolio] dari ${name}`,
        content: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="color: #e0a93b; border-bottom: 2px solid #e0a93b; padding-bottom: 8px;">Pesan Baru dari Web Portofolio</h2>
            <p><strong>Nama Pengirim:</strong> ${name}</p>
            <p><strong>Email Pengirim:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Isi Pesan:</strong></p>
            <div style="white-space: pre-wrap; background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #e0a93b; color: #333333;">${message}</div>
            <br/>
            <p style="font-size: 0.8rem; color: #888888;">Email ini dikirim otomatis melalui Supabase Edge Function & Gmail SMTP.</p>
          </div>
        `,
      });

      await client.close();
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Pesan berhasil dikirim!' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Terjadi kesalahan pada server.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
