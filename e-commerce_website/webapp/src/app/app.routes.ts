import { Routes } from '@angular/router';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth-guard';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './core/admin-guard';
import { WishlistsComponent } from './components/wishlists/wishlists.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { OrdersComponent } from './components/manage/orders/orders.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { BuyNowComponent } from './components/buy-now/buy-now.component';

export const routes: Routes = [
  // ✅ Default Route (Redirect to Home)
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // ✅ Home Page
  { path: 'home', component: HomeComponent },

  // ✅ Admin Routes
  { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] },

  // ✅ Category Routes
  { path: 'admin/categories', component: CategoriesComponent, canActivate: [adminGuard] },
  { path: 'admin/categories/add', component: CategoryFormComponent, canActivate: [adminGuard] },
  { path: 'admin/categories/edit/:id', component: CategoryFormComponent, canActivate: [adminGuard] },

  // ✅ Brand Routes
  { path: 'admin/brands', component: BrandsComponent, canActivate: [adminGuard] },
  { path: 'admin/brands/add', component: BrandFormComponent, canActivate: [adminGuard] },
  { path: 'admin/brands/edit/:id', component: BrandFormComponent, canActivate: [adminGuard] },

  // ✅ Product Routes
  { path: 'admin/products', component: ProductsComponent, canActivate: [adminGuard] },

  { path: 'admin/orders', component:OrdersComponent, canActivate: [adminGuard] },
  { path: 'admin/products/add', component: ProductFormComponent, canActivate: [adminGuard] },
  { path: 'admin/products/edit/:id', component: ProductFormComponent, canActivate: [adminGuard] },
  { path: 'admin/header', component: HeaderComponent, canActivate: [adminGuard] },

  // ✅ Public Product Routes
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },


  { path: 'wishlists', component: WishlistsComponent, canActivate: [authGuard] },
  { path: 'cart', component: ShoppingCartComponent, canActivate: [authGuard] },
  { path: 'orders', component: CustomerOrdersComponent, canActivate: [authGuard] },

  { path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'reset-password/:token', component: ResetPasswordComponent },

{ path: 'buy-now/:id', component: BuyNowComponent },


  // ✅ Authentication Routes
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // ✅ Wildcard Route for 404 Handling (Redirect to Home)
  { path: '**', redirectTo: 'home' }
];
