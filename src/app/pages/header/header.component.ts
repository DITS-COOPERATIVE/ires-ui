import { Component, HostListener, Input, OnInit } from '@angular/core';
import { notifications, userItems } from './header-dummy-data';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SearchService } from 'src/app/shared/search.service';

interface UserItem {
  icon: string;
  label: string;
  routeLink?: string;
  action?: () => void;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input () screenWidth = 0;
  canShowSearchAsOverlay = false;
  notifications = notifications;
  userItems: UserItem[] = [
    ...userItems,
    {
      icon: 'far fa-power-off',
      label: 'Logout',
      action: () => this.authService.logout() 
    },
  ];



  constructor(private authService: AuthenticationService,  private searchService: SearchService) {}
  searchQuery: string = '';

  @HostListener('window:resize', ['$event'])

  onSearch(query: string) {
    this.searchService.sendSearchQuery(query);
  }

  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }
  getFirstLetterOfEmail(): string {
    const userEmail = this.authService.getUserEmail();
    return userEmail ? userEmail.charAt(0).toUpperCase() : '';
  }
  searchCustomer(input: string, sort: string): void {
    this.searchService.searchCustomers(input, sort).subscribe({
      next: (searchResults) => {
      },
      error: (error) => {
       
      }
    });
  }

  searchCustomers(input: string, sort: string): void {
    this.searchService.searchCustomers(input, sort).subscribe((result) => {
    });
  }


  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }
  getHeadClass(): string {
  let styleClass ='';
  if(this.collapsed && this.screenWidth > 768){
    styleClass = 'head-trimmed';
  }else{
    styleClass = 'head-md-screen';

  }
  return styleClass;
  }
  checkCanShowSearchAsOverlay(innerWidth:number): void{
    if(innerWidth < 845){
      this.canShowSearchAsOverlay = true;

    }else{
      this.canShowSearchAsOverlay = false;
    }
  }
  
}