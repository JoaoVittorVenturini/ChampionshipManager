import express from 'express';
const app = express();
app.use(express.json());

import router from './routes';
app.use(router);


app.listen(8000, () => console.log(`Server running on port 7070`));    