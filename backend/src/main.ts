// Import required depencies
import express, { Request, Response, json } from 'express';
import cors from 'cors';

const server = express();
const PORT = 9000;

server.use(json())
server.use(cors())

const db: any = {
  worlds:{}
};

interface WorldCreateArgs {
  name :string
}

const world = {
  create: ({ name }: WorldCreateArgs) => {
    db.worlds[name] = {
      name,
      created: new Date().toISOString(),
      id: Date.now(),
    };

    return "Creating world with name: " + JSON.stringify(name);
  },

  list: () => {
    return Object.keys(db.worlds).join("\n");
  },

  delete: (name: string) => {
    delete db.worlds[name];
    return true;
  },
  rename: (newName: string) => {},
};

const user: any = {
  create: ()=>{},
  edit: ()=>{},
  resetPassword: ()=>{},
}

const character: any = {
  create: ()=>{},
  edit: ()=>{},
  kill: ()=>{},
  getFriends: ()=>{},
}

const util: any = {
  help: ()=>{
    const commandsList: {[command: string]: string[]} = {};

    Object.keys(commands).forEach(object => {
      commandsList[object] = [];
      Object.keys(commands[object]).forEach(action =>{
        commandsList[object].push(action);
      })
    });
    return commandsList;
  }
}

const commands: any = {
  world,
  user,
  character,
  util
}

server.post('/api', (req:Request, res: Response) => {
  const command = req.body.cmd || 'error'
  const [object, action]: [string, string] = command.split(".");

  const args = req.body.args || {};

  try {
    res.send(JSON.stringify(commands[object][action](args)));
  } catch (err) {
    res.send(err)
  }
});


// Start the server and start listening
server.listen(PORT, () => {
  // Establish DB connection
  console.log(`Listening on port ${PORT}`);
});
