// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-find-booking',
//   standalone: true,
//   imports: [],
//   templateUrl: './find-booking.component.html',
//   styleUrl: './find-booking.component.css'
// })
// export class FindBookingComponent {

// }


import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-booking',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  templateUrl: './find-booking.component.html',
  styleUrls: ['./find-booking.component.css']
})
export class FindBookingComponent {
  confirmationCode: string = '';
  error: string | null = null;
  successMessage: string = '';
  isLoading: boolean = false;
  isDeleted: boolean = false;

  bookingInfo: any = this.emptyBookingInfo();

  constructor(private bookingService: BookingService) {}

  emptyBookingInfo() {
    return {
      id: '',
      bookingConfirmationCode: '',
      room: { id: '', roomType: '' },
      roomNumber: '',
      checkInDate: '',
      checkOutDate: '',
      guestName: '',
      guestEmail: '',
      numOfAdults: '',
      numOfChildren: '',
      totalNumOfGuests: ''
    };
  }

  handleFormSubmit() {
    this.isLoading = true;
    this.error = null;

    this.bookingService.getBookingByConfirmationCode(this.confirmationCode).subscribe({
      next: (data) => {
        this.bookingInfo = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.bookingInfo = this.emptyBookingInfo();
        if (err.status === 404) {
          this.error = err.error.message;
        } else {
          this.error = err.message;
        }
        this.isLoading = false;
      }
    });
  }

  handleBookingCancellation() {
    this.bookingService.cancelBooking(this.bookingInfo.id).subscribe({
      next: () => {
        this.isDeleted = true;
        this.successMessage = 'Booking has been cancelled successfully!';
        this.bookingInfo = this.emptyBookingInfo();
        this.confirmationCode = '';
        this.error = null;

        setTimeout(() => {
          this.successMessage = '';
          this.isDeleted = false;
        }, 2000);
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }
}
