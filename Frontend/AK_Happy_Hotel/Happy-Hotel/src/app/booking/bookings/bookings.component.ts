// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BookingsTableComponent } from '../bookings-table/bookings-table.component';
// import { BookingService } from '../booking.service';
// import { HotelServiceComponent } from "../../common/hotel-service/hotel-service.component";

// @Component({
//   selector: 'app-bookings',
//   standalone: true,
//   imports: [CommonModule, BookingsTableComponent, HotelServiceComponent], // child table
//   templateUrl: './bookings.component.html',
//   styleUrls: ['./bookings.component.css']
// })
// export class BookingsComponent implements OnInit {

//   bookingInfo: any[] = [];
//   isLoading: boolean = true;
//   error: string = '';

//   constructor(private bookingService: BookingService) {}

//   ngOnInit(): void {
//     // simulate delay just like React “setTimeout”
//     setTimeout(() => {
//       this.fetchBookings();
//     }, 1000);
//   }

//   fetchBookings() {
//     this.bookingService.getAllBookings().subscribe({
//       next: (data: any[]) => {
//         this.bookingInfo = data;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         this.error = err.message || 'Error fetching bookings';
//         this.isLoading = false;
//       }
//     });
//   }

//   handleBookingCancellation(bookingId: string) {
//     this.bookingService.cancelBooking(bookingId).subscribe({
//       next: () => {
//         this.fetchBookings();
//       },
//       error: (err) => {
//         this.error = err.message || 'Error canceling booking';
//       }
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsTableComponent } from '../bookings-table/bookings-table.component';
import { BookingService } from '../booking.service';
import { HotelServiceComponent } from "../../common/hotel-service/hotel-service.component";

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, BookingsTableComponent, HotelServiceComponent], // child table
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookingInfo: any[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    // simulate delay just like React “setTimeout”
    setTimeout(() => {
      this.fetchBookings();
    }, 1000);
  }

  fetchBookings() {
    this.bookingService.getAllBookings().subscribe({
      next: (data: any[]) => {
        this.bookingInfo = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Error fetching bookings';
        this.isLoading = false;
      }
    });
  }

  handleBookingCancellation(bookingId: string) {
    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.fetchBookings();
      },
      error: (err) => {
        this.error = err.message || 'Error canceling booking';
      }
    });
  }
}
