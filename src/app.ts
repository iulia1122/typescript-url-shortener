import express from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');

import Database from './Core/Classes/Database';
import UrlGenerator from './Core/Classes/UrlGenerator';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.options('*', cors())

app.post('/url/shorten', async (req, res) => {

    if(!req.body.url) {
        return res.send('Missing url parameter').status(422)
    }

    let longUrl = req.body.url

    let db = new Database()

    await db.connect()

    let document = {
        longUrl: longUrl,
        shortUrl: `https://pbid.io/${new UrlGenerator().execute()}`
    }
    await db.save(document)

    db.closeConnection()
    return res.send(document).status(201)
});

app.get('/url/all', async (req, res) => {
  
    let db = new Database()

    await db.connect()

    let docs = await db.listAll()
    db.closeConnection()
    return res.send(docs).status(200)
})


app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});


// docker-compose -f stack.yml up

// docker run -p 3000:3000 backend

// docker build -t backend .