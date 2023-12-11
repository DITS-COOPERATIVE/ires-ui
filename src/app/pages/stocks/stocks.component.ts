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

  constructor(private productsService: ProductsService, private router: Router) {}
  displayedColumns: string[] = [
    'name',
    'model',
    'price',
    'quantity',
    'category',
  ];
  columnHeaders: TableColumnHeaders = {
    name: 'Name',
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

  saveQuantity(product: any) {
    var inputData = {
      quantity: product.quantity,
    };
  
    this.isLoading = true;
  
    this.productsService.updateProduct(inputData, product.id).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.successMessage = 'Success! Quantity saved.';
        setTimeout(() => (this.successMessage = null), 3000);
        this.errors = {};
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false;
      },
    });
  
    console.log('Saving quantity:', product.quantity);
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
    console.log('Delete Selected Items:', selectedItems);
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
