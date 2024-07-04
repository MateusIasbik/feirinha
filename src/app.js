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

// MUDAR O 5001 PARA 5000 ANTES DE ENTREGAR O PROJETO

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



app.post("/items", (req, res) => {

    const item = req.body;
    const {name, quantity, type} = req.body;

    if(!name || !quantity || !type) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Todos os campos são obrigatórios!");
        return;
    }

    if(shoppingList.find(name => shoppingList.name === name)) {
        res.status(httpStatus.CONFLICT).send("Este produto já existe!");
        return;
    }

    shoppingList.push({
        id: shoppingList.length + 1, 
        ...item
    });

    res.status(httpStatus.CREATED).send("Item adicionado com sucesso!");
})

// MUDAR O 5001 PARA 5000 ANTES DE ENTREGAR O PROJETO
app.listen(5001, () => {
    console.log("Rodando em http://localhost:5000");
  });