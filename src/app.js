import express from "express";
import cors from "cors";
import httpStatus from "http-status";

const app = express();
app.use(cors());
app.use(express.json());

let shoppingList = [
    {
        id: 1,
        name: "Laranja",
        quantity: 10,
        type: "fruta"
    },
    {
        id: 2,
        name: "Melancia",
        quantity: 5,
        type: "fruta"
    },
    {
        id: 3,
        name: "Banana",
        quantity: 12,
        type: "fruta"
    },
    {
        id: 4,
        name: "Batata",
        quantity: 8,
        type: "legume"
    },
    {
        id: 5,
        name: "Abóbora",
        quantity: 4,
        type: "legume"
    },
    {
        id: 6,
        name: "Leite",
        quantity: 10,
        type: "lácteo"
    },
    {
        id: 7,
        name: "Queijo",
        quantity: 4,
        type: "lácteo"
    },
];

app.get("/items", (req, res) => {

    const { type, name } = req.query;
    let filterItems = shoppingList;

    if (type) {
        filterItems = filterItems.filter(item => item.type === type);
    }
    if (name) {
        filterItems = filterItems.filter(item => item.name === name)
    }
    res.status(httpStatus.OK).send(filterItems);
})

app.get("/items/:id", (req, res) => {

    const id = Number(req.params.id);
    const itemID = shoppingList.find(item => item.id === id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(httpStatus.BAD_REQUEST).send("Busque apenas por números inteiros positivos");
    }
    if (!itemID) {
        res.status(httpStatus.NOT_FOUND).send("ID não encontrado");
    }
    res.status(httpStatus.OK).send(itemID);
})

app.post("/items", (req, res) => {

    const item = req.body;
    const { name, quantity, type } = req.body;

    if (!name || !quantity || !type) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Todos os campos são obrigatórios!");
    }

    if (shoppingList.find(existingName => existingName.name === name)) {
        return res.status(httpStatus.CONFLICT).send("Este produto já existe!");
    }

    shoppingList.push({
        id: shoppingList.length + 1,
        ...item
    });

    res.status(httpStatus.CREATED).send("Item adicionado com sucesso!");
})

app.listen(5000, () => {
    console.log("Servidor rodando em http://localhost:5000");
});