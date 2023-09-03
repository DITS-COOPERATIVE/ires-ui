import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductCreateComponent } from './pages/products/product-create/product-create.component';
import { ProductPageComponent } from './pages/products/product-page/product-page.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';
import { CustomerCreateComponent } from './pages/customers/customer-create/customer-create.component';
import { CustomerPageComponent } from './pages/customers/customer-page/customer-page.component';
import { CustomerEditComponent } from './pages/customers/customer-edit/customer-edit.component';
import { OrderPageComponent } from './pages/orders/order-page/order-page.component';
import { OrderCreateComponent } from './pages/orders/order-create/order-create.component';

const routes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },

  { path: 'products', component: ProductPageComponent, title: 'Products' },
  { path: 'products/create', component: ProductCreateComponent, title: 'Create New Product'},
  { path: 'products/:id/edit', component: ProductEditComponent, title: 'Edit Product'},

  { path: 'customers', component: CustomerPageComponent, title: 'Customers' },
  { path: 'customers/create', component: CustomerCreateComponent, title: 'Create New Customer'},
  { path: 'customers/:id/edit', component: CustomerEditComponent, title: 'Edit Customer'},

  { path: 'orders', component: OrderPageComponent, title: 'Orders' },
  { path: 'orders/create', component: OrderCreateComponent, title: 'Create New Orders'},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }