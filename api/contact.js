const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Nama, email, dan pesan wajib diisi.' });
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || 'thoriq.sys@gmail.com';
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpPass) {
      console.error('SMTP_PASS is missing in environment variables');
      return res.status(500).json({ error: 'Server configuration error: SMTP_PASS not set.' });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: process.env.TO_EMAIL || 'thoriq.sys@gmail.com',
      subject: `[Pesan Portofolio] dari ${name}`,
      text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #e0a93b; border-bottom: 2px solid #e0a93b; padding-bottom: 8px;">Pesan Baru dari Web Portofolio</h2>
          <p><strong>Nama Pengirim:</strong> ${name}</p>
          <p><strong>Email Pengirim:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Isi Pesan:</strong></p>
          <div style="white-space: pre-wrap; background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #e0a93b; color: #333333;">${message}</div>
          <br/>
          <p style="font-size: 0.8rem; color: #888888;">Email ini dikirim otomatis via Vercel Serverless Function & Nodemailer.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Pesan berhasil dikirim!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ error: error.message || 'Gagal mengirim email.' });
  }
};
