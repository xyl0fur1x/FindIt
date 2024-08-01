import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router:Router, public NavbarService: NavbarService) {
  };
  onNavigateTo() {
    if(this.NavbarService.getStatus()) {
      this.router.navigate(['/profile', this.NavbarService.getRoute()]);
    } else {
      this.router.navigate(['/']);
    }
  }
  onNavigateNewPost() {
    if(this.NavbarService.getStatus()) {
      this.router.navigate(['/new-post']);

    }
  }
  
  
}
