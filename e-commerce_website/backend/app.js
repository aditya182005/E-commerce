const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;

const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const customertRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");


app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.send("Server Running")
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API Routes
app.use("/api/categories", verifyToken, categoryRoutes);
app.use("/api/brands", verifyToken, brandRoutes);
app.use("/api/orders", verifyToken, orderRoutes);
app.use("/api/products", verifyToken, productRoutes);
app.use("/api/customers", verifyToken, customertRoutes);
app.use("/api/auth", authRoutes);


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
