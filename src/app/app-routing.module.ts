import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductCreateComponent } from './pages/products/product-create/product-create.component';
import { ProductPageComponent } from './pages/products/product-page/product-page.component';
import { CustomerPageComponent } from './pages/customers/customer-page/customer-page.component';
import { CustomerEditComponent } from './pages/customers/customer-edit/customer-edit.component';
import { OrderPageComponent } from './pages/orders/order-page/order-page.component';
import { TransactionPageComponent } from './pages/transactions/transaction-page/transaction-page.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductViewComponent } from './pages/products/product-view/product-view.component';
import { PaymentComponent } from './pages/transactions/payment/payment.component';
import { TransactionCustomerComponent } from './pages/transactions/transaction-customer/transaction-customer.component';
import { ServiceComponent } from './pages/service/service.component';
import { CustomerCreateComponent } from './pages/customers/customer-create/customer-create.component';
import { ReservationPageComponent } from './pages/reservation/reservation-page/reservation-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductKitComponent } from './pages/products/product-kit/product-kit.component';
import { OrdersViewComponent } from './pages/orders-view/orders-view.component';
import { PermissionService } from './services/permission/permission.service';
const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },
  { path: 'login', component: LoginComponent, title: 'User Login' ,canActivate: [() => inject(PermissionService).canAccess(['Admin'])],},
  { path: 'register', component: RegisterComponent, title: 'User Register' },

  {
    path: 'products',
    component: ProductPageComponent,
    title: 'Products',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },
  {
    path: 'products/create',
    component: ProductCreateComponent,
    title: 'Create New Product',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },
  {
    path: 'products/kit',
    component: ProductKitComponent,
    title: 'Kit Product',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },
  {
    path: 'products/:id/edit',
    component: ProductViewComponent,
    title: 'Edit Product',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },
  {
    path: 'products/:id',
    component: ProductViewComponent,
    title: 'View Product',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },

  {
    path: 'customers',
    component: CustomerPageComponent,
    title: 'Customers',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },
  {
    path: 'customers/:id/edit',
    component: CustomerEditComponent,
    title: 'Edit Customer',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },
  {
    path: 'customers/create',
    component: CustomerCreateComponent,
    title: 'Add New Customer',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },

  {
    path: 'orders',
    component: OrderPageComponent,
    title: 'Orders',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },
  {
    path: 'orders/:id',
    component: OrdersViewComponent,
    title: 'Orders View',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },

  {
    path: 'services',
    component: ServiceComponent,
    title: 'Services',
    canActivate: [() => inject(PermissionService).canAccess(['Admin','Cashier'])],
  },
  {
    path: 'reservations',
    component: ReservationPageComponent,
    title: 'Reservations',
    canActivate: [() => inject(PermissionService).canAccess(['Admin', 'Cashier'])],
  },

  {
    path: 'transactions',
    component: TransactionPageComponent,
    title: 'Transactions',
    canActivate: [() => inject(PermissionService).canAccess(['Admin', 'Cashier'])],
  },
  {
    path: 'transaction-customer',
    component: TransactionCustomerComponent,
    title: 'Create New Customer Transaction',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },

  {
    path: 'payment',
    component: PaymentComponent,
    title: 'Payment',
    canActivate: [() => inject(PermissionService).canAccess(['Admin','Cashier'])],
  },
  {
    path: 'reports',
    component: ReportsComponent,
    title: 'Reports',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },
  // {
  //   path: 'stocks',
  //   component: StocksComponent,
  //   title: 'Stocks',
  //   canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  // },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Settings',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile',
    canActivate: [() => inject(PermissionService).canAccess(['Admin'])],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
