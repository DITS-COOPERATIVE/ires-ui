import { Component, HostListener, Input, OnInit } from '@angular/core';
import { notifications, userItems } from './header-dummy-data';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SearchService } from 'src/app/shared/search.service';
import { Role } from 'src/app/shared/interfaces/Role';
import { NotificationService } from 'src/app/shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
interface UserItem {
  icon: string;
  label: string;
  routeLink?: string;
  action?: () => void;
  disabled?: boolean;
  tooltipText?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  canShowSearchAsOverlay = false;
  notifications = notifications;
  showTooltip = false;
  userEmail: string | null = '';
  userItems: UserItem[] = [];
  notification: any[] = [];
  unreadCount: number = 0;
  userName!: string | null ;
  

  constructor(private authService: AuthenticationService,  private searchService: SearchService, 
    private route: ActivatedRoute, private notificationService: NotificationService, private router: Router) {}
  searchQuery: string = '';

  @HostListener('window:resize', ['$event'])
  
  isSearchVisible(): boolean {
    const routePath = this.router.url.split('/')[1];
    return ['products', 'customers', 'transactions'].includes(routePath);
  }
  
  

  onSearch(query: string) {
    this.searchService.sendSearchQuery(query);
  }

  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  getFirstLetterOfEmail(): string {
    this.userEmail = this.authService.getUserEmail();
    return this.userEmail ? this.userEmail.charAt(0).toUpperCase() : '';
  }

  showEmailTooltip(): void {
    this.showTooltip = true;
  }

  hideEmailTooltip(): void {
    this.showTooltip = false;
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


  getName() {
    this.userName = this.authService.getUserName();
  }
  ngOnInit(): void {
    this.notificationService.notification$.subscribe((notification) => {
      this.notification.unshift(notification);
    });
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.updateUserItems();
      this.getName();
  
  }

  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }

  updateUserItems(): void {
    const userRole: Role = this.authService.getUserRole();
  
    if (userRole === Role.ADMIN) {
      this.userItems  = [
        // {
        //   routeLink: 'profile',
        //   icon: 'far fa-user',
        //   label: 'Profile',
        //   disabled: false,
        // },
        // {
        //   routeLink: 'settings',
        //   icon: 'far fa-cog',
        //   label: 'Setting',
        //   disabled: false,
        // },
        {
          icon: 'far fa-power-off',
          label: 'Logout',
          action: () => this.authService.logout(),
        },
      ];
    } else if (userRole === Role.CASHIER) {
      this.userItems = [
        {
          icon: 'far fa-power-off',
          label: 'Logout',
          action: () => this.authService.logout()
        }
      ];
    }
  }
}