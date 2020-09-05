const express  = require("express");
const cors  = require("cors");
const mongoose = require("mongoose")

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const {PORT,DATABASE} = require("./config")



mongoose.connect(DATABASE,{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`succesfully connected to database ${DATABASE}`)
}).catch(err=>{
    console.log(`failed to connect to database  ${DATABASE} ${err}`)
})

app.use("/api/v1",require("./routes/Admin/Admin"))

// const APP_PORT = PORT || process.env.PORT ;
app.listen(PORT,()=>{
    console.log(`Server Started on PORT  ${PORT}`)
})
