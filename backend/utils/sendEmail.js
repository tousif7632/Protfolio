import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', //or use 'hotmail', 'yahoo', or SMTP config
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Md Tousif Alam" <${process.env.EMAIL_USERNAME}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

export default sendEmail;
