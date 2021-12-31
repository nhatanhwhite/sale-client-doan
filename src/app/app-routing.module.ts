import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeUserComponent } from './component/home-user/home-user.component';
import { HomeAdminComponent } from './admin/component/home-admin/home-admin.component';
import { AuthGuard } from './helper/auth-guard';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { ShoppingPaymentComponent } from './component/shopping-payment/shopping-payment.component';
import { OrderComponent } from './admin/component/order/order.component';
import { OrderDetailComponent } from './admin/component/order/order-detail/order-detail.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProfileOrderComponent } from './component/profile/profile-order/profile-order.component';
import { NewsDetailComponent } from './component/news-detail/news-detail.component';
import { NewsListComponent } from './component/news-list/news-list.component';
import {OrderHistoryComponent} from './component/order-history/order-history.component';

const routes: Routes = [
 /* { path: '', redirectTo: 'home', pathMatch: 'full' },*/
  { path: '', redirectTo: 'home/main', pathMatch: 'full' },
  {
    path: 'home-admin', component: HomeAdminComponent, canActivate: [AuthGuard],
    children: [
      { path: 'order', component: OrderComponent },
      { path: 'order/:id', component: OrderDetailComponent },
      {
        path: 'main-admin',
        loadChildren: () => import('./admin/module/main-admin/main-admin.module').then(m => m.MainAdminModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-user',
        loadChildren: () => import('./admin/module/user/list-user/list-user.module').then(m => m.ListUserModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'update-user/:id',
        loadChildren: () => import('./admin/module/user/update-user/update-user.module').then(m => m.UpdateUserModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-category',
        loadChildren: () => import('./admin/module/category/add-category/add-category.module').then(m => m.AddCategoryModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-category',
        loadChildren: () => import('./admin/module/category/list-category/list-category.module').then(m => m.ListCategoryModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'update-category/:id',
        loadChildren: () => import('./admin/module/category/update-category/update-category.module').then(m => m.UpdateCategoryModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-category-news',
        loadChildren: () => import('./admin/module/category-news/add-category-news/add-category-news.module').then(m => m.AddCategoryNewsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-category-news',
        loadChildren: () => import('./admin/module/category-news/list-category-news/list-category-news.module').then(m => m.ListCategoryNewsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'update-category-news/:id',
        loadChildren: () => import('./admin/module/category-news/update-category-news/update-category-news.module').then(m => m.UpdateCategoryNewsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-news',
        loadChildren: () => import('./admin/module/news/add-news/add-news.module').then(m => m.AddNewsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-news',
        loadChildren: () => import('./admin/module/news/list-news/list-news.module').then(m => m.ListNewsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'view-news/:id',
        loadChildren: () => import('./admin/module/news/view-news/view-news.module').then(m => m.ViewNewsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'update-news/:id',
        loadChildren: () => import('./admin/module/news/update-news/update-news.module').then(m => m.UpdateNewsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-product',
        loadChildren: () => import('./admin/module/product/add-product/add-product.module').then(m => m.AddProductModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-product',
        loadChildren: () => import('./admin/module/product/list-product/list-product.module').then(m => m.ListProductModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'update-product/:id',
        loadChildren: () => import('./admin/module/product/update-product/update-product.module').then(m => m.UpdateProductModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'view-product/:id',
        loadChildren: () => import('./admin/module/product/view-product/view-product.module').then(m => m.ViewProductModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'update-image/:id',
        loadChildren: () => import('./admin/module/product/update-image/update-image.module').then(m => m.UpdateImageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-discount-code',
        loadChildren: () => import('./admin/module/discount-code/add-discount-code/add-discount-code.module').then(m => m.AddDiscountCodeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-discount-code',
        loadChildren: () => import('./admin/module/discount-code/list-discount-code/list-discount-code.module').then(m => m.ListDiscountCodeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'update-discount-code/:id',
        loadChildren: () => import('./admin/module/discount-code/update-discount-code/update-discount-code.module').then(m => m.UpdateDiscountCodeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-shipping-fee',
        loadChildren: () => import('./admin/module/shipping-fee/add-shipping-fee/add-shipping-fee.module').then(m => m.AddShippingFeeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'update-shipping-fee/:id',
        loadChildren: () => import('./admin/module/shipping-fee/update-shipping-fee/update-shipping-fee.module').then(m => m.UpdateShippingFeeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-shipping-fee',
        loadChildren: () => import('./admin/module/shipping-fee/list-shipping-fee/list-shipping-fee.module').then(m => m.ListShippingFeeModule),
        canActivate: [AuthGuard]
      },
    ]
  },


  {
    path: 'home', component: HomeUserComponent,
    children: [
      { path: 'main', loadChildren: () => import('./module/main/main.module').then(m => m.MainModule) },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'news-list', component: NewsListComponent },
      { path: 'product-list/:categoryId', component: ProductListComponent },
      { path: 'product-detail/:productId', component: ProductDetailComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'shopping-payment', component: ShoppingPaymentComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/order', component: ProfileOrderComponent },
      { path: 'news/:id', component: NewsDetailComponent },
      { path: 'order-detail', component: OrderHistoryComponent, canActivate: [AuthGuard] },
      {
        path: 'product-order/:id',
        loadChildren: () => import('./module/product/product-order/product-order.module').then(m => m.ProductOrderModule)
      },
      {
        path: 'product-cart',
        loadChildren: () => import('./module/product/product-cart/product-cart.module').then(m => m.ProductCartModule)
      },
      {
        path: 'product-payment',
        loadChildren: () => import('./module/product/product-payment/product-payment.module').then(m => m.ProductPaymentModule)
      },
      { path: 'view-post/:id', loadChildren: () => import('./module/news/view-post/view-post.module').then(m => m.ViewPostModule) },
      { path: 'list-post', loadChildren: () => import('./module/news/list-post/list-post.module').then(m => m.ListPostModule) },
      {
        path: 'product-category/:id',
        loadChildren: () => import('./module/product-category/product-category.module').then(m => m.ProductCategoryModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
