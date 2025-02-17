const express = require("express");

const app = express();

const {connectMongoDb} = require("./connection"); 

const {logReqRes} = require("./middleware"); 

const port = 8000;

const userRouter = require("./routes/user");



// MongoDB connection
connectMongoDb()  
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection failed:', err));


//middleware

app.use(logReqRes("log.txt"));

/// Routes

app.use("/user" , userRouter);

//server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
