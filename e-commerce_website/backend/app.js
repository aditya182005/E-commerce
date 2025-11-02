const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
// Change from hardcoded port to environment variable
const port = process.env.PORT || 3000;

const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const customertRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

// Update CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:4200',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Health check route (important for Render)
app.get("/", (req, res) => {
    res.status(200).json({
        status: "Server Running",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Seeding endpoint for post-deployment (remove in production after seeding)
app.post("/api/seed", async (req, res) => {
    try {
        // Run the seeding script
        const { exec } = require('child_process');
        exec('node seed.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Seeding error: ${error}`);
                return res.status(500).json({ error: 'Seeding failed', details: error.message });
            }
            console.log(`Seeding output: ${stdout}`);
            res.status(200).json({ message: 'Database seeded successfully', output: stdout });
        });
    } catch (err) {
        res.status(500).json({ error: 'Seeding failed', details: err.message });
    }
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

// Update MongoDB connection for production
async function connectDb(){
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/e-comm-store-db";
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

connectDb();

app.listen(port, () => {
    console.log(`Server Running on port ${port} in ${process.env.NODE_ENV} mode`);
});
