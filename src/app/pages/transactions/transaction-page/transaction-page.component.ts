import { Component } from '@angular/core';
import {
  TransactionsResponse,
  TransactionsService,
} from 'src/app/services/transactions/transactions.service';
import {
  ProductsService,
  ProductsResponse,
} from 'src/app/services/products/products.service';
import { HistoryEntry } from 'src/app/shared/history-entry.model';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css'],
})
export class TransactionPageComponent {
  constructor(
    private transactionsService: TransactionsService,
    private productsService: ProductsService
  ) {}
  image!: string;
  name!: string;
  code!: string;
  model!: string;
  price!: string;
  quantity!: string;
  points!: string;
  errors: any = [];
  transactions!: TransactionsResponse[];
  isLoading: boolean = false;
  products!: ProductsResponse[];
  cart: ProductsResponse[] = [];
  isCartEmpty: boolean = true;
  cartHistory: ProductsResponse[][] = [];
  history: HistoryEntry[] = [];
  propertyChangesHistory: HistoryEntry[] = [];

  selectedProduct: ProductsResponse | null = null;
  selectedProductIndex: number = -1;
  discountValue: number = 0;
  inputValue: string = '';
  disCount: number = 0;
  showDiscountInput: boolean = false;

  selectedMode: 'quantity' | 'price' | 'discount' = 'quantity';

  ngOnInit() {
    this.getTransactionsLists();
    this.getProductsLists();
  }

  getProductsLists() {
    try {
      this.isLoading = true;

      this.productsService.getProductsLists().subscribe((res) => {
        this.products = res;
        this.isLoading = false;
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

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      return total + itemPrice * item.quantity;
    }, 0);
  }

  getTotalQuantity(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTransactionsLists() {
    try {
      this.isLoading = true;

      this.transactionsService.getTransactionsList().subscribe((res: any) => {
        this.transactions = res.result;
        this.isLoading = false;
      });
    } catch (error) {
      this.errors = error;
    }
  }

  deleteTransaction(event: any, transactionId: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      event.target.innerText = 'Deleting...';

      this.transactionsService
        .destroyTransaction(transactionId)
        .subscribe((res: any) => {
          this.getTransactionsLists();

          alert(res.message);
        });
    }
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

  deleteSelectedProduct() {
    if (
      this.selectedProductIndex !== -1 &&
      confirm('Are you sure you want to delete this product?')
    ) {
      this.cart.splice(this.selectedProductIndex, 1);
      this.selectedProduct = null;
      this.selectedProductIndex = -1;
      this.isCartEmpty = this.cart.length === 0;
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
}
