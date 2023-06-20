import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

import router from './routes';
app.use(router);

app.listen(7070, () => console.log(`Server running on port 7070`));    

<<<<<<< HEAD
https.createServer({
    cert: fs.readFileSync('server/src/SSL/code.crt'),
    key: fs.readFileSync('server/src/SSL/code.key')
}, app).listen(8000, () => console.log("Server Running https on port 8000"));   
=======
app.listen(8000, () => console.log(`Server running on port 7070`));    
>>>>>>> 78d3d95a96ea3dc5c5992a98ddbce3c485be9957
