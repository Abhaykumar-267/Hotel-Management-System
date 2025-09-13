// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import moment from 'moment';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { RoomService } from '../../room/services/room-service.service';
// import { BookingService } from '../booking.service';
// import { CommonModule } from '@angular/common';
// import { BookingSummaryComponent } from "../booking-summary/booking-summary.component";

// @Component({
//   selector: 'app-booking-form',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, BookingSummaryComponent],
//   templateUrl: './booking-form.component.html',
//   styleUrls: ['./booking-form.component.css']
// })
// export class BookingFormComponent implements OnInit {
//   bookingForm!: FormGroup;
//   isSubmitted = false;
//   roomId!: string;
//   roomPrice = 0;
//   errorMessage = '';
//   currentUserEmail = '';

//   constructor(
//     private fb: FormBuilder,
//     private bookingService: BookingService,
//     private roomService: RoomService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.bookingForm = this.fb.group({
//       guestFullName: ['', Validators.required],
//       checkInDate: ['', Validators.required],
//       checkOutDate: ['', Validators.required],
//       numOfAdults: [0, [Validators.required, Validators.min(1)]],
//       numOfChildren: [0, [Validators.required, Validators.min(0)]]
//     });

//     // Get user email from localStorage
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         this.currentUserEmail = user?.email || '';
//       } catch (e) {
//         console.error('Invalid user object in localStorage');
//       }
//     }

//     this.route.paramMap.subscribe(params => {
//       const id = params.get('roomId');
//       if (id) {
//         this.roomId = id;
//         this.getRoomPrice(id);
//       }
//     });
//   }

//   getRoomPrice(roomId: string): void {
//     this.roomService.getRoomById(roomId).subscribe({
//       next: (room) => {
//         this.roomPrice = room.roomPrice;
//       },
//       error: (err) => {
//         this.errorMessage = err.message || 'Failed to fetch room price';
//       }
//     });
//   }

//   calculatePayment(): number {
//     const checkInDate = moment(this.bookingForm.get('checkInDate')?.value);
//     const checkOutDate = moment(this.bookingForm.get('checkOutDate')?.value);
//     const diffInDays = checkOutDate.diff(checkInDate, 'days');
//     return diffInDays > 0 ? diffInDays * this.roomPrice : 0;
//   }

//   isCheckOutDateValid(): boolean {
//     const checkIn = moment(this.bookingForm.get('checkInDate')?.value);
//     const checkOut = moment(this.bookingForm.get('checkOutDate')?.value);
//     if (!checkOut.isSameOrAfter(checkIn)) {
//       this.errorMessage = 'Check-out date must be after check-in date';
//       return false;
//     }
//     this.errorMessage = '';
//     return true;
//   }

//   onSubmit(): void {
//     if (this.bookingForm.invalid || !this.isCheckOutDateValid()) {
//       this.bookingForm.markAllAsTouched();
//       return;
//     }

//     this.isSubmitted = true;
//   }

//   confirmBooking(): void {
//     const formValues = {
//       ...this.bookingForm.value,
//       guestEmail: this.currentUserEmail
//     };

//     this.bookingService.bookRoom(this.roomId, formValues).subscribe({
//       next: (confirmationCode) => {
//         this.router.navigate(['/booking-success'], {
//           state: { message: confirmationCode }
//         });
//       },
//       error: (error) => {
//         this.router.navigate(['/booking-success'], {
//           state: { error: error.message || 'Booking failed' }
//         });
//       }
//     });
//   }

// }











// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import moment from 'moment';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { RoomService } from '../../room/services/room-service.service';
// import { BookingService } from '../booking.service';
// import { CommonModule } from '@angular/common';
// import { BookingSummaryComponent } from "../booking-summary/booking-summary.component";

// @Component({
//   selector: 'app-booking-form',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, BookingSummaryComponent],
//   templateUrl: './booking-form.component.html',
//   styleUrls: ['./booking-form.component.css']
// })
// export class BookingFormComponent implements OnInit {
//   bookingForm!: FormGroup;
//   isSubmitted = false;
//   roomId!: string;
//   roomPrice = 0;
//   errorMessage = '';
//   currentUserEmail = '';

//   // ✅ ADDED
//   calculatedPayment = 0;
//   preparedBooking: any = {};


//   constructor(
//     private fb: FormBuilder,
//     private bookingService: BookingService,
//     private roomService: RoomService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.bookingForm = this.fb.group({
//       guestFullName: ['', Validators.required],
//       checkInDate: ['', Validators.required],
//       checkOutDate: ['', Validators.required],
//       numOfAdults: [0, [Validators.required, Validators.min(1)]],
//       numOfChildren: [0, [Validators.required, Validators.min(0)]]
//     });

//     // ✅ ADDED: Update payment whenever form changes
//     this.bookingForm.valueChanges.subscribe(() => {
//       const days = this.calculateDays();
//       this.calculatedPayment = days * this.roomPrice;
//     });

//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         this.currentUserEmail = user?.email || '';
//       } catch (e) {
//         console.error('Invalid user object in localStorage');
//       }
//     }

//     this.route.paramMap.subscribe(params => {
//       const id = params.get('roomId');
//       if (id) {
//         this.roomId = id;
//         this.getRoomPrice(id);
//       }
//     });
//   }

//   // getRoomPrice(roomId: string): void {
//   //   this.roomService.getRoomById(roomId).subscribe({
//   //     next: (room) => {
//   //       this.roomPrice = room.roomPrice;

//   //       // ✅ recalculate payment after fetching price
//   //       const days = this.calculateDays();
//   //       this.calculatedPayment = days * this.roomPrice;
//   //     },
//   //     error: (err) => {
//   //       this.errorMessage = err.message || 'Failed to fetch room price';
//   //     }
//   //   });
    
//   // }

//   // ✅ ADDED: helper for days
//   calculateDays(): number {
//     const checkIn = this.bookingForm.get('checkInDate')?.value;
//     const checkOut = this.bookingForm.get('checkOutDate')?.value;
//     if (checkIn && checkOut) {
//       return moment(checkOut).diff(moment(checkIn), 'days');
//     }
//     return 0;
//   }

//   calculatePayment(): number {
//     const checkInDate = moment(this.bookingForm.get('checkInDate')?.value);
//     const checkOutDate = moment(this.bookingForm.get('checkOutDate')?.value);
//     const diffInDays = checkOutDate.diff(checkInDate, 'days');
//     return diffInDays > 0 ? diffInDays * this.roomPrice : 0;
//   }

//   isCheckOutDateValid(): boolean {
//     const checkIn = moment(this.bookingForm.get('checkInDate')?.value);
//     const checkOut = moment(this.bookingForm.get('checkOutDate')?.value);
//     if (!checkOut.isSameOrAfter(checkIn)) {
//       this.errorMessage = 'Check-out date must be after check-in date';
//       return false;
//     }
//     this.errorMessage = '';
//     return true;
//   }

//   getRoomPrice(roomId: string): void {
//   this.roomService.getRoomById(roomId).subscribe({
//     next: (room) => {
//       this.roomPrice = room.roomPrice;               // ✅ price from API
//       console.log("Fetched Room Price = ", this.roomPrice);
//       // Auto update payment if form already has dates
//       const days = this.calculateDays();
//       this.calculatedPayment = days > 0 ? days * this.roomPrice : 0;
//       console.log("Calculated Payment = ", this.calculatedPayment);
//     },
//     error: (err) => {
//       this.errorMessage = err.message || 'Failed to fetch room price';
//     }
//   });
// }

// onSubmit() {
//   if (this.bookingForm.invalid) {
//     return;
//   }
  
//   // ✅ Wait until roomPrice gets loaded
//   if (!this.roomPrice || this.roomPrice === 0) {
//     alert('Room price abhi load ho raha hai... please wait & try again.');
//     return;
//   }

//   const days = this.calculateDays();
//   this.calculatedPayment = days > 0 ? days * this.roomPrice : 0;
//   console.log("Submit Payment =", this.calculatedPayment);

//   this.preparedBooking = {
//     ...this.bookingForm.value,
//     guestEmail: this.currentUserEmail
//   };
//   this.isSubmitted = true;
// }


//   confirmBooking(): void {
//     const formValues = {
//       ...this.bookingForm.value,
//       guestEmail: this.currentUserEmail
//     };

//     this.bookingService.bookRoom(this.roomId, formValues).subscribe({
//       next: (confirmationCode) => {
//         this.router.navigate(['/booking-success'], {
//           state: { message: confirmationCode }
//         });
//       },
//       error: (error) => {
//         this.router.navigate(['/booking-success'], {
//           state: { error: error.message || 'Booking failed' }
//         });
//       }
//     });
//   }

//   // ✅ ADDED: This method is called when booking is confirmed from child
//   handleBookingConfirmed = () => {
//     this.confirmBooking();
//   }
// }


// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import moment from 'moment';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { RoomService } from '../../room/services/room-service.service';
// import { BookingService } from '../booking.service';
// import { CommonModule } from '@angular/common';
// import { BookingSummaryComponent } from "../booking-summary/booking-summary.component";

// @Component({
//   selector: 'app-booking-form',
//   standalone: true,
//    imports: [CommonModule, ReactiveFormsModule, BookingSummaryComponent],
//   templateUrl: './booking-form.component.html',
//   styleUrls: ['./booking-form.component.css']
// })
// export class BookingFormComponent implements OnInit {
//   bookingForm!: FormGroup;
//   isSubmitted = false;
//   @Input() roomId!: string;
//   roomPrice = 0;
//   errorMessage = '';
//   currentUserEmail = '';
//   calculatedPayment = 0;
//   preparedBooking: any = {};

//   constructor(
//     private fb: FormBuilder,
//     private bookingService: BookingService,
//     private roomService: RoomService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.bookingForm = this.fb.group({
//       guestFullName: ['', Validators.required],
//       checkInDate: ['', Validators.required],
//       checkOutDate: ['', Validators.required],
//       numOfAdults: [[Validators.required, Validators.min(0)]],
//       numOfChildren: [[Validators.required, Validators.min(0)]]
//     });

//     // show payment when user change date
//     this.bookingForm.valueChanges.subscribe(() => {
//       const days = this.calculateDays();
//       this.calculatedPayment = days * this.roomPrice;
//     });

//     // get user email from localstorage 
    // const userStr = localStorage.getItem('user');
    // if (userStr) {
    //   try {
    //     const user = JSON.parse(userStr);
    //     this.currentUserEmail = user?.email || '';
    //   } catch (e) {
    //     console.error('Invalid user object');
    //   }
    // }

//     // get roomId from URL
//     this.route.paramMap.subscribe(params => {
//       console.log('PARAM =>', params.get('roomId'));            // debug √
//       const id = params.get('roomId');
//       if (id) {
//         console.log('Calling getRoomPrice with id=', id);        // debug √
//         this.roomId = id;
//         this.getRoomPrice(id);
//       }
//     });
//   }

//   getRoomPrice(roomId: string): void {
//   console.log("getRoomPrice CALLED with id =", roomId);
//   this.roomService.getRoomById(roomId).subscribe({
//     next: (room) => {
//       console.log("API SUCCESS =>", room);
//       this.roomPrice = room.roomPrice;
//       console.log("roomPrice SET =", this.roomPrice);
//       const days = this.calculateDays();
//       this.calculatedPayment = days > 0 ? days * this.roomPrice : 0;
//       console.log("calculatedPayment =", this.calculatedPayment);
//     },
//     error: (err) => {
//       console.log("API FAILED =>", err);
//       this.errorMessage = err.message || 'Failed to fetch room price';
//     }
//   });
// }


//   calculateDays(): number {
//     const checkIn = this.bookingForm.get('checkInDate')?.value;
//     const checkOut = this.bookingForm.get('checkOutDate')?.value;
//     if (checkIn && checkOut) {
//       return moment(checkOut).diff(moment(checkIn), 'days');
//     }
//     return 0;
//   }

//   // @Input() roomId!: string;
//   @Output() formSubmitData = new EventEmitter<any>();
//   onSubmit() {
//   if (this.bookingForm.invalid) return;

//   if (!this.roomPrice) {
//     alert('Room price loading. Please wait...');
//     return;
//   }

//   const days = this.calculateDays();
//   this.calculatedPayment = days > 0 ? days * this.roomPrice : 0;

//   this.preparedBooking = {
//     ...this.bookingForm.value,
//     guestEmail: this.currentUserEmail
//   };

//   this.isSubmitted = true;

//   // Emit to parent so parent can show the summary
//   this.formSubmitData.emit({
//     booking: this.preparedBooking,
//     payment: this.calculatedPayment
//   });
// }

//   confirmBooking(): void {
//     this.bookingService.bookRoom(this.roomId, {
//       ...this.bookingForm.value,
//       guestEmail: this.currentUserEmail
//     }).subscribe({
//       next: code => {
//         this.router.navigate(['/booking-success'], { state: { message: code }});
//       },
//       error: err => {
//         this.router.navigate(['/booking-success'], { state: { error: err.message || 'Booking failed' }});
//       }
//     });
//   }

//   handleBookingConfirmed = () => {
//     this.confirmBooking();
//   }
// }


// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import moment from 'moment';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { RoomService } from '../../room/services/room-service.service';
// import { BookingService } from '../booking.service';
// import { CommonModule } from '@angular/common';
// import { BookingSummaryComponent } from "../booking-summary/booking-summary.component";
// import { AuthService } from '../../layout/service/auth.service';

// @Component({
//   selector: 'app-booking-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, BookingSummaryComponent],
//   templateUrl: './booking-form.component.html',
//   styleUrls: ['./booking-form.component.css']
// })
// export class BookingFormComponent implements OnInit {
//   bookingForm!: FormGroup;
//   isSubmitted = false;

//   @Input() roomId!: string;
//   @Output() formSubmitData = new EventEmitter<any>();

//   roomPrice = 0;
//   errorMessage = '';
//   currentUserEmail = '';
//   calculatedPayment = 0;
//   preparedBooking: any = {};

//   constructor(
//     private fb: FormBuilder,
//     private bookingService: BookingService,
//     private roomService: RoomService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.bookingForm = this.fb.group({
//       guestFullName: ['', Validators.required],
//       checkInDate: ['', Validators.required],
//       checkOutDate: ['', Validators.required],
//       numOfAdults: [1, [Validators.required, Validators.min(1)]],
//       numOfChildren: [0, [Validators.required, Validators.min(0)]]
//     });

//     // ✅ Get current logged-in user email
//     this.currentUserEmail = this.authService.getEmail() || '';
//     console.log("✅ Logged-in email:", this.currentUserEmail);

//     // ✅ Auto payment calculation
//     this.bookingForm.valueChanges.subscribe(() => {
//       const days = this.calculateDays();
//       this.calculatedPayment = days * this.roomPrice;
//     });

//     // ✅ Get roomId from route
//     this.route.paramMap.subscribe(params => {
//       const id = params.get('roomId');
//       if (id) {
//         this.roomId = id;
//         this.getRoomPrice(id);
//       }
//     });
//   }

//   getRoomPrice(roomId: string): void {
//     this.roomService.getRoomById(roomId).subscribe({
//       next: (room) => {
//         this.roomPrice = room.roomPrice;
//         const days = this.calculateDays();
//         this.calculatedPayment = days > 0 ? days * this.roomPrice : 0;
//       },
//       error: (err) => {
//         this.errorMessage = err.message || 'Failed to fetch room price';
//       }
//     });
//   }

//   calculateDays(): number {
//     const checkIn = this.bookingForm.get('checkInDate')?.value;
//     const checkOut = this.bookingForm.get('checkOutDate')?.value;
//     if (checkIn && checkOut) {
//       return moment(checkOut).diff(moment(checkIn), 'days');
//     }
//     return 0;
//   }

//   // ✅ Step 1: Show summary
//   onSubmit() {
//     if (this.bookingForm.invalid) return;

//     if (!this.roomPrice) {
//       alert('Room price loading. Please wait...');
//       return;
//     }

//     const days = this.calculateDays();
//     this.calculatedPayment = days > 0 ? days * this.roomPrice : 0;

//     this.preparedBooking = {
//       ...this.bookingForm.value,
//       guestEmail: this.currentUserEmail   // 👈 fix
//     };

//     this.isSubmitted = true;

//     this.formSubmitData.emit({
//       booking: this.preparedBooking,
//       payment: this.calculatedPayment
//     });
//   }

//   // ✅ Step 2: Confirm booking
//   confirmBooking(): void {
//     this.bookingService.bookRoom(this.roomId, {
//       ...this.bookingForm.value,
//       guestEmail: this.currentUserEmail   // 👈 fix
//     }).subscribe({
//       next: code => {
//         this.router.navigate(['/booking-success'], { state: { message: code }});
//       },
//       error: err => {
//         this.router.navigate(['/booking-success'], { state: { error: err.message || 'Booking failed' }});
//       }
//     });
//   }

//   handleBookingConfirmed = () => {
//     this.confirmBooking();
//   }
// }






import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../room/services/room-service.service';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';
import { BookingSummaryComponent } from "../booking-summary/booking-summary.component";
import { AuthService } from '../../layout/service/auth.service';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BookingSummaryComponent],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  isSubmitted = false;

  @Input() roomId!: string;
  @Output() formSubmitData = new EventEmitter<any>();

  roomPrice = 0;
  errorMessage = '';
  currentUserEmail = '';
  calculatedPayment = 0;
  preparedBooking: any = {};

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      guestFullName: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      numOfAdults: [1, [Validators.required, Validators.min(1)]],
      numOfChildren: [0, [Validators.required, Validators.min(0)]]
    });

    // ✅ Get current logged-in user email
    this.currentUserEmail = this.authService.getEmail() || '';
    console.log("✅ Logged-in email:", this.currentUserEmail);

    // ✅ Auto payment calculation
    this.bookingForm.valueChanges.subscribe(() => {
      const days = this.calculateDays();
      this.calculatedPayment = days > 0 ? days * this.roomPrice : 0;
    });

    // ✅ Get roomId from route
    this.route.paramMap.subscribe(params => {
      const id = params.get('roomId');
      if (id) {
        this.roomId = id;
        this.getRoomPrice(id);
      }
    });
  }

  getRoomPrice(roomId: string): void {
    this.roomService.getRoomById(roomId).subscribe({
      next: (room) => {
        this.roomPrice = room.roomPrice;
        const days = this.calculateDays();
        this.calculatedPayment = days > 0 ? days * this.roomPrice : 0;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to fetch room price';
      }
    });
  }

  calculateDays(): number {
    const checkIn = this.bookingForm.get('checkInDate')?.value;
    const checkOut = this.bookingForm.get('checkOutDate')?.value;
    if (checkIn && checkOut) {
      return moment(checkOut).diff(moment(checkIn), 'days');
    }
    return 0;
  }

  /** Step 1: Show summary */
  onSubmit() {
    if (this.bookingForm.invalid) return;

    if (!this.roomPrice) {
      alert('Room price loading. Please wait...');
      return;
    }

    const days = this.calculateDays();
    this.calculatedPayment = days > 0 ? days * this.roomPrice : 0;

    this.preparedBooking = {
      ...this.bookingForm.value,
      guestEmail: this.currentUserEmail   // 👈 Always from AuthService
    };

    this.isSubmitted = true;

    this.formSubmitData.emit({
      booking: this.preparedBooking,
      payment: this.calculatedPayment
    });
  }

  /** Step 2: Confirm booking */
  confirmBooking(): void {
    const bookingPayload = {
      ...this.bookingForm.value,
      guestEmail: this.currentUserEmail
    };

    this.bookingService.bookRoom(this.roomId, bookingPayload).subscribe({
      next: code => {
        this.router.navigate(['/booking-success'], { state: { message: code }});
      },
      error: err => {
        this.router.navigate(['/booking-success'], { state: { error: err.message || 'Booking failed' }});
      }
    });
  }

  handleBookingConfirmed = () => {
    this.confirmBooking();
  }
}



