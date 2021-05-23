import express, {Request, Response} from "express";

const app = express();
const port = 9000;

app.get("/morotin", (req: Request, res: Response) => {
    const lan = req.query.lan;
    if (lan === "1"){
        res.send("Hello dude");
    } else if (lan === "2"){
        res.send("Moro");
    } else {
        res.send("Idiot");
    }
});

app.listen(port, () => {
    console.log(`Server is good, listening on ${port}`);
})