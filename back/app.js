import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();
const port = 3000;



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



import authRoutes from './routes/auth.js';
import siteRoutes from './routes/site.js';

app.use('/auth', authRoutes);
app.use('/', siteRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})