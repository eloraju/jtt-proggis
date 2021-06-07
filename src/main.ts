// Import required depencies
import express, { Request, Response, json } from 'express';

const server = express();
const PORT = 9000;

server.use(json())

const db: any = {
  worlds:{}
};

const world = {
  create: (name: string) => {
    db.worlds[name] = {
      name,
      created: new Date().toISOString(),
      id: Date.now()
    };

    return `Should create world ${name}`
  },

  list: () => {
    return Object.keys(db.worlds).join("\n");
  },

  delete: (name: string) => {
      delete db.worlds[name];
      return true;
  }
};

const objects: any = {
  world: world
}

server.post('/api', (req:Request, res: Response) => {
  const command = req.body.cmd || 'error'
  const [object, action]:[string, string] = command.split(".");

  const args = req.body.args || {};

  try {
    res.send(objects[object][action](args));
  } catch (err) {
    res.send(err)
  }
});


// Start the server and start listening
server.listen(PORT, () => {
  // Establish DB connection
  console.log(`Listening on port ${PORT}`);
});
