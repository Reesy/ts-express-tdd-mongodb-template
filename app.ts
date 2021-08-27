import express from 'express';
import { MongoClientOptions, MongoClient } from 'mongodb';
import { config } from './config';
import { User } from './interfaces/user';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const url = `mongodb://${config.dbhost}:${config.dbport}`;
let options: MongoClientOptions = 
{
    auth: 
    {
        username: config.dbuser,
        password: config.dbpassword
    }
};

let mongoClient = new MongoClient(url, options);

mongoClient.connect();

let database = mongoClient.db("ts_mongo_tdd_users");

const users = database.collection<User>("users");


app.post('/api/v1/user', async (req: express.Request, res: express.Response) =>
{
  let body = req.body;

  if (typeof(body.name) === "undefined" )
  {
    res.status(400).json({ error: 'Name is required.' });
  };

  if (typeof(body.email) === "undefined" )
  {
    res.status(400).json({ error: 'Email is required.' });
  };

  let cursor = await users.find<User>({ email: body.email }).collation({ locale: 'en', strength: 2 });; 
  let savedUsers: User[] = await cursor.toArray();
  
  if (savedUsers.length > 0)
  {
    res.status(400).json({ error: 'User already exists.' });
    return;
  };
  
  let data: User = 
  {
    name: body.name,
    email: body.email
  };

  await users.insertOne(data);

  let responseMessage = `Added user ${data.name} to the database`;
  res.json(responseMessage);
  return;
});

app.get('/api/v1/users', async (req: express.Request, res: express.Response) =>
{
  let cursor = users.find<User>({},
    {
      projection: { _id: 0, name: 1, email: 1 }
    })
  
  let savedUsers: User[] = await cursor.toArray();
  res.json(savedUsers);
  return;
});

app.delete('/api/v1/user/:email', async (req: express.Request, res: express.Response) =>
{
  let email = req.params.email;
  let cursor = await users.find<User>({ email: email }).collation({ locale: 'en', strength: 2 });; 
  let savedUsers: User[] = await cursor.toArray();
 
  if (savedUsers.length === 0)
  {
    res.status(400).json({ error: 'User does not exist.' });
    return;
  };

  await users.deleteMany({ email: email }, {collation: { locale: 'en', strength: 2 }});

  res.json(`Deleted account with email '${email}' from the database`);
  return;
});

export { app };