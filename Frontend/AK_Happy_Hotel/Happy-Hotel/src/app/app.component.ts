import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./layout/home/home.component";
import { CommonModule } from '@angular/common';
import { RoomSearchComponent } from "./room/room-search/room-search.component";
import { HotelServiceComponent } from "./common/hotel-service/hotel-service.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, CommonModule, RoomSearchComponent, HotelServiceComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'Happy-Hotel';
  showAccount = false;
  isLoggedIn = !!localStorage.getItem('token');
  userRole = localStorage.getItem('userRole');
  toggleAccountDropdown(): void {
    this.showAccount = !this.showAccount;
  }

  isLoginPage = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url.includes('/login') || event.url.includes('/register')
         || event.url.includes('/find-booking') || event.url.includes('/browse-all-rooms')
         || event.url.includes('/admin') || event.url.includes('/booking-page') || event.url.includes('/existing-rooms')
         || event.url.includes('/add-room') || event.url.includes('/edit-room') || event.url.includes('/existing-bookings')
         || event.url.includes('/booking-data') || event.url.includes('/booking-success') || event.url.includes('/profile');
      }
    });
  }

}
