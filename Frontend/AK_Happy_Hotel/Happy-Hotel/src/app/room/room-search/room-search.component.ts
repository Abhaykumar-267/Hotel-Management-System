import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RoomService } from '../services/room-service.service';
import { RoomTypeSelectorComponent } from '../room-type-selector/room-type-selector.component';
import { RoomSearchResultsComponent } from '../room-search-results/room-search-results.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-search',
  standalone: true,
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoomTypeSelectorComponent,
    RoomSearchResultsComponent,
    RouterModule
  ]
})
export class RoomSearchComponent {
  searchForm: FormGroup;
  errorMessage = '';
  availableRooms: any[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private roomService: RoomService) {
    this.searchForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomType: ['']
    });
  }

  todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  handleSearch() {
    if (this.searchForm.invalid) return;

    const { checkInDate, checkOutDate, roomType } = this.searchForm.value;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      this.errorMessage = 'Check-out date must be after check-in date';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.roomService.getAvailableRooms(checkInDate, checkOutDate, roomType).subscribe({
      next: (data) => {
        this.availableRooms = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error fetching available rooms';
        this.isLoading = false;
      }
    });
  }

  clearSearch() {
    this.searchForm.patchValue({
      checkInDate: '',
      checkOutDate: '',
      roomType: ''
    });
    this.availableRooms = [];
    this.errorMessage = '';
  }
}
