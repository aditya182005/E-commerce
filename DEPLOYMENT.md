# E-Commerce Application Deployment to Render

This guide provides step-by-step instructions for deploying the e-commerce application to Render.

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **MongoDB Atlas**: Set up a MongoDB Atlas cluster (Render doesn't provide MongoDB)
3. **Git Repository**: Push your code to GitHub/GitLab

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier is fine)
3. Create a database user
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/database-name`
5. Add your IP address to the whitelist (or 0.0.0.0/0 for testing)

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
