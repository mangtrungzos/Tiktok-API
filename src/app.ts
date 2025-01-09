import express, { Request, Response, NextFunction, RequestHandler} from "express";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + '/../.env' });
const app = express();
const port = process.env.PORT;
app.use(express.json());

let users = [
    {
        id: 1,
        name: "Quynh Pham"
    },
    {
        id: 2,
        name: "Queen"
    },
    {
        id: 3,
        name: "Dev"
    },
    {
        id: 4,
        name: "Chau Ngan"
    }
];

// CREATE
app.post('/users', (req: Request, res: Response) => {
    const newUser = {
        name: req.body.name,
        id: Date.now(),
    };
    users.push(newUser);
    res.json(newUser);
});

// READ
app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

// UPDATE
app.put('/users', (req: Request, res: Response) => {
    const { id, name } = req.body;
    users = users.map(user => {
        if (user.id === id) {
            user.name = name;
        }
        return user;
    });
    res.json(users);
});

// DELETE
app.delete('/users', (req: Request, res: Response) => {
    const { id } = req.body;
    // user.id different id -> array is still the same
    // user.id = id -> remove element
    users = users.filter((user) => user.id !== id);
    res.json(users);
});

const isAuthorized: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const auHeader = req.headers.authorization;
    if (auHeader === "mysecretevalue") {
        next();
    } else {
        res.status(401);
        res.json({ msg: 'No access' });
    }
};

// GET one user
app.get('/users/:id', isAuthorized, (req: Request, res: Response) => {
    const id = +req.params.id;
    const user = users.filter(user => user.id === id)[0];
    res.json(user);
})

// starts
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});