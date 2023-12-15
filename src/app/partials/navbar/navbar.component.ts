import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './sidenav-data ';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { PermissionService } from 'src/app/services/permission/permission.service';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('fadeInOut', [
        transition(':enter', [
          style({opacity: 0}),
           animate('350ms',
            style({opacity: 1})
           )
    ]),
    transition(':leave', [
        style({opacity: 1}),
          animate('350ms',
            style({opacity: 0})
          )
    ])
    ]),
    trigger('rotate', [
       transition(':enter', [
         animate('1000ms',
          keyframes ([
              style({transform:'rotate (0deg)', offset: '0'}),
              style({transform: 'rotate (2turn)', offset: '1'})
             ])
            )
        ])
      ])
  ]

})
export class NavbarComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = true;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:rezise',['$event'])
  onResize(event:any){
    if(this.screenWidth <= 769){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});
    }
  }

  constructor(public permission: PermissionService) {
  }

  ngOnInit(): void {
    this.closeSidenav();
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void{
    this.collapsed =!this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});
  }
  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});
  }
  onMouseEnter() {
    if (this.screenWidth > 769) {
      this.collapsed = true;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }


  onMouseLeave() {
    if (this.screenWidth > 769) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

}
