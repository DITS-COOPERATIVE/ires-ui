import { Component } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent {

  constructor(private transactionsService: TransactionsService) {}

  sale_id!: any
  amount_rendered!: number
  change!: number

  errors: any = [];
  isLoading: boolean = false
  loadingTitle: string   = 'Loading'

  saveTransaction(){
    this.loadingTitle = "Saving";
    this.isLoading = true;

    var inputData = {
      sale_id: this.sale_id,
      amount_rendered: this.amount_rendered,
    }

    this.transactionsService.saveTransaction(inputData).subscribe({

      next: (res: any) => {
        console.log(res, 'response')
        alert(res.message);
        this.sale_id = '';
        this.amount_rendered = 0;
        this.change = 0 ;
        this.isLoading = false  
      },
      error: (err: any) => {
        console.log(err, 'response')
        alert(err.error.message);
        this.errors = err.error.errors;
        this.sale_id = '';
        this.amount_rendered = 0;
        this.change = 0 ;
        this.isLoading = false  
        console.log(this.errors)
      }
    })
  }
}
