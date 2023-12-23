import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  TransactionsResponse,
  TransactionsService,
} from 'src/app/services/transactions/transactions.service';
import {
  ProductsService,
  ProductsResponse,
} from 'src/app/services/products/products.service';
import { HistoryEntry } from 'src/app/shared/history-entry.model';
import { CustomerNoteComponent } from 'src/app/shared/customer-note/customer-note.component';
import { CustomerInternalNoteComponent } from 'src/app/shared/customer-internal-note/customer-internal-note.component';
import { InfoComponent } from 'src/app/shared/info/info.component';
import { PaymentComponent } from '../payment/payment.component';
import { SharedService } from 'src/app/shared/shared.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { CustomersResponse, CustomersService } from 'src/app/services/customers/customers.service';
import { SearchService } from 'src/app/shared/search.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css'],
})
export class TransactionPageComponent {
  filteredProducts: any[] = [];
  selectedCategory: string = 'all' ;
  products:  ProductsResponse[]=[];
  constructor(
    private transactionsService: TransactionsService,
    private orderService: OrdersService,
    private customersService: CustomersService,
    private productsService: ProductsService,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private searchService: SearchService,
    private toast: NgToastService
  ) {
    this.filteredProducts = this.products; 
  }
  image!: string;
  name!: string;
  code!: string;
  model!: string;
  note!: string;
  internalNote!:string;
  price!: string;
  quantity!: string;
  points!: string;
  errors: any = [];
  transactions!: TransactionsResponse[];
  isLoading: boolean = false;
  cart: ProductsResponse[] = [];
  customers: CustomersResponse[] = [];
  isCartEmpty: boolean = true;
  cartHistory: ProductsResponse[][] = [];
  history: HistoryEntry[] = [];
  propertyChangesHistory: HistoryEntry[] = [];
  selectedCartItem: ProductsResponse | null = null;
  selectedProduct: ProductsResponse | null = null;
  selectedProductIndex: number = -1;
  discountValue: number = 0;
  inputValue: string = '';
  disCount: number = 0;
  showDiscountInput: boolean = false;
  selectedCartItemIndex: number = -1;
  highlightClass: string = '';
  selectedMode: 'quantity' | 'price' | 'discount' = 'quantity';
  selectedCustomerName: string = '';
  selectedCustomer: any;
 

  ngOnInit() {
    this.searchService.searchQuery$.subscribe((query) => {
      this.searchsCustomer(query);
    });
    this.getCustomersLists();
    this.getProductsLists();
  }

  updateCategory(category: string): void {
    this.selectedCategory = category;
    this.updateFilteredProducts();
  }
  
  updateFilteredProducts() {
    if (this.selectedCategory === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(item => item.category === this.selectedCategory);
    }
}

  getCustomersLists(): void {
    try {
      this.isLoading = true;

      this.customersService.getCustomersLists().subscribe((res) => {
        this.customers = res;
        this.isLoading = false;
        console.log(res);
      });
  
    } catch (error) {
      this.errors = error;
    }
  }

  searchsCustomer(query: string) {
    try {
      this.isLoading = true;

      if (query) {
        this.productsService.getProductsLists().subscribe((res) => {
          this.products = res;

          this.filteredProducts  = this.products .filter((item) => {
            return (
              item.id.toString() === query ||
              (item.name && item.name.toString().toLowerCase().includes(query.toLowerCase())) ||
              item.barcode.toString() === query
            );
          });


          if (this.filteredProducts .length === 0) {
       
              this.toast.info({detail:"WARNING",summary:'Search not found',duration:3000, position:'topCenter'});
            
          }

          this.isLoading = false;
        });
      } else {
        this.getProductsLists();
      }
    } catch (error) {
      this.errors = error;
    }
  }

  selectCustomer(customer: CustomersResponse | undefined): void {
    this.selectedCustomer = customer;
    console.log(this.selectedCustomer);
  }

  getProductsLists() {
    try {
      this.isLoading = true;
      this.productsService.getProductsLists().subscribe((result) => {
        this.products = result; 
        this.filteredProducts = this.products; 
      });
    } catch (error) {
      this.errors = error;
    }
  }

  addToCart(item: ProductsResponse) {
    this.cartHistory.push([...this.cart]);

    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      this.history.push(new HistoryEntry('update', existingItem));
      this.selectedProduct = existingItem;
      this.selectedProductIndex = this.cart.indexOf(existingItem);
      existingItem.quantity++;
    } else {
      this.history.push(new HistoryEntry('add', item));
      const newItem: ProductsResponse = { ...item, quantity: 1, discount: 0 };
      this.cart.push(newItem);
      this.selectedProduct = newItem;
      this.selectedProductIndex = this.cart.indexOf(newItem);
    }
    this.isCartEmpty = this.cart.length === 0;
  }

  selectCartItem(cartItem: ProductsResponse, index: number) {
    this.selectedProduct = cartItem;
    this.selectedProductIndex = index;
    this.highlightClass = this.calculateHighlightClass(cartItem);
  }

  calculateHighlightClass(cartItem: ProductsResponse): string {
    if (this.isNewlyAdded(cartItem)) {
      return 'newly-added';
    } else if (this.isModified(cartItem)) {
      return 'modified';
    }
    return '';
  }

  isNewlyAdded(cartItem: ProductsResponse): boolean {
    const ONE_HOUR_IN_MS = 60 * 60 * 1000;
    const createdTimestamp = Date.parse(cartItem.created_at);
    const currentTimestamp = Date.now();
    const oneHourAgoTimestamp = currentTimestamp - ONE_HOUR_IN_MS;
    return createdTimestamp >= oneHourAgoTimestamp;
  }

  isModified(cartItem: ProductsResponse): boolean {
    return cartItem.updated_at >= cartItem.created_at;
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = item.quantity || 0;
      const itemDiscount = item.discount || 0;  
      const discountedPrice = itemPrice - (itemPrice * itemDiscount / 100);
      return total + discountedPrice * itemQuantity;
    }, 0);
  }
  
  

  getTotalQuantity(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }



  changeSelectedMode(mode: 'quantity' | 'price' | 'discount') {
    this.selectedMode = mode;
    this.inputValue = '';

    this.showDiscountInput = mode === 'discount';
  }

  updateSelectedProduct(value: string) {
    this.cartHistory.push([...this.cart]);

    if (this.selectedProduct) {
      if (this.selectedMode === 'quantity') {
        this.inputValue += value;
      } else if (
        this.selectedMode === 'price' ||
        this.selectedMode === 'discount'
      ) {
        this.inputValue += value;
      }

      if (this.selectedMode === 'quantity') {
        this.history.push(
          new HistoryEntry(
            'update',
            this.selectedProduct,
            'quantity',
            this.selectedProduct.quantity
          )
        );

        const newQuantity = parseInt(this.inputValue || '0');
        if (newQuantity >= 0) {
          this.selectedProduct.quantity =
            newQuantity * (this.selectedProduct.quantity < 0 ? -1 : 1);
        }
      } else if (this.selectedMode === 'price') {
        this.history.push(
          new HistoryEntry(
            'update',
            this.selectedProduct,
            'price',
            this.selectedProduct.price
          )
        );
        const newPrice = parseFloat(this.inputValue || '0');
        if (newPrice >= 0) {
          const currentPrice = parseFloat(this.selectedProduct.price || '0');
          this.selectedProduct.price = (
            newPrice * (currentPrice < 0 ? -1 : 1)
          ).toFixed(2);
        }
      } else if (this.selectedMode === 'discount') {
        this.history.push(
          new HistoryEntry(
            'update',
            this.selectedProduct,
            'discount',
            this.selectedProduct.discount
          )
        );
        const newDiscount = parseFloat(this.inputValue || '0');
        if (!isNaN(newDiscount) && newDiscount >= 0 && newDiscount <= 100) {
          const discountedPrice =
            parseFloat(this.selectedProduct.price) * (1 - newDiscount / 100);
          this.selectedProduct.discount =
            newDiscount * (this.selectedProduct.discount < 0 ? -1 : 1);
          this.selectedProduct.price = discountedPrice.toFixed(2);
        }
      }
    }
  }

  undo() {
    if (this.history.length > 0) {
      const lastAction = this.history.pop();

      if (lastAction && this.selectedProduct) {
        switch (lastAction.action) {
          case 'update':
            switch (lastAction.property) {
              case 'quantity':
                this.selectedProduct.quantity = lastAction.originalValue;

                break;
              case 'price':
                this.selectedProduct.price = lastAction.originalValue;
                break;
              case 'discount':
                this.selectedProduct.discount = lastAction.originalValue;
                break;
            }
            break;
          case 'add':
            this.cart = this.cart.filter(
              (item) => item.id !== lastAction.product.id
            );
            break;
          case 'delete':
            this.cart.push(lastAction.product);
            break;
        }
      }
    }
    this.isCartEmpty = this.cart.length === 0;
    if(this.isCartEmpty){
      this.internalNote = "";
      this.note = "";
    }
  }

  toggleSign() {
    if (this.selectedProduct) {
      switch (this.selectedMode) {
        case 'quantity':
          this.selectedProduct.quantity *= -1;
          break;
        case 'price':
          this.selectedProduct.price = (
            parseFloat(this.selectedProduct.price) * -1
          ).toFixed(2);
          break;
        case 'discount':
          this.selectedProduct.discount *= -1;
          break;
        default:
          console.error('Unsupported mode:', this.selectedMode);
          break;
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerNoteComponent, {
      width: '500px',
      data: { cart: this.cart, selectedProduct: this.selectedProduct },
    });

    dialogRef.componentInstance.noteAdded.subscribe((updatedCart) => {
      this.note = updatedCart;
    });
  }

  openNoteDialog(): void {
    const dialogRef = this.dialog.open(CustomerInternalNoteComponent, {
      width: '500px',
      data: { cart: this.cart, selectedProduct: this.selectedProduct },
    });
    dialogRef.componentInstance.internalNoteAdded.subscribe((updatedCart) => {
      this.internalNote = updatedCart;
    });
  }
  
  openInfoDialog(item: any, event: Event): void {
    event.stopPropagation(); 
    const dialogRef = this.dialog.open(InfoComponent, {
      width: '500px',
      data: { product: item },
    });
  }
  
  openPaymentDialog(): void {
    const totalAmount = this.getTotalPrice();
    const customerId = this.selectedCustomer?.id;
    
    if (this.cart.length === 0) {
      return;
    }
  
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '500px',
      disableClose: true,
      data: { totalAmount: totalAmount, cart: this.cart },
    });
  
    dialogRef.componentInstance.paymentMade.subscribe((result) => {
      const inputData = {
        ...this.getTransactionDetails(customerId),
        amountRendered: result.amountRendered,
        change: result.change,
      };
  
      if (this.cart.length === 0) {
       
        return;
      }
      this.orderService.saveOrder(inputData).subscribe(
        (response) => {
        
          this.clearCartAndCustomer();
          this.internalNote = "";
          this.note = "";
        },
        (error) => {
          
        }
      );
    });
  
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  clearCartAndCustomer(): void {
    this.cart = [];
    this.selectedCustomer = undefined;
    this.isCartEmpty = this.cart.length === 0;
  }
  
  clearCart(): void {
    this.cart = [];
  }

  onCustomerChange(): void {
    const selectedCustomerId = this.selectedCustomer?.id;
    this.getTransactionDetails(selectedCustomerId);
  }

  getTransactionDetails(customerId: string | undefined): any {
    const total = this.getTotalPrice();

    const payload = {
      customer_id: customerId,
      total: total,
      products: this.cart.map((item) => ({
        id: item.id,
        price: parseFloat(item.price),
        qty: item.quantity,
        points: item.points,
        sub_total: item.quantity * parseFloat(item.price),
        discount: item.discount,
      })),
      internal_note: this.internalNote || "-",
      customer_note: this.note || "-",
      quantity: this.cart.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0), 
      discount: this.cart.reduce((totalDiscount, item) => totalDiscount + item.discount, 0)
    };
    console.log(this.internalNote,this.note);

    return payload;
  }
}


  

