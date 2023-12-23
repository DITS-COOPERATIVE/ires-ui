import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { ProductCreateComponent } from './pages/products/product-create/product-create.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './partials/loader/loader.component';
import { ProductPageComponent } from './pages/products/product-page/product-page.component';
import { CustomerPageComponent } from './pages/customers/customer-page/customer-page.component';
import { CustomerEditComponent } from './pages/customers/customer-edit/customer-edit.component';
import { OrderPageComponent } from './pages/orders/order-page/order-page.component';
import { TransactionPageComponent } from './pages/transactions/transaction-page/transaction-page.component';
import { BodyComponent } from './pages/body/body.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { HeaderComponent } from './pages/header/header.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './pages/login/login.component';
import { ProductViewComponent } from './pages/products/product-view/product-view.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ResizableModule } from 'angular-resizable-element';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CustomerNoteComponent } from './shared/customer-note/customer-note.component';
import { CustomerInternalNoteComponent } from './shared/customer-internal-note/customer-internal-note.component';
import { InfoComponent } from './shared/info/info.component';
import { TransactionCustomerComponent } from './pages/transactions/transaction-customer/transaction-customer.component';
import { PaymentComponent } from './pages/transactions/payment/payment.component';
import { DatePipe } from '@angular/common';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ServiceComponent } from './pages/service/service.component';
import { CustomerCreateComponent } from './pages/customers/customer-create/customer-create.component';
import { ReservationPageComponent } from './pages/reservation/reservation-page/reservation-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductKitComponent } from './pages/products/product-kit/product-kit.component';
import { OrdersViewComponent } from './pages/orders-view/orders-view.component';
import { NgxBarcodeModule } from '@greatcloak/ngx-barcode';
import { ModalComponent } from './shared/modal/modal.component';
import { NgToastModule } from 'ng-angular-popup'
import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    ProductCreateComponent,
    LoaderComponent,
    ProductPageComponent,
    CustomerPageComponent,
    CustomerEditComponent,
    OrderPageComponent,
    TransactionPageComponent,
    BodyComponent,
    SettingsComponent,
    ReportsComponent,
    StocksComponent,
    HeaderComponent,
    LoginComponent,
    ProductViewComponent,
    CustomerNoteComponent,
    CustomerInternalNoteComponent,
    InfoComponent,
    TransactionCustomerComponent,
    PaymentComponent,
    ServiceComponent,
    CustomerCreateComponent,
    ReservationPageComponent,
    OrdersViewComponent,
    RegisterComponent,
    ProfileComponent,
    ProductKitComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    OverlayModule,
    CdkMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ResizableModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    DragDropModule,
    NgxBarcodeModule,
    NgxDaterangepickerMd.forRoot(),
    NgToastModule,
    NgxAwesomePopupModule.forRoot(),
    ConfirmBoxConfigModule.forRoot(),

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent], 
})
export class AppModule {}
