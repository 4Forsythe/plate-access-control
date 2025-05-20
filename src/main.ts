import express from 'express';
import type { Request, Response } from 'express';
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';

import 'dotenv/config';

import type { EnterSignal } from './types/enter-signal';
import { prisma } from './prisma-client';

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

app.post('/enter', async (req: Request, res: Response) => {
  try {
    const body = req.body as EnterSignal;

    const { plate } = body.signal;

    if (!plate) {
      res.status(400).json({ message: 'Missing plate number as parameter' });
      return;
    }

    console.log('PLATE:', plate);

    const now = new Date();

    const record = await prisma.plate.findFirst({
      where: {
        number: plate,
        expiresAt: {
          gt: now,
        },
      },
    });

    if (record) {
      res.status(200).send('True');
      return;
    }
    res.status(404).send('False');
  } catch (error) {
    console.error('Error during parsing xml body:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on ${PORT} port...`);
});
