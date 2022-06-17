//CommonJS modules
const express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    dbName = 'tasks';
let db;

//use of .env files
require('dotenv').config()

//use .env file for connection string
const dbConnectionString = process.env.DB_STRING

// function call to connect to DB
connectDB()


//MiddleWares
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())


//===============================================
// ROUTES
//===============================================

// root request
app.get('/', async (req,res) => {
    let tasks = await db.collection(dbName).find().toArray()
    res.render('index.ejs', {taskList: tasks})
})

//Create request to create a new task
app.post('/addtask', async (req, res) => {
    if(!req.body.task) return res.redirect('/')

    let taskReq = req.body.task.trim()
    let response = await db.collection(dbName).insertOne({
        task: taskReq,
        done: false
    })
    console.log(response)
    res.redirect('/')
})

//Update request to mark task as complete
app.put('/markdone', async (req,res) => {
    let response = await db.collection(dbName).updateOne( {
        task: req.body.task,
    },{
        $set : {
            done : true
        }
    })
    console.log(response)
    res.json('Update Completed')
})

//Update request to mark task as incomplete
app.put('/markundone', async (req,res) => {
    let response = await db.collection(dbName).updateOne( {
        task: req.body.task,
    },{
        $set : {
            done : false
        }
    })
    console.log(response)
    res.json('Update Completed')
})

//Delete request to clear a single task
app.delete('/deletetask', async (req,res) => {
    console.log(req.body)
    let response = await db.collection(dbName).deleteOne( {
        task: req.body.task,
    })
    console.log(response)
    res.json('Delete Successful')
})

//DELETE request to clear all tasks
app.delete('/deleteall', async (req,res) => {
    let response = await db.collection(dbName).deleteMany({})
    console.log(response)
    res.json('Clear successful')
})

//Connect to MongoDB
async function connectDB() {
    try {
        const client = await MongoClient.connect(dbConnectionString, { useUnifiedTopology: true })
        console.log('Connected to database')
        db = await client.db(dbName)

    } catch (error) {
        console.error(error)
    }


}

const PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

