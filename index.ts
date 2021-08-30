import { app } from './app';
import { config } from './config';

//read prod env and set properties.


let main = async () => {

   // await Database.connect("admin");

    app.listen(config.port, () =>
    {
      console.log(`Server listening on port ${config.port}`);
    });
    
};

main();