import { Component } from '@angular/core';
import { TransactionsResponse, TransactionsService } from 'src/app/services/transactions/transactions.service';
import { ProductsService , ProductsResponse } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent {

  constructor(private transactionsService: TransactionsService,private productsService: ProductsService) { }
  image!: string
  name!: string
  code!: string
  model!: string
  price!: string
  quantity!: string
  points!: string
  errors: any = [];
  transactions!: TransactionsResponse [];
  isLoading: boolean = false;
  products!: ProductsResponse [];
  ngOnInit() {

    this.getTransactionsLists();
    this.getProductsLists();

  }

  getProductsLists(){
    
    try {
      this.isLoading = true;

      this.productsService.getProductsLists().subscribe((res) =>{
        this.products = res;
        this.isLoading = false
  
      })
    } catch (error) {
      this.errors = error
    };
    
  }

  getTransactionsLists(){
    try {

      this.isLoading = true;
      
      this.transactionsService.getTransactionsList().subscribe((res: any) =>{
        console.log(res.result);
        this.transactions = res.result
        this.isLoading = false
        
      });

    } catch (error) {
      this.errors = error
    }
    
  }

  deleteTransaction(event: any, transactionId: number) {

    if (confirm('Are you sure you want to delete this transaction?')) 
    {
      event.target.innerText = "Deleting..."  

      this.transactionsService.destroyTransaction(transactionId).subscribe((res: any) => {

        this.getTransactionsLists();

        alert(res.message);
      })
    }
  }

}
