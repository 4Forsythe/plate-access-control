import express from 'express';
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';

import 'dotenv/config';

const PORT = Number(process.env.PORT) || 3000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

const app = express();

bodyParserXml(bodyParser);

app.use(
  bodyParser.xml({
    limit: '1MB',
    xmlParseOptions: {
      explicitArray: false,
    },
  })
);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.post('/enter', (req, res) => {
  res.status(200);
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on ${PORT} port...`);
});
