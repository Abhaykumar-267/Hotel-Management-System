// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import moment from 'moment';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-booking-summary',
//   standalone: true,
//   imports: [FormsModule,CommonModule],
//   templateUrl: './booking-summary.component.html',
//   styleUrls: ['./booking-summary.component.css'],
// })
// export class BookingSummaryComponent {

//   @Input() booking: any = {
//     guestFullName: '',
//     guestEmail: '',
//     checkInDate: '',
//     checkOutDate: '',
//     numOfAdults: 1,
//     numOfChildren: 0
//   };
//   @Input() payment: number = 0;
//   @Input() isFormValid: boolean = false;
//   @Input() onConfirm: () => void = () => {};

//   isBookingConfirmed = false;
//   isProcessingPayment = false;

//   constructor(private router: Router) {}

//   get numberOfDays(): number {
//     if (!this.booking?.checkInDate || !this.booking?.checkOutDate) return 0;
//     const checkIn = moment(this.booking.checkInDate, 'YYYY-MM-DD');
//     const checkOut = moment(this.booking.checkOutDate, 'YYYY-MM-DD');
//     const days = checkOut.diff(checkIn, 'days');
//     return days > 0 ? days : 0;
//   }
//   // get numberOfDays(): number {
//   //   const checkIn = moment(this.booking?.checkInDate);
//   //   const checkOut = moment(this.booking?.checkOutDate);
//   //   return checkOut.diff(checkIn, 'days') > 0 ? checkOut.diff(checkIn, 'days') : 0;
//   // }

//   @Output() Confirm = new EventEmitter<void>();
//   handleConfirmBooking(): void {
//     if (this.numberOfDays <= 0) return; // safety check
//     this.isProcessingPayment = true;

//     // Simulate payment processing delay
//     setTimeout(() => {
//       this.isProcessingPayment = false;
//       this.isBookingConfirmed = true;
//       this.Confirm.emit();

//       // Navigate with success message
//       this.router.navigate(['/booking-success'])

//     }, 2000); // 2 seconds delay
//   }
// }





import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import moment from 'moment';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../layout/service/auth.service';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css'],
})
export class BookingSummaryComponent implements OnInit {

  @Input() booking: any = {
    guestFullName: '',
    guestEmail: '',
    checkInDate: '',
    checkOutDate: '',
    numOfAdults: 1,
    numOfChildren: 0
  };
  @Input() payment: number = 0;
  @Input() isFormValid: boolean = false;
  @Input() onConfirm: () => void = () => {};

  @Output() Confirm = new EventEmitter<void>();

  isBookingConfirmed = false;
  isProcessingPayment = false;
  userEmail: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // ✅ LocalStorage se direct email nikaalo
    this.userEmail = this.authService.getUserEmail();

    // ✅ Agar booking me email nahi hai to userEmail use karo
    if (!this.booking.guestEmail && this.userEmail) {
      this.booking.guestEmail = this.userEmail;
    }

    console.log("📌 Booking Summary Loaded:", this.booking);
  }

  get numberOfDays(): number {
    if (!this.booking?.checkInDate || !this.booking?.checkOutDate) return 0;
    const checkIn = moment(this.booking.checkInDate, 'YYYY-MM-DD');
    const checkOut = moment(this.booking.checkOutDate, 'YYYY-MM-DD');
    const days = checkOut.diff(checkIn, 'days');
    return days > 0 ? days : 0;
  }

  handleConfirmBooking(): void {
    if (this.numberOfDays <= 0) return; // safety check
    this.isProcessingPayment = true;

    // Simulate payment processing delay
    setTimeout(() => {
      this.isProcessingPayment = false;
      this.isBookingConfirmed = true;
      this.Confirm.emit();

      // Navigate with success message
      this.router.navigate(['/booking-success']);
    }, 2000);
  }
}

