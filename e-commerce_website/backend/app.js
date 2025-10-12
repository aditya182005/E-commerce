const express = require("express");
const mongoose =require("mongoose");
const app = express();
const port = 3000;
const cors= require("cors")
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const customertRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");


app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server Running")
})
app.use("/category", verifyToken, categoryRoutes);

app.use("/brand", verifyToken, brandRoutes);
app.use("/orders", verifyToken, orderRoutes);
app.use("/product", verifyToken, productRoutes);

app.use("/customer", verifyToken, customertRoutes);
app.use("/auth", authRoutes);


async function connectDb(){
    mongoose.connect("mongodb://localhost:27017",{
        dbName:"e-comm-store-db"
    })
}
connectDb().catch((err=>{
    console.error(err);
    
}))

app.listen(port,()=>{
    console.log('Server Running on port',port)
})