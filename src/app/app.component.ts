import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';


interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthenticationService,  private router: Router) {}
  title = 'sidenav';

  isSideNavCollapsed = false
  screenWidth = 0;
  isUserLoggedIn: boolean = false;

  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth = data. screenWidth;
    this.isSideNavCollapsed = data. collapsed;

  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((isLoggedIn: boolean) => {
      this.isUserLoggedIn = isLoggedIn;
    });
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
}
