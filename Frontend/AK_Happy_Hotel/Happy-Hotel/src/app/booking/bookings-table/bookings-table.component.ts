// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-bookings-table',
//   standalone: true,
//   imports: [],
//   templateUrl: './bookings-table.component.html',
//   styleUrl: './bookings-table.component.css'
// })
// export class BookingsTableComponent {

// }


import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-bookings-table',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})
export class BookingsTableComponent implements OnChanges {

  @Input() bookingInfo: any[] = [];
  @Output() bookingCancel = new EventEmitter<string>();

  filteredBookings: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookingInfo']) {
      this.filteredBookings = [...this.bookingInfo];
    }
  }

  /** Filter booking by check-in date */
  filterBookings(startDate: string, endDate: string) {
    if (!startDate || !endDate) {
      this.filteredBookings = [...this.bookingInfo];
      return;
    }
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);

    this.filteredBookings = this.bookingInfo.filter(b => {
      const d = this.truncate(new Date(b.checkInDate));
      return d >= start && d <= end;
    });
  }

  truncate(d: Date) {
    d.setHours(0, 0, 0, 0);
    return d;
  }

  formatDate(dateInput: any): string {
    try {
      if (typeof dateInput === 'string' && dateInput.length === 8 && !dateInput.includes('-')) {
        return `${dateInput.slice(0, 4)}-${dateInput.slice(4, 6)}-${dateInput.slice(6, 8)}`;
      }
      const dateObj = (typeof dateInput === 'string') ? parseISO(dateInput) : new Date(dateInput);
      return format(dateObj, 'yyyy-MM-dd');
    } catch (err) {
      return dateInput;
    }
  }

  backToAdmin() {
    window.history.back();
  }

  successMessage: string = '';  // <-- add this on top with other props

  cancel(bookingId: string) {
    this.bookingCancel.emit(bookingId);             // emit to parent
    this.successMessage = 'Booking cancelled successfully!';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}
