import { NgModule } from '@angular/core';
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
import { OrdersViewComponent } from './pages/orders-view/orders-view.component';
const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
  { path: 'login', component: LoginComponent, title: 'login' },

  { path: 'products', component: ProductPageComponent, title: 'Products' },
  { path: 'products/create', component: ProductCreateComponent, title: 'Create New Product'},
  { path: 'products/:id/edit', component: ProductViewComponent, title: 'Edit Product'},
  { path: 'products/:id', component: ProductViewComponent, title: 'View Product'},

  { path: 'customers', component: CustomerPageComponent, title: 'Customers' },
  { path: 'customers/:id/edit',component: CustomerEditComponent,title: 'Edit Customer',  },
  { path: 'customers/create', component: CustomerCreateComponent, title: 'Add New Customer'},

  { path: 'orders', component: OrderPageComponent, title: 'Orders' },
  { path: 'orders/:id', component: OrdersViewComponent, title: 'Orders View' },

  { path: 'services', component: ServiceComponent, title: 'Services' },
  { path: 'reservations', component: ReservationPageComponent, title: 'Reservations' },

  { path: 'transactions',component: TransactionPageComponent,title: 'Transactions',  },
  { path: 'transaction-customer',component: TransactionCustomerComponent,title: 'Create New Customer Transaction', },

  { path: 'payment', component: PaymentComponent, title: 'Payment' },
  { path: 'reports', component: ReportsComponent, title: 'Reports' },
  { path: 'stocks', component: StocksComponent, title: 'Stocks' },
  { path: 'settings', component: SettingsComponent, title: 'Settings' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
