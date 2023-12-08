import { Component, HostListener, Input, OnInit } from '@angular/core';
import { notifications, userItems } from './header-dummy-data';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Role } from 'src/app/shared/interfaces/Role';
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
  

  constructor(public authService: AuthenticationService) {}

  @HostListener('window:resize', ['$event'])
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

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.updateUserItems();
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
        {
          routeLink: 'profile',
          icon: 'far fa-user',
          label: 'Profile',
          disabled: false,
        },
        {
          routeLink: 'settings',
          icon: 'far fa-cog',
          label: 'Setting',
          disabled: false,
        },
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