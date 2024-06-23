require('dotenv').config();
const express = require('express');
const path=require('path');
const { ConnectMongoDb } = require("./connection/conn");
const urlRouter = require('./router/url');
const staticRoute=require('./router/staticRoute');
const userRoute=require("./router/user");
const cookieparser=require('cookie-parser');
const app = express();
const PORT = process.env.PORT;


//middlewares
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));

//paths for static and views file...
const viewsPath=path.resolve("./views");
const staticPath=path.resolve("./public");

app.use(express.static(staticPath));
app.set('view engine','ejs');
app.set('views',viewsPath);
app.set('trust proxy', true);


//connect database
console.log(process.env.DATABASE_URL);
ConnectMongoDb(process.env.DATABASE_URL).then((result) => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(err);
});

//routing
app.use("/url", urlRouter);
app.use('/user',userRoute)
app.use("/",staticRoute);

//404 Error Page 
app.get("/*",(req,res)=>{
    res.render('404');
})

//listening the port...
app.listen(PORT, () => {
    console.log(`Server is running on this => http://localhost:${PORT}`);
})
