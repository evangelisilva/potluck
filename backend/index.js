const express = require('express');
const bodyParser = require('body-parser');
const { sendEmail } = require('./SESSendEmail');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running'); 
});  

// Endpoint to send templated email
app.post('/api/send-email', async (req, res) => {
  const { to, templateName, templateData } = req.body;

  try {
    await sendEmail(to, templateName, templateData);
    res.json({ message: 'Templated email sent successfully' });
  } catch (error) {
    console.error('Error sending templated email:', error);
    res.status(500).json({ error: 'Failed to send templated email' });
  }
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
