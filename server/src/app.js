import express from 'express';
const app = express();
app.use(express.json());

import router from './routes.js';
app.use(router);


app.listen(7070, () => console.log(`Server running on port 7070`));    