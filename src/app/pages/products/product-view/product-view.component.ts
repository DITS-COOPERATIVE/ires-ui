import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsResponse, ProductsService } from 'src/app/services/products/products.service';
import { NgToastService } from 'ng-angular-popup';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent {
  isReadOnly = true;
  isEditable = false;
  isEditing = false;
  successMessage: string | null = null;
  category: string = '';
  productId!: any;
  product: any = {};

  errors: any = [];
  isLoading: boolean = false;
  loadingTitle: string = 'Loading';
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private toast: NgToastService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.productsService.getProduct(this.productId).subscribe((res) => {
      this.product = res;
      this.isLoading = false;
    });
  }

  handleImageUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
    }
  }
  toggleEditButton() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.isReadOnly = false;
      this.isEditable = true;
    } else {
      this.isReadOnly = true;
      this.isEditable = false;
    }
  }
  edit() {
    this.isReadOnly = false;
    this.isEditable = true;
  }

  updateProduct() {
    var inputData = {
      image: this.product.image,
      name: this.product.name,
      model: this.product.model,
      code: this.product.code,
      price: this.product.price,
      category: this.product.category,
      quantity: this.product.quantity,
      points: this.product.points,
    };

    this.isLoading = true;

    this.productsService.updateProduct(inputData, this.productId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.toast.success({detail:"SUCCESS",summary:'Product Succesfully Updated!',duration:3000, position:'topCenter'});
        this.successMessage = 'Success! Product updated.';
        setTimeout(() => (this.successMessage = null), 1500);
        this.isEditing = false;
        this.isReadOnly = true;
        this.isEditable = false;
        this.errors = {};
      },
      error: (err: any) => {
        this.toast.error({detail:"ERROR",summary:'Failed to Updated!',duration:3000, position:'topCenter'});
        this.errors = err.error.errors;
        this.isLoading = false;
      },
    });
  }

  generateBarcode() {
    this.isLoading = true;

    this.productsService.getProduct(this.productId).subscribe({
      next: (res: any) => {
        this.openDialog(res);
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false;
      },
    });
   
  }
  openDialog(product: ProductsResponse): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        full_name: product.name,
        barcode: product.barcode,
        createdDate: product.created_at,
      },
    });
  }

}