const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const postroute = require('./routes/postroute');
const athu = require("./routes/athu")
const path = require("path");
app.use('/images',express.static(path.join(__dirname,"/images")));
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
let mbstring = ''
mongoose.connect(mbstring)
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});
app.use("/api/posts",postroute);
app.use("/api/register",athu);

const port = 8080;
app.listen(port,()=>{
    console.log(`server is running on port ${port}...`);
})
