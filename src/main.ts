// Import required dependecies


import express, {Request, Response} from 'express';


enum Languages {
	English = 'en',
	Finnish = 'fi'
};


function getGreeting(lan: Languages) {
	switch(lan) {
		case Languages.English: return 'Hello';
		case Languages.Finnish: return 'Moro';
		default: throw Error('Unsupported language');
	}

}


// Create server


const server = express();


// Create listener functions
// localhost:9000/morotin
// /morotin?lan=en


server.get('/morotin', (req: Request, res: Response) => {
	
	// Assumption: user will always provide us with a
	// lanquage option

	try {
		const lan = req.query.lan as Languages;
		let greeting = getGreeting(lan);
		res.statusCode = 200;
		res.send(greeting);
	} catch(e) {
		res.statusCode = 500;
		res.send(e.message);
	}

	
});


// Start the server and start


server.listen(9000, () => {
	// Establish DB connection
	console.log('Listening on port 9000')
});