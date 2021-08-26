import express from 'express';
import { Database } from './database';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


let database = new Database;
database.connect('ts_mongo_tdd');

app.post('/api/v1/user', async (req: express.Request, res: express.Response) =>
{
  let body: any = req.body;

  if (typeof(body.name) === "undefined" )
  {
    res.status(400).json({ error: 'Name is required.' });
  };

  if (typeof(body.email) === "undefined" )
  {
    res.status(400).json({ error: 'Email is required.' });
  };

  let data = 
  {
    name: body.name,
    email: body.email
  };

  await database.add(data, "Users")

  let responseMessage = `Added user ${data.name} to the database`;
  res.json(responseMessage);
});

app.get('/api/v1/users', async (req: express.Request, res: express.Response) =>
{

  res.json("Hello");
});


export { app };