import { Component } from '@angular/core';
import { TransactionsResponse, TransactionsService } from 'src/app/services/transactions/transactions.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent {

  constructor(private transactionsService: TransactionsService) { }

  errors: any = [];
  transactions!: TransactionsResponse [];
  isLoading: boolean = false;

  ngOnInit() {

    this.getTransactionsLists();

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
