import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ResizeEvent } from 'angular-resizable-element';
interface StockItem {
  product: string;
  unitCost: number;
  totalValue: number;
  category: string;
}
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent {
  selectedCategory: string = 'all';
  stockItems: StockItem[] = [
    {
      product: 'Product 1',
      unitCost: 10,
      totalValue: 100,
      category: 'software',
    },
    { product: 'Product 2', unitCost: 20, totalValue: 200, category: 'wifi' },
    {
      product: 'Product 3',
      unitCost: 30,
      totalValue: 300,
      category: 'peso_wifi',
    },
    { product: 'Product 4', unitCost: 40, totalValue: 400, category: 'router' },
    {
      product: 'Product 5',
      unitCost: 50,
      totalValue: 500,
      category: 'service',
    },
  ];

  displayedColumns: string[] = [
    'product',
    'unitCost',
    'totalValue',
    'category',
  ];
  dataSource = new MatTableDataSource<StockItem>(this.stockItems);
  selection = new SelectionModel<StockItem>(true, []);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    // Implement your delete logic here using selectedItems array
    console.log('Delete Selected Items:', selectedItems);
  }

  validateResize = (event: ResizeEvent): boolean => {
    // Implement your resize validation logic here if needed
    return true;
  };

  onResizeEnd(event: ResizeEvent, column: string): void {
    // Handle column resizing logic here using event and column name
    console.log(`Column: ${column} Resized to Width: ${event.rectangle.width}`);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }
}
