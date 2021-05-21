// Import required depencies
import express, { Request, Response } from 'express';

enum Languages {
    English = 'en',
    Finnish = 'fi'
};

function getGreeting(lan: Languages) {
    switch (lan) {
        case Languages.English: return 'Hello';
        case Languages.Finnish: return 'Moro';
        default: throw Error('Unsupported language');
    }
}

// Create server
const server = express();
const PORT = 9000;

// Create listeners for supported protocols

// /morotin
//server.get('/morotin',(req: Request, res: Response) => {
//    const asdf = req.params.language;
//    res.statusCode = 200;
//    res.send('Moro!');
//});

// /morotin?lan=en
server.get('/morotin', (req: Request, res: Response) => {
    // Assumption: The user will ALWAYS provide us with a 
    // language option

    try {
        const lan = req.query.lan as Languages;
        const greeting = getGreeting(lan);
        res.statusCode = 200;
        res.send(greeting);
    } catch (e) {
        res.statusCode = 500;
        res.send(e.message);
    }

});

// /morotin/en
//server.get('/morotin/:lan',(req: Request, res: Response) => {
//    const asdf = req.params.language;
//    res.statusCode = 200;
//    res.send('Moro!');
//});

// Start the server and start listening
server.listen(PORT, () => {
    // Establish DB connection
    console.log(`Listening on port ${PORT}`);
});