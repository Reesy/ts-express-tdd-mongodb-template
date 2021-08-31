import express from 'express';
import { Collection } from 'mongodb';
import { config } from './config';
import { User } from './interfaces/user';

class APIComponent 
{
  
  private users: Collection<User>
  public app: express.Application;

  constructor(_config: config, _users: Collection<User>)
  {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.users = _users;
  };


  public async init()
  {
    this.app.post('/api/v1/user', async (req: express.Request, res: express.Response) =>
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

      let cursor = await this.users.find<User>({ email: body.email }).collation({ locale: 'en', strength: 2 });; 
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

      await this.users.insertOne(data);

      let responseMessage = `Added user ${data.name} to the database`;
      res.json(responseMessage);
      return;
    });

    this.app.get('/api/v1/users', async (req: express.Request, res: express.Response) =>
    {
      let cursor = this.users.find<User>({},
        {
          projection: { _id: 0, name: 1, email: 1 }
        })
      
      let savedUsers: User[] = await cursor.toArray();
      res.json(savedUsers);
      return;
    });

    this.app.delete('/api/v1/user/:email', async (req: express.Request, res: express.Response) =>
    {
      let email = req.params.email;
      let cursor = await this.users.find<User>({ email: email }).collation({ locale: 'en', strength: 2 });; 
      let savedUsers: User[] = await cursor.toArray();
    
      if (savedUsers.length === 0)
      {
        res.status(400).json({ error: 'User does not exist.' });
        return;
      };

      await this.users.deleteMany({ email: email }, {collation: { locale: 'en', strength: 2 }});

      res.json(`Deleted account with email '${email}' from the database`);
      return;
    });
  };

  public async start()
  {
    
    this.app.listen(config.port, () =>
    {
      console.log(`Server listening on port ${config.port}`);
    });
    
    return;
  };

};

export { APIComponent };