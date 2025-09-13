// import { Component } from '@angular/core';
// import { CommonModule, Location } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-booking-success',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './booking-success.component.html',
//   styleUrls: ['./booking-success.component.css'],
// })
// export class BookingSuccessComponent {
//   message: string | null = null;
//   error: string | null = null;
//   constructor(private location: Location, private router: Router) {
//     const navigation = this.router.getCurrentNavigation();
//     const state = navigation?.extras.state as { message?: string; error?: string };

//     this.message = state?.message || null;
//     this.error = state?.error || null;
//   }
// }


import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css'],
})
export class BookingSuccessComponent {
  message: string | null = null;
  error: string | null = null;
  constructor(private location: Location, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { message?: string; error?: string };

    this.message = state?.message || null;
    this.error = state?.error || null;
  }
}

