//CommonJS modules
const express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    dbName = 'tasks';

let db;
require('dotenv').config()
const dbConnectionString = process.env.DB_STRING
connectDB()

//MiddleWares
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())



//===============================================
// ROUTES
//===============================================

app.get('/', async (req,res) => {
    let tasks = await db.collection(dbName).find().toArray()
    console.log(tasks)
    res.render('index.ejs', {taskList: tasks})
})



app.post('/addtask', async (req, res) => {
    let response = await db.collection(dbName).insertOne({
        task: req.body.task,
        done: false
    })
    console.log(response)
    res.redirect('/')
})























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

