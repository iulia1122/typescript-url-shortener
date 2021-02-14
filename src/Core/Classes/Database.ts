import { MongoClient, Timestamp } from "mongodb";

export default class Database {
    private client: MongoClient
    private collection: any

    constructor() {
        const uri = "mongodb://root:example@mongo:27017/admin";
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    public async connect() {
        this.client = await this.client.connect()
    }

    public async save(document: { longUrl: string, shortUrl: string }) {
        try {
            const collection = this.client.db("test").collection("urls");
            await collection.insertOne(document)
        } catch(error) {
            console.log(error)
        }
    }

    public async listAll() {
        try {
            let docs: any[] = []

            const collection = this.client.db("test").collection("urls");
            let cursor = collection.find()

            if ((await cursor.count()) === 0) {
                console.log("No documents found!");
            }

            await cursor.forEach((doc) => {
                return docs.push(doc)
            });

            return docs;
        } catch(error) {
            console.group(error)
        }
    }

    public async closeConnection () {
        return await this.client.close();
    }
}
