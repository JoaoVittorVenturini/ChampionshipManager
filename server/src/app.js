import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

import router from './routes.js';
app.use(router);

app.listen(7070, () => console.log(`Server running on port 7070`));    

https.createServer({
    cert: fs.readFileSync('server/src/SSL/code.crt'),
    key: fs.readFileSync('server/src/SSL/code.key')
}, app).listen(8000, () => console.log("Server Running https on port 8000"));   