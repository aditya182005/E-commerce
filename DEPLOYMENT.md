# E-Commerce Application Deployment to Render

This guide provides step-by-step instructions for deploying the e-commerce application to Render.

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **MongoDB Atlas**: Set up a MongoDB Atlas cluster (Render doesn't provide MongoDB)
3. **Git Repository**: Push your code to GitHub/GitLab

## Step 1: Set Up MongoDB Atlas

### What is a MongoDB Connection String?
A MongoDB connection string is a URL that tells your application how to connect to your MongoDB database. It includes:
- Your database username and password
- The cluster/server address
- Database name
- Connection options

**Example**: `mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/my-ecommerce-db?retryWrites=true&w=majority`

### How to Get Your Connection String:

1. **Go to [MongoDB Atlas](https://www.mongodb.com/atlas)** and sign up/login

2. **Create a Cluster**:
   - Click "Create" or "Build a Cluster"
   - Choose "FREE" tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Click "Create Cluster" (takes 5-10 minutes)

3. **Create Database User**:
   - In your cluster dashboard, go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Enter username and password (save these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**:
   - Go to "Network Access" → "Add IP Address"
   - For testing: Add `0.0.0.0/0` (allows all IPs)
   - For production: Add Render's IP ranges or restrict to your IP

5. **Get Connection String**:
   - Go to "Clusters" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" as driver (version 3.6 or later)
   - Copy the connection string
   - **Replace `<password>` with your actual password**
   - **Replace `<database>` with your database name** (e.g., `ecommerce-db`)

6. **Final Connection String Format**:
   ```
   mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/your-database-name?retryWrites=true&w=majority
   ```

## Step 2: Deploy to Render

### Option A: Using Render.yaml (Recommended)

1. **Connect Repository**:
   - Go to Render Dashboard → New → Blueprint
   - Connect your GitHub/GitLab repository
   - Render will automatically detect the `render.yaml` file

2. **Configure Services**:
   - Two services will be created: `e-commerce-backend` and `e-commerce-frontend`
   - The services will be linked automatically

3. **Set Environment Variables**:
   - In the Render Blueprint setup, you'll be prompted to add environment variables
   - For the **e-commerce-backend** service, add:
     - **Key**: `MONGODB_URI`
     - **Value**: Your MongoDB Atlas connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/database-name`)
     - **Environment**: Production (leave as default)
   - `NODE_ENV` and `FRONTEND_URL` are already configured in `render.yaml`

### Option B: Manual Deployment

If you prefer separate deployments:

1. **Deploy Backend**:
   - New → Web Service
   - Runtime: Node
   - Build Command: `cd e-commerce_website/backend && npm install`
   - Start Command: `cd e-commerce_website/backend && npm start`
   - Environment Variables:
     - `NODE_ENV`: `production`
     - `MONGODB_URI`: Your MongoDB connection string
     - `FRONTEND_URL`: Your frontend URL (after deployment)

2. **Deploy Frontend**:
   - New → Static Site
   - Build Command: `cd e-commerce_website/webapp && npm install && npm run build`
   - Publish Directory: `e-commerce_website/webapp/dist/webapp`
   - Environment Variables:
     - `API_URL`: Your backend URL (e.g., `https://your-backend.onrender.com`)

## Step 3: Seed the Database

After both services are deployed and running:

1. **Via API Endpoint** (temporary endpoint added):
   ```
   POST https://your-backend-service.onrender.com/api/seed
   ```
   - Use tools like Postman, curl, or your browser's developer console
   - This will run the seeding script and populate your database

2. **Alternative: Via Render Shell** (if available):
   - Go to your backend service → Shell
   - Run: `cd e-commerce_website/backend && node seed.js`

## Step 4: Verify Deployment

1. **Backend Health Check**:
   - Visit: `https://your-backend-service.onrender.com/`
   - Should return: `{"status":"Server Running","environment":"production","timestamp":"..."}`

2. **Frontend**:
   - Visit your frontend URL
   - Should load the Angular application

3. **API Test**:
   - Try logging in or accessing products
   - Check browser network tab for API calls

## Step 5: Security Cleanup

After successful seeding:

1. **Remove Seeding Endpoint**:
   - Edit `e-commerce_website/backend/app.js`
   - Remove the `/api/seed` POST route
   - Commit and redeploy

2. **Restrict MongoDB Access**:
   - In MongoDB Atlas, remove `0.0.0.0/0` from IP whitelist
   - Add only Render's IP ranges if needed

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - **Bundle Size Exceeded**: If you see "bundle initial exceeded maximum budget":
     - Edit `e-commerce_website/webapp/angular.json`
     - Increase the `maximumError` value in the budgets section (e.g., from "1MB" to "2MB")
     - Commit and redeploy

2. **Database Connection**:
   - Verify `MONGODB_URI` is correct
   - Check MongoDB Atlas network access

3. **CORS Issues**:
   - Ensure `FRONTEND_URL` is set correctly in backend
   - Check CORS configuration in `app.js`

4. **Seeding Failures**:
   - Check backend logs during seeding
   - Verify database connection and permissions

### Useful Commands:

```bash
# Test locally before deployment
cd e-commerce_website/backend
npm install
npm start

cd ../webapp
npm install
npm run build
```

## Environment Variables Summary

### Backend:
- `NODE_ENV`: `production`
- `MONGODB_URI`: MongoDB Atlas connection string
- `FRONTEND_URL`: Frontend service URL (auto-populated)
- `PORT`: Auto-set by Render

### Frontend:
- `API_URL`: Backend service URL (auto-populated)

## Support

If you encounter issues:
1. Check Render service logs
2. Verify environment variables
3. Test locally with production environment variables
4. Check MongoDB Atlas connection
