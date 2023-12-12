import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ResizeEvent } from 'angular-resizable-element';
import { MatPaginator } from '@angular/material/paginator';
import {
  ProductsResponse,
  ProductsService,
} from 'src/app/services/products/products.service';
import { TableColumnHeaders } from 'src/app/shared/TableColumnHeaders ';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent {
  selectedCategory: string = 'all';
  products: ProductsResponse[] = [];
  product: any = {};
  editing: boolean = false;
  isLoading: boolean = false;
  successMessage: string | null = null;
  productId!: any;
  editingProductId: string | null = null;
  errors: any = [];

  constructor(private productsService: ProductsService, private router: Router, private toast: NgToastService,private notificationService: NotificationService) {}
  displayedColumns: string[] = [
    'name',
    'barcode',
    'model',
    'price',
    'quantity',
    'category',
  ];
  columnHeaders: TableColumnHeaders = {
    name: 'Name',
    barcode: 'Code',
    model: 'Model',
    price: 'Price',
    quantity: 'Quantity',
    category: 'Category',
  };

  dataSource = new MatTableDataSource<ProductsResponse>(this.products);
  selection = new SelectionModel<ProductsResponse>(true, []);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngOnInit(): void {
    this.productsService.getProductsLists().subscribe((data) => {
      this.products = data;
      this.dataSource.data = this.products;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  editQuantity(event: MouseEvent, product: any) {
    event.stopPropagation();
    this.editingProductId = product.id;
  }

  updateQuantity(product: any) {
    var inputData = {
      quantity: product.quantity,
    };
  
    this.isLoading = true;
  
    this.productsService.updateProduct(inputData, product.id).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.toast.success({detail:"SUCCESS",summary:'Quantity Updated',duration:4000, position:'topCenter'});
        this.errors = {};

        if (product.quantity < 20) {
          const notification = {
            icon: 'far fa-exclamation-circle', 
            subject: `${product.name} is low in quantity`,
            description: `Current quantity: ${product.quantity}`
          };
  
          this.notificationService.sendNotification(notification);
        }
      },
      error: (err: any) => {
        this.toast.error({detail:"ERROR",summary:'Failed to Updated Quantity',duration:4000, position:'topCenter'});
        this.errors = err.error.errors;
        this.isLoading = false;
      },
    });
    this.editingProductId = null;
  }

  
  cancelEdit() {
    this.editingProductId = null;
  }


  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  deleteSelected(): void {
    const selectedItems = this.selection.selected;
    selectedItems.forEach((item) => {
      const index = this.dataSource.data.indexOf(item);
      if (index > -1) {
        this.dataSource.data.splice(index, 1);
      }
    });
    this.selection.clear();
    this.dataSource._updateChangeSubscription();
  }

  validateResize = (event: ResizeEvent): boolean => {
    const minWidth = 100;

    if (event.rectangle && event.rectangle.width !== undefined) {
      return event.rectangle.width >= minWidth;
    }

    return false;
  };

  onResizeEnd(event: ResizeEvent, column: string): void {
    const resizedColumn = this.displayedColumns.find((col) => col === column);
    if (resizedColumn) {
      const columnIndex = this.displayedColumns.indexOf(resizedColumn);
      this.displayedColumns[
        columnIndex
      ] = `${resizedColumn}:${event.rectangle.width}px`;
      console.log(
        `Column: ${resizedColumn} Resized to Width: ${event.rectangle.width}`
      );
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }
}
