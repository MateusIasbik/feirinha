import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let shoppingList = [
    {
        id: 1,
        name: "laranja",
        quantity: 10,
        type: "fruta"
    },
    {
        id: 2,
        name: "melancia",
        quantity: 5,
        type: "fruta"
    },
    {
        id: 3,
        name: "banana",
        quantity: 12,
        type: "fruta"
    },
    {
        id: 4,
        name: "batata",
        quantity: 8,
        type: "legume"
    },
    {
        id: 5,
        name: "abóbora",
        quantity: 4,
        type: "legume"
    },
    {
        id: 6,
        name: "leite",
        quantity: 10,
        type: "lácteo"
    },
    {
        id: 7,
        name: "queijo",
        quantity: 4,
        type: "lácteo"
    },
];

app.post("/items", (req, res) => {

    const item = req.body;
    const {name, quantity, type} = req.body;

    if(!name || !quantity || !type) {
        res.status(422).send("Todos os campos são obrigatórios!");
        return;
    }

    if(shoppingList.find(name => shoppingList.name === name)) {
        res.status(409).send("Este produto já existe!");
        return;
    }

    shoppingList.push({
        id: shoppingList.length + 1, 
        ...item
    });

    res.status(201).send("Item adicionado com sucesso!");
})




app.listen(5000, () => {
    console.log("Rodando em http://localhost:5000");
  });