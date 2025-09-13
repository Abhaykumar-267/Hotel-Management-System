// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-profile',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './profile.component.html',
// //   styleUrl: './profile.component.css'
// // })
// // export class ProfileComponent {

// // }


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import moment from 'moment';
// import { BookingService } from '../../booking/booking.service';
// import { AuthService } from '../service/auth.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   user: any = {
//     id: '',
//     email: '',
//     firstName: '',
//     lastName: '',
//     roles: [{ id: '', name: '' }]
//   };

//   bookings: any[] = [
//     {
//       id: '',
//       room: { id: '', roomType: '' },
//       checkInDate: '',
//       checkOutDate: '',
//       bookingConfirmationCode: ''
//     }
//   ];

//   message: string = '';
//   errorMessage: string = '';

//   userId: string | null = localStorage.getItem('userId');
//   token: string | null = localStorage.getItem('token');

//   constructor(
//     private authService: AuthService,
//     private bookingService: BookingService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     if (this.userId && this.token) {
//       this.fetchUser();
//       this.fetchBookings();
//     }
//   }

//   fetchUser(): void {
//     this.authService.getUser(this.userId!, this.token!).subscribe({
//       next: (data) => {
//         this.user = data;
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Failed to fetch user data.';
//       }
//     });
//   }

//   fetchBookings(): void {
//     this.bookingService.getBookingsByUserId(this.userId!, this.token!).subscribe({
//       next: (data) => {
//         this.bookings = data;
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Error fetching bookings.';
//       }
//     });
//   }

//   formatDate(date: string): string {
//     return moment(date).subtract(1, 'month').format('MMM Do, YYYY');
//   }

//   handleDeleteAccount(): void {
//     const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
//     if (confirmed && this.userId) {
//       this.authService.deleteUser(this.userId).subscribe({
//         next: (response: any) => {
//           this.message = response.data;
//           localStorage.removeItem('token');
//           localStorage.removeItem('userId');
//           localStorage.removeItem('userRole');
//           this.router.navigate(['/']).then(() => {
//             window.location.reload();
//           });
//         },
//         error: (err) => {
//           console.error(err);
//           this.errorMessage = err.error?.data || 'Failed to delete account.';
//         }
//       });
//     }
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import moment from 'moment';
// import { BookingService } from '../../booking/booking.service';
// import { AuthService } from '../service/auth.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   user: any = {
//     id: '',
//     email: '',
//     firstName: '',
//     lastName: '',
//     roles: [{ id: '', name: '' }]
//   };

//   bookings: any[] = [];
//   message: string = '';
//   errorMessage: string = '';

//   userId: string | null = null;
//   token: string | null = null;

//   constructor(
//     private authService: AuthService,
//     private bookingService: BookingService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.token = this.authService.getToken();
//     const userId = this.authService.getUserId();

//     console.log('userId:', userId, 'token:', this.token);

//     if (userId && this.token) {
//       this.fetchUser(userId);
//       this.fetchBookings(userId);
//     } else {
//       this.errorMessage = 'User not logged in or token missing';
//     }
//   }

//   fetchUser(userId: string): void {
//     this.authService.getUser(userId).subscribe({
//       next: (data) => {
//         this.user = data;
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Failed to fetch user data.';
//       }
//     });
//   }

//   fetchBookings(userId: string): void {
//     this.bookingService.getBookingsByUserId(userId).subscribe({
//       next: (data) => {
//         this.bookings = data;
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Error fetching bookings.';
//       }
//     });
//   }

//   formatDate(date: string): string {
//     return moment(date).subtract(1, 'month').format('MMM Do, YYYY');
//   }

//   handleDeleteAccount(): void {
//     const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
//     if (confirmed && this.userId) {
//       this.authService.deleteUser(this.userId).subscribe({
//         next: (response: any) => {
//           this.message = response.data || 'Account deleted successfully';
//           this.authService.logout();
//           this.router.navigate(['/']).then(() => {
//             window.location.reload();
//           });
//         },
//         error: (err) => {
//           console.error(err);
//           this.errorMessage = err.error?.data || 'Failed to delete account.';
//         }
//       });
//     }
//   }
// }





// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import moment from 'moment';
// import { BookingService } from '../../booking/booking.service';
// import { AuthService } from '../service/auth.service';
// import { CommonModule } from '@angular/common';
//  // npm install jwt-decode
// const jwt_decode = require('jwt-decode');

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   user: any = {
//     id: '',
//     email: '',
//     firstName: '',
//     lastName: '',
//     roles: [{ id: '', name: '' }]
//   };

//   bookings: any[] = [];
//   message: string = '';
//   errorMessage: string = '';

//   token: string | null = null;
//   userEmail: string | null = null;

//   constructor(
//     private authService: AuthService,
//     private bookingService: BookingService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.token = this.authService.getToken();

//     if (this.token) {
//       const decoded: any = jwt_decode(this.token);
//       this.userEmail = decoded.sub; // sub usually contains email
//       console.log('Decoded email from token:', this.userEmail);

//       if (this.userEmail) {
//         this.fetchUser(this.userEmail);
//         this.fetchBookings(this.userEmail);
//       } else {
//         this.errorMessage = 'Invalid token: email not found';
//       }
//     } else {
//       this.errorMessage = 'User not logged in or token missing';
//     }
//   }

//   fetchUser(email: string): void {
//     this.authService.getUserByEmail(email).subscribe({
//       next: (data) => {
//         this.user = data;
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Failed to fetch user data.';
//       }
//     });
//   }

//   fetchBookings(email: string): void {
//     this.bookingService.findBookingByEmail(email).subscribe({
//       next: (data: any) => {
//         if (Array.isArray(data)) {
//           this.bookings = data;
//         } else if (data?.data && Array.isArray(data.data)) {
//           this.bookings = data.data;
//         } else {
//           this.bookings = [];
//         }
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Error fetching bookings.';
//       }
//     });
//   }

//   formatDate(date: string): string {
//     return moment(date).format('MMM Do, YYYY');
//   }

//   handleDeleteAccount(): void {
//     const confirmed = confirm(
//       'Are you sure you want to delete your account? This action cannot be undone.'
//     );

//     if (confirmed && this.userEmail) {
//       this.authService.deleteUser(this.userEmail).subscribe({
//         next: (response: any) => {
//           this.message = response?.data || 'Account deleted successfully';
//           this.authService.logout();
//           this.router.navigate(['/']).then(() => {
//             window.location.reload();
//           });
//         },
//         error: (err) => {
//           console.error(err);
//           this.errorMessage = err.error?.data || 'Failed to delete account.';
//         }
//       });
//     }
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import moment from 'moment';
// import { BookingService } from '../../booking/booking.service';
// import { AuthService } from '../service/auth.service';
// import { CommonModule } from '@angular/common';
// // 👇 alternate import (isme default issue nahi aayega)
// import * as jwt_decode from 'jwt-decode';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   user: any = {
//     id: '',
//     email: '',
//     firstName: '',
//     lastName: '',
//     roles: [{ id: '', name: '' }]
//   };

//   bookings: any[] = [];
//   message: string = '';
//   errorMessage: string = '';

//   token: string | null = null;
//   userEmail: string | null = null;

//   constructor(
//     private authService: AuthService,
//     private bookingService: BookingService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.token = this.authService.getToken();

//     if (this.token) {
//       try {
//         // 👇 decode fix
//         const decodedToken: any = (jwt_decode as any).default(this.token);
//         console.log('Decoded Token:', decodedToken);

//         // 👇 JWT me email usually "sub" ya "email" hota hai
//         this.userEmail = decodedToken.sub || decodedToken.email;

//         console.log('Decoded email from token:', this.userEmail);

//         if (this.userEmail) {
//           this.fetchUser(this.userEmail);
//           this.fetchBookings(this.userEmail);
//         } else {
//           this.errorMessage = 'Invalid token: email not found';
//         }
//       } catch (err) {
//         console.error('Error decoding token:', err);
//         this.errorMessage = 'Failed to decode token';
//       }
//     } else {
//       this.errorMessage = 'User not logged in or token missing';
//     }
//   }

//   fetchUser(email: string): void {
//     this.authService.getUserByEmail(email).subscribe({
//       next: (data) => {
//         this.user = data;
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Failed to fetch user data.';
//       }
//     });
//   }

//   fetchBookings(email: string): void {
//     this.bookingService.findBookingByEmail(email).subscribe({
//       next: (data: any) => {
//         if (Array.isArray(data)) {
//           this.bookings = data;
//         } else if (data?.data && Array.isArray(data.data)) {
//           this.bookings = data.data;
//         } else {
//           this.bookings = [];
//         }
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Error fetching bookings.';
//       }
//     });
//   }

//   formatDate(date: string): string {
//     return moment(date).format('MMM Do, YYYY');
//   }

//   handleDeleteAccount(): void {
//     const confirmed = confirm(
//       'Are you sure you want to delete your account? This action cannot be undone.'
//     );

//     if (confirmed && this.userEmail) {
//       this.authService.deleteUser(this.userEmail).subscribe({
//         next: (response: any) => {
//           this.message = response?.data || 'Account deleted successfully';
//           this.authService.logout();
//           this.router.navigate(['/']).then(() => {
//             window.location.reload();
//           });
//         },
//         error: (err) => {
//           console.error(err);
//           this.errorMessage = err.error?.data || 'Failed to delete account.';
//         }
//       });
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { BookingService } from '../../booking/booking.service';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode'; // 👈 new import

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: [{ id: '', name: '' }]
  };

  bookings: any[] = [];
  message: string = '';
  errorMessage: string = '';

  token: string | null = null;
  userEmail: string | null = null;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();

    if (this.token) {
      try {
        // ✅ token decode
        const decoded: any = jwtDecode(this.token); // 👈 use this
        this.userEmail = decoded.sub || decoded.email;

        console.log('Decoded email from token:', this.userEmail);

        if (this.userEmail) {
          this.fetchUser(this.userEmail);
          this.fetchBookings(this.userEmail);
        } else {
          this.errorMessage = 'Invalid token: email not found';
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        this.errorMessage = 'Failed to decode token';
      }
    } else {
      this.errorMessage = 'User not logged in or token missing';
    }
  }

  // ✅ user ko email ke basis pe fetch kar
  fetchUser(email: string): void {
    // this.authService.getUserByEmail(email).subscribe({
    //   next: (data) => {
    //     this.user = data;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.errorMessage = 'Failed to fetch user data.';
    //   }
    // });
    this.authService.getUserByEmail(email!).subscribe({
  next: (res: any) => {
    this.user = res;
    console.log("User loaded:", res);
  },
  error: (err) => {
    console.error("Failed to fetch user:", err);
  }
});
  }

  // ✅ bookings ko email ke basis pe fetch kar
  fetchBookings(email: string): void {
    this.bookingService.findBookingByEmail(email).subscribe({
      next: (data: any) => {
        this.bookings = Array.isArray(data)
          ? data
          : (data?.data && Array.isArray(data.data)) ? data.data : [];
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error fetching bookings.';
      }
    });
  }

  formatDate(date: string): string {
    return moment(date).format('MMM Do, YYYY');
  }

  handleDeleteAccount(): void {
    const confirmed = confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (confirmed && this.userEmail) {
      this.authService.deleteUser(this.userEmail).subscribe({
        next: (response: any) => {
          this.message = response?.data || 'Account deleted successfully';
          this.authService.logout();
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.error?.data || 'Failed to delete account.';
        }
      });
    }
  }
}
