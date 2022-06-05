require('./db/mongoose')
const express = require("express")
const userRouter =  require("./router/user.router")
const profileRouter =  require("./router/profile.router")
const path = require("path");
const cookieParser = require('cookie-parser');

const app = express();

const port = process.env.PORT || 3003;


app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/profile', profileRouter);




app.listen(port, ()=> {  
    console.log("Server is running on the port "+ port);
})