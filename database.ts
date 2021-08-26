import { MongoClient, MongoClientOptions } from "mongodb";
import { config } from "./config";

class Database
{
    public mongoClient: any;
    public db: any;
    
    constructor()
    {
        const url = `mongodb://${config.dbhost}:${config.dbport}`;
        let options: MongoClientOptions = 
        {
            auth: 
            {
                username: config.dbuser,
                password: config.dbpassword
            }
        };
        this.mongoClient = new MongoClient(url, options);
        
    };

    public async connect(_dbname: string)
    {
        await this.mongoClient.connect();
        this.db = this.mongoClient.db(_dbname);
        return;
    };

    public async add(data: any, collectionName: string)
    {   
        const collection = this.db.collection(collectionName);
        await collection.insertOne(
        { 
            data
        });
        
        return;
    };

    public async update(data: any)
    {
        throw 'not yet implemented';
    };

    public async get()
    {
        throw 'not yet implemented';
    };

    public async delete()
    {
        throw 'not yet implemented';
    };


};

export { Database };