import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async ({ name, email, phone, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD, // Use the correct environment variable for password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.TO_EMAIL,
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>📩 New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
