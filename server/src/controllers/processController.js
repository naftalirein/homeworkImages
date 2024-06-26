// controllers/processController.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.processFile = async (req, res) => {
  const filePath = req.query.filePath;

  if (!filePath) {
    return res.status(400).send('File path is required.');
  }

  try {
    const response = await axios.post('http://127.0.0.1:3020/process_image', {
      image_path: filePath
    });

    const data = response.data;

    if (data.error) {
      console.error('Error:', data.error);
      return res.status(500).send('Error processing image.');
    }

    const folderPath = path.join('public', 'images', data.toString().trim());

    fs.readdir(folderPath, (err, files) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // Folder doesn't exist, return an empty string
          return res.send('');
        } else {
          console.error(`Error reading folder: ${err}`);
          return res.status(500).send('An error occurred while reading the folder.');
        }
      }

      console.log(files);
      const filePaths = files.map(file => path.join('images', data.toString().trim(), file));
      res.send(filePaths.join(','));
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('An error occurred while processing the request.');
  }
};