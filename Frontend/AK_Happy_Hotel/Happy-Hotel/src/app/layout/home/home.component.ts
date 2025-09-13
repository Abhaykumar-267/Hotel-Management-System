import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy,HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LogoutComponent } from "../logout/logout.component";
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';
import { RoomCarouselComponent } from "../../common/room-carousel/room-carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, LogoutComponent, RoomCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  showAccount = false;
    isLoggedIn = false;
    userRole: string | null = null;
    userName: string | null = null;
  
    logoutMessage: string | null = null;
  
    private subscriptions: Subscription[] = [];
  
    constructor(private authService: AuthService, private router: Router) {}
  
    ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe((status) => {this.isLoggedIn = status;});
      this.authService.userRole$.subscribe((role) => {this.userRole = role;});
      this.authService.userName$.subscribe((name) => {this.userName = name;});
      this.authService.logoutMessage$.subscribe((msg) => {this.logoutMessage = msg;});
    }
  
    toggleAccountDropdown(event: MouseEvent): void {
      event.stopPropagation();
      this.showAccount = !this.showAccount;
    }
  
    closeAccountDropdown(): void {
      this.showAccount = false;
    }
  
    // ✅ bahar click karne par dropdown band hoga
    @HostListener('document:click')
    closeOnOutsideClick(): void {
      this.showAccount = false;
    }
  
    // ✅ mobile menu toggle (agar chahiye)
    menuOpen = false;
    toggleMenu(): void {
      this.menuOpen = !this.menuOpen;
    }
  
    ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}


  // currentYear: number = new Date().getFullYear();


