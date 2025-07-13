import Contact from '../models/Contact.js';
import sendContactEmail from '../utils/sendContactEmail.js'

export const createContact = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
    // Save to DB
    const contact = await Contact.create({ name, email, phone, subject, message });

    // Send email to YOU
    await sendContactEmail({ name, email, phone, subject, message });

    res.status(201).json({
      message: 'Message sent successfully. We will contact you soon!',
      data: contact,
    });
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
