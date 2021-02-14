import UrlController from '../src/Controllers/UrlController'

declare global {
    interface Array<T> {
        count(): Number
    }
}

Array.prototype.count = function () {
    return this.length;
};

function connect() {
    return {
        db: function () {
            return {
                collection() {
                    return {
                        find: function () {
                            return new Array()
                        },
                        insertOne: function() {
                            return true
                        }
                    }
                }
            }
        }
    }
}

function close() {
    return {}
}

jest.mock('mongodb', () => {
    return {
        MongoClient: function () {
            return {
                connect: connect,
                close: close
            }
        }
    }
})


test('it should return an empty array when you try to return al urls', async () => {

    let controller = new UrlController();
    let docs = await controller.getAllUrls()

    expect(docs).toEqual([])
}, 30000)

test('it should insert a document and return it', async () => {

    let controller = new UrlController();
    let doc = await controller.generateShortUrl('www.google.com')

    // check if url starts with https://pbid.io/ and ends with an 8 character string
    let split = doc.shortUrl.split('https://pbid.io/')

    let sufix = split[1]

    expect(split.length).toBeGreaterThan(0)
    expect(sufix.length).toEqual(8)
    expect(doc).toBeDefined()
}, 30000)
