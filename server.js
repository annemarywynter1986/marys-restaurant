const express = require('express');
const Stack = require('./src/Stack');
const Queue = require('./src/Queue');


const app = express();
const PORT = process.env.PORT || 3001;
let pagerStack;
let pagerQueue;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.status(200).json("hello world")
})


//init our  stack of pager
app.post('/addpagers', async (req, res) => {
    pagerStack = new Stack(req.body)
    pagerQueue = new Queue()

    res.status(200).json({ pagerStack, pagerQueue })
})


app.post('/customerCheckin', async (req, res) => {

    const pager = pagerQueue.removeFromQueue()
    pagerStack.addToStack(pager)

    res.status(200).json({ pagerStack, pagerQueue })
})


app.post('/handToCustomer', async (req, res) => {
    const pager = pagerStack.removeFromStack()
    pagerQueue.addToQueue(pager)


    res.status(200).json(pager)
})

app.get('/status', (req, res) => {

    res.status(200).json({ pagerStack, pagerQueue })

})


app.listen(PORT, () => console.log('Now listening http://localhost:3001/'));