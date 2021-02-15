import express from 'express';
let bodyParser = require('body-parser');
let cors = require('cors');
let validator = require('validator');

import UrlController from './Controllers/UrlController'

let app = express();
let port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.options('*', cors())

app.post('/url/shorten', async (req, res) => {

    let longUrl = req.body.url

    if (!longUrl) {
        return res.send('Missing url parameter').status(422)
    }

    if (!validator.isURL(longUrl)) {
        return res.status(422).send('Invalid url')
    }

    let document :{any: any} | {} = {}

    try {

        let controller = new UrlController();
        document = await controller.generateShortUrl(longUrl)
        return res.send(document).status(201)

    } catch (error) {
        return res.send('Something went wrong.').status(422)
    }


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