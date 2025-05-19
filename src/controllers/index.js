const pdfParse = require('pdf-parse');
const net = require('net');
const fs = require('fs').promises;

const uploadFile = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const data = await pdfParse(file.buffer);
    const text = data.text;

    const client = new net.Socket();
    let responseData = '';
    let responded = false; // <-- Add this flag

    client.connect(6666, '127.0.0.1', () => {
      client.write(text);
    });

    client.on('data', (data) => {
      responseData += data.toString();
      client.destroy();
    });

    client.on('close', () => {
      if (!responded) {
        responded = true;
        res.json({ message: responseData });
      }
    });

    client.on('error', (err) => {
      if (!responded) {
        responded = true;
        res.status(500).json({ error: text });
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to extract text from PDF', details: error.message });
  }
}

module.exports = uploadFile;

