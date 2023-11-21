import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.updateAuthenticationStatus();
    this.isUserLoggedIn = this.authService.isAuthenticated();
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  private updateAuthenticationStatus() {
    this.authService.authenticationStatus.subscribe((status) => {
      this.isUserLoggedIn = status;
    });
  }
}
