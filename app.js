const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter')

const port = process.env.PORT || 8000;
const app = express();

mongoose.connect('mongodb+srv://admin:admin1234@cluster0.8ahdh5b.mongodb.net/?retryWrites=true&w=majority/userdata',{useNewUrlParser:true})
const db = mongoose.connection;

db.on("error",()=>{console.log("error in conection");})
db.once('open',()=>{console.log("Connected");})

app.set('view engine','ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/', homeRouter)


app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
})