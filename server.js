const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
