const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Import models from your db folder
const Brand = require("./db/brand");
const Category = require("./db/category");
const Product = require("./db/product");
const User = require("./db/user");
const Order = require("./db/order");
const Cart = require("./db/cart");
const Review = require("./db/review");

const data = require("./seedData");

mongoose
  .connect("mongodb://localhost:27017/e-comm-store-db")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

async function seedDatabase() {
  try {
    // Clear all collections
    await Promise.all([
      Brand.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      User.deleteMany({}),
      Order.deleteMany({}),
      Cart.deleteMany({}),
      Review.deleteMany({})
    ]);

    console.log("🧹 Old data cleared");

    // Insert Brands and Categories
    const brands = await Brand.insertMany(data.brands);
    const categories = await Category.insertMany(data.categories);

    // Hash passwords before saving
    const users = await Promise.all(
      data.users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10)
      }))
    );
    const userDocs = await User.insertMany(users);

    // Create lookup maps for relations
    const brandMap = Object.fromEntries(brands.map((b) => [b.name, b._id]));
    const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c._id]));
    const userMap = Object.fromEntries(userDocs.map((u) => [u.email, u._id]));

    // Insert Products (now with correct field names)
    const products = await Product.insertMany(
      data.products.map((p) => ({
        name: p.name,
        brandId: brandMap[p.brand],
        categoryId: categoryMap[p.category],
        price: p.price,
        shortDescription: p.shortDescription || p.description?.slice(0, 80),
        description: p.description,
        stock: p.stock,
        images: p.images
      }))
    );

    const productMap = Object.fromEntries(products.map((p) => [p.name, p._id]));

    // Insert Orders
    await Order.insertMany(
      data.orders.map((o) => ({
        userId: userMap[o.userEmail],
        totalAmount: o.totalAmount,
        paymentMethod: o.paymentMethod,
        status: o.status,
        items: o.items.map((i) => ({
          productId: productMap[i.productName],
          quantity: i.quantity,
          price: i.price
        }))
      }))
    );

    // Insert Carts
    await Cart.insertMany(
      data.carts.map((c) => ({
        userId: userMap[c.userEmail],
        items: c.items.map((i) => ({
          productId: productMap[i.productName],
          quantity: i.quantity
        }))
      }))
    );

    // Insert Reviews
// Insert Reviews
    await Review.insertMany(
    data.reviews.map((r) => ({
        user: userMap[r.userEmail],   // still an ObjectId reference
        product: r.productName,       // just a string name
        rating: r.rating,
        comment: r.comment
    }))
    );



    console.log("✅ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
