import Database from "../Core/Classes/Database"
import UrlGenerator from "../Core/Classes/UrlGenerator"

export interface UrlDocument {
    _id?: string,
    longUrl: string,
    shortUrl: string
}

export default class UrlController {

    public async generateShortUrl(url : string) {

        let db = new Database("mongodb://root:example@mongo:27017/admin", "test", "urls")

        await db.connect()
    
        let document = {
            longUrl: url,
            shortUrl: `https://pbid.io/${new UrlGenerator().execute()}`
        }
        await db.save(document)
    
        db.closeConnection()

        return document;
    }

    public async getAllUrls() {
        let db = new Database("mongodb://root:example@mongo:27017/admin", "test", "urls")

        await db.connect()
    
        let docs = await db.listAll()
        db.closeConnection()

        return docs;
    }
}