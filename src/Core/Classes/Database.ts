import { MongoClient } from "mongodb";

export default class Database {
    private client: MongoClient
    private uri: string
    private database: string
    private collection: string

    constructor(uri : string, database: string, collection: string) {
        this.uri = uri;
        this.database = database;
        this.collection = collection;

        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    public async connect() {
        this.client = await this.client.connect()
    }

    public async save(document: any) {
        try {
            const collection = this.client.db(this.database).collection(this.collection);
            await collection.insertOne(document)
        } catch(error) {
            console.log(error)
        }
    }

    public async listAll() {
        try {
            let docs: any[] = []

            const collection = this.client.db(this.database).collection(this.collection);
            let cursor = collection.find()

            if ((await cursor.count()) === 0) {
                console.log("No documents found!");
            }

            await cursor.forEach((doc) => {
                return docs.push(doc)
            });

            return docs;
        } catch(error) {
            console.log(error)
        }
    }

    public async closeConnection () {
        return await this.client.close();
    }
}
