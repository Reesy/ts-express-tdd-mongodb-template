import express from 'express';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/v1/score', async (req: express.Request, res: express.Response) =>
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

  await UserDatabase.save(body.name, body.score);
  let responseMessage = `The body was: ${body}!`;
  res.json(responseMessage);
});

app.get('/api/v1/leaderboard', async (req: express.Request, res: express.Response) =>
{
  await UserDatabase.getUsers();
});

export { app };