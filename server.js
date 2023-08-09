const express = require('express');
const Stack = require('./src/Stack');
const Queue = require('./src/Queue');


const app = express();
const PORT = process.env.PORT || 3001;
let pagerStack;
let pagerQueue;

let emptyTableStack;
let seatedTableQueue;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.status(200).json("hello world")
})


//init our  stack of pager
app.post('/addpagers', async (req, res) => {
    pagerStack = new Stack(req.body)
    pagerQueue = new Queue()

    emptyTableStack = new Stack([1, 2, 3])
    seatedTableQueue = new Queue()

    res.status(200).json({ pagerStack, pagerQueue, emptyTableStack ,seatedTableQueue })
})


app.post('/customerDoneEating', async (req, res) => {
    //customer is done eating left table

    //if theres is a Customer with a Pager than give him the tabel

    //remove seated table (queue) to an empty table (stack)
    const freeTable = seatedTableQueue.removeFromQueue()
    emptyTableStack.addToStack(freeTable)


    if (pagerQueue.container.length > 0) {
        const pager = pagerQueue.removeFromQueue()
        pagerStack.addToStack(pager)

        const customerTable = emptyTableStack.removeFromStack()
        seatedTableQueue.addToQueue(customerTable)
    }

    
    res.status(200).json({ emptyTableStack , seatedTableQueue })
       

})


app.post('/handToCustomer', async (req, res) => {

    if (emptyTableStack.container.length === 0) {
        const pager = pagerStack.removeFromStack()
        pagerQueue.addToQueue(pager)
        res.status(200).json(pager)

    } else {
        const firstEmptyTable = emptyTableStack.removeFromStack()
        seatedTableQueue.addToQueue(firstEmptyTable)
        res.status(200).json(firstEmptyTable)
    }
})

app.get('/status', (req, res) => {

    res.status(200).json({ pagerStack, pagerQueue, emptyTableStack ,seatedTableQueue })

})


app.listen(PORT, () => console.log('Now listening http://localhost:3001/'));






