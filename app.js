const express = require('express');
const app = express();
const mongoose = require('mongoose');
const profileroutes= require('./routes/route')
var cors = require('cors')
const bodyparser= require('body-parser');
app.get((req, res) => {
   res.send('We are at home')

});
app.use(cors());
app.use(bodyparser.json());
app.use('/posts',profileroutes)




mongoose.connect("mongodb+srv://himu:himu@cluster0.qkmvt.mongodb.net/profiles?retryWrites=true&w=majority",{ useNewUrlParser: true },()=>{
    console.log('connected to db')
})
app.listen(5000);