module.exports = {
  brands: [
    { name: "Apple" },
    { name: "Samsung" },
    { name: "Sony" },
    { name: "Nike" },
    { name: "Adidas" },
    { name: "Puma" },
    { name: "HP" },
    { name: "Dell" },
    { name: "Lenovo" },
    { name: "Asus" },
    { name: "Nestle" },
    { name: "Coca-Cola" },
    { name: "Ikea" },
    { name: "Home Centre" },
    { name: "Penguin Random House" },
    { name: "HarperCollins" }
  ],


  categories: [
    { name: "Electronics", description: "Mobiles, laptops, and gadgets" },
    { name: "Fashion", description: "Men’s and women’s fashion" },
    { name: "Sports", description: "Sports equipment and apparel" },
    { name: "Grocery", description: "Daily essentials and food items" },
    { name: "Home and Furniture", description: "Furniture and home decor" },
    { name: "Books", description: "Fiction and non-fiction books" }
  ],

  users: [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "123456", // hash using bcrypt
      isAdmin: true
    },
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "123456", // hash using bcrypt
      isAdmin: false
    },
    {
      name: "Bob Seller",
      email: "bob@example.com",
      password: "123456", // hash using bcrypt
      isAdmin: false
    }
  ],

  products: [
  {
    name: "iPhone 13",
    brand: "Apple",
    category: "Electronics",
    price: 69900,
    shortDescription: "Apple iPhone 13 - 128GB Blue",
    description: "The latest iPhone 13 with advanced A15 Bionic chip and dual camera system.",
    stock: 25,
    images: ["uploads/products/iphone13-1.jpg"]
  },
  {
    name: "Samsung Galaxy S21",
    brand: "Samsung",
    category: "Electronics",
    price: 64999,
    shortDescription: "Samsung Galaxy S21 Ultra - 256GB",
    description: "High-end flagship with superior display and powerful performance.",
    stock: 20,
    images: ["uploads/products/s21-1.jpg"]
  },
  {
    name: "Sony WH-1000XM4",
    brand: "Sony",
    category: "Electronics",
    price: 29990,
    shortDescription: "Wireless Noise Cancelling Headphones",
    description: "Industry-leading noise cancellation with dual noise sensor technology.",
    stock: 30,
    images: ["uploads/products/sony-headphones-1.jpg"]
  },
  {
    name: "Men's T-Shirt",
    brand: "Nike",
    category: "Fashion",
    price: 2499,
    shortDescription: "Nike Dri-FIT Men's T-Shirt",
    description: "A comfortable and stylish t-shirt for everyday wear.",
    stock: 50,
    images: ["uploads/products/nike-tshirt-1.jpg"]
  },
  {
    name: "Women's Leggings",
    brand: "Puma",
    category: "Fashion",
    price: 1999,
    shortDescription: "Puma Women's Essentials Leggings",
    description: "Comfortable and stylish leggings for any occasion.",
    stock: 40,
    images: ["uploads/products/puma-leggings-1.jpg"]
  },
  {
    name: "Women's Running Shoes",
    brand: "Adidas",
    category: "Sports",
    price: 4999,
    shortDescription: "Adidas Ultraboost 22 Women's Running Shoes",
    description: "Experience incredible energy return with Adidas Ultraboost.",
    stock: 30,
    images: ["uploads/products/adidas-shoes-1.jpg"]
  },
  {
    name: "Basketball",
    brand: "Nike",
    category: "Sports",
    price: 1499,
    shortDescription: "Nike Everyday Playground 8P Basketball",
    description: "Durable rubber for outdoor courts.",
    stock: 20,
    images: ["uploads/products/nike-basketball-1.jpg"]
  },
  {
    name: "Instant Coffee",
    brand: "Nestle",
    category: "Grocery",
    price: 299,
    shortDescription: "Nescafe Classic Instant Coffee",
    description: "A rich and aromatic coffee to start your day.",
    stock: 100,
    images: ["uploads/products/nescafe-coffee-1.jpg"]
  },
  {
    name: "Soft Drink",
    brand: "Coca-Cola",
    category: "Grocery",
    price: 40,
    shortDescription: "Coca-Cola Original Taste",
    description: "The classic and refreshing taste of Coca-Cola.",
    stock: 200,
    images: ["uploads/products/coca-cola-1.jpg"]
  },
  {
    name: "Bookshelf",
    brand: "Ikea",
    category: "Home and Furniture",
    price: 3999,
    shortDescription: "Ikea BILLY Bookshelf",
    description: "A simple and versatile bookshelf for your home.",
    stock: 15,
    images: ["uploads/products/ikea-bookshelf-1.jpg"]
  },
  {
    name: "Sofa Set",
    brand: "Home Centre",
    category: "Home and Furniture",
    price: 29999,
    shortDescription: "Home Centre 3-Seater Sofa",
    description: "A comfortable and stylish sofa for your living room.",
    stock: 10,
    images: ["uploads/products/home-centre-sofa-1.jpg"]
  },
  {
    name: "The Alchemist",
    brand: "HarperCollins",
    category: "Books",
    price: 299,
    shortDescription: "A Fable About Following Your Dream",
    description: "Paulo Coelho's enchanting novel has inspired a devoted following around the world.",
    stock: 50,
    images: ["uploads/products/alchemist-book-1.jpg"]
  },
  {
    name: "Sapiens: A Brief History of Humankind",
    brand: "Penguin Random House",
    category: "Books",
    price: 499,
    shortDescription: "A groundbreaking narrative of humanity’s creation and evolution.",
    description: "Yuval Noah Harari's book explores the ways in which biology and history have defined us.",
    stock: 40,
    images: ["uploads/products/sapiens-book-1.jpg"]
  }

],


  orders: [
    {
      userEmail: "alice@example.com",
      items: [
        { productName: "iPhone 13", quantity: 1, price: 69900 },
        { productName: "The Alchemist", quantity: 2, price: 299 }
      ],
      totalAmount: 70498,
      paymentMethod: "Credit Card",
      status: "Delivered"
    }
  ],

  carts: [
    {
      userEmail: "bob@example.com",
      items: [{ productName: "Samsung Galaxy S21", quantity: 1 }]
    }
  ],

  reviews: [
    {
      userEmail: "alice@example.com",
      productName: "iPhone 13",
      rating: 5,
      comment: "Amazing phone with great camera quality."
    },
    {
      userEmail: "alice@example.com",
      productName: "The Alchemist",
      rating: 4,
      comment: "Beautiful story, very motivational."
    }
  ]
};
