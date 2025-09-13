// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-room-filter',
//   standalone: true,
//   imports: [FormsModule,CommonModule,RouterLink],
//   templateUrl: './room-filter.component.html',
//   styleUrl: './room-filter.component.css'
// })
// export class RoomFilterComponent {

//   @Input() rooms: any[] = []; // ✅ Ye add karo

//   bookingCode: string = '';
//   loading: boolean = false;

//   findBooking() {
//     if (!this.bookingCode.trim()) return;

//     this.loading = true;

//     // Simulate API call
//     setTimeout(() => {
//       this.loading = false;
//       // TODO: Show booking details
//     }, 1500);
//   }
// }

// import { CommonModule } from '@angular/common';
// import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-room-filter',
//   standalone: true,
//   imports: [FormsModule, CommonModule, RouterLink],
//   templateUrl: './room-filter.component.html',
//   styleUrls: ['./room-filter.component.css']
// })
// export class RoomFilterComponent implements OnChanges {
//   @Input() data: any[] = []; // rooms data from parent
//   @Output() filteredDataChange = new EventEmitter<any[]>(); // send filtered data to parent

//   filter: string = '';
//   roomTypes: string[] = [];

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['data'] && this.data?.length) {
//       // Extract unique room types
//       this.roomTypes = Array.from(new Set(this.data.map(room => room.roomType)));
//     }
//   }

//   handleSelectChange(event: Event): void {
//     const selectedType = (event.target as HTMLSelectElement).value;
//     this.filter = selectedType;

//     if (!selectedType) {
//       this.filteredDataChange.emit(this.data); // show all if no filter
//       return;
//     }

//     const filteredRooms = this.data.filter(room =>
//       room.roomType?.toLowerCase() === selectedType.toLowerCase()
//     );
//     this.filteredDataChange.emit(filteredRooms);
//   }

//   clearFilter(): void {
//     this.filter = '';
//     this.filteredDataChange.emit(this.data); // reset to full list
//   }
// }



import { Component } from '@angular/core';
import { BookingService } from '../../booking/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-room-filter',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './room-filter.component.html',
  styleUrls: ['./room-filter.component.css']
})
export class RoomFilterComponent {
  bookingCode: string = '';
  bookingInfo: any = this.emptyBookingInfo();
  isLoading: boolean = false;
  error: string | null = null;
  isDeleted: boolean = false;
  successMessage: string = '';

  // 🔑 login-related
  isLoggedIn: boolean = false;   // isko tum apne AuthService/localStorage se set karna
  showLoginMessage: boolean = false;
  loginMessage: string = '';

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

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

  findBooking() {
    if (!this.bookingCode) {
      this.error = "Please enter a booking confirmation code!";
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.bookingService.getBookingByConfirmationCode(this.bookingCode).subscribe({
      next: (data) => {
        this.bookingInfo = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.bookingInfo = this.emptyBookingInfo();
        this.isLoading = false;
        if (err.status === 404) {
          this.error = "Booking not found!";
        } else {
          this.error = err.message;
        }
      }
    });
  }

  handleBookingCancellation() {
    if (this.isLoggedIn) {
      // ✅ User logged in -> cancel allowed
      this.bookingService.cancelBooking(this.bookingInfo.id).subscribe({
        next: () => {
          this.isDeleted = true;
          this.successMessage = "Booking cancelled successfully!";
          this.bookingInfo = this.emptyBookingInfo();
          this.bookingCode = '';

          setTimeout(() => {
            this.successMessage = '';
            this.isDeleted = false;
          }, 2000);
        },
        error: (err) => {
          this.error = err.message;
        }
      });
    } else {
      // ❌ User not logged in
      this.loginMessage = "⚠️ Please login first to cancel the booking!";
      this.showLoginMessage = true;

      setTimeout(() => {
        this.showLoginMessage = false;
        this.router.navigate(['/login']); // auto redirect after 5 sec
      }, 2000);
    }
  }
}
