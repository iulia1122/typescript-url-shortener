import express from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');

import UrlController from './Controllers/UrlController'

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.options('*', cors())

app.post('/url/shorten', async (req, res) => {

    if (!req.body.url) {
        return res.send('Missing url parameter').status(422)
    }

    let longUrl = req.body.url
    let document :{any: any} | {} = {}

    try {

        let controller = new UrlController();
        document = controller.generateShortUrl(longUrl)

    } catch (error) {
        return res.send('Something went wrong.').status(422)
    }

    return res.send(document).status(201)
});

app.get('/url/all', async (req, res) => {

    let docs: any[] | undefined = []

    try {

        let controller = new UrlController();
        docs = await controller.getAllUrls()

    } catch (error) {
        return res.send('Something went wrong.').status(422)
    }

    return res.send(docs).status(200)
})


app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});


// docker-compose -f stack.yml up

// docker run -p 3000:3000 backend

// docker build -t backend .