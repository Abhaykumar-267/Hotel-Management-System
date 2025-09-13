import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoomService } from '../../room/services/room-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomPaginatorComponent } from "../room-paginator/room-paginator.component";

@Component({
  selector: 'app-room-carousel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RoomPaginatorComponent],
  templateUrl: './room-carousel.component.html',
  styleUrls: ['./room-carousel.component.css'],
})
export class RoomCarouselComponent implements OnInit {
  rooms: any[] = [];
  filteredRooms: any[] = [];
  paginatedRooms: any[] = [];
  roomTypes: string[] = [];

  isLoading = false;
  errorMessage = '';

  // Pagination
  currentPage = 1;
  pageSize = 3;
  totalPages = 1;
  totalPagesArray: number[] = [];

  // Filter
  selectedType: string = '';
  filter: string = "";

  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.filteredRooms = [...data];
        this.roomTypes = [...new Set(data.map((room: any) => room.roomType))];
        this.updatePagination();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching rooms';
        this.isLoading = false;
      },
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRooms.length / this.pageSize);
    this.totalPagesArray = Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRooms = this.filteredRooms.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedType = value;
    this.filteredRooms = value
      ? this.rooms.filter((room) => room.roomType === value)
      : [...this.rooms];
    this.currentPage = 1;
    this.updatePagination();
  }

  clearFilter() {
    this.selectedType = '';
    this.filteredRooms = [...this.rooms];
    this.currentPage = 1;
    this.updatePagination();
  }

  bookRoom(id: string) {
    const token = localStorage.getItem('token'); // yaha apne token ka key use kar

    if (!token) {
      // login nahi hai → login page pe bhej
      this.router.navigate(['/login']);
    } else {
      // login hai → checkout pe bhej
      this.router.navigate(['/booking-page', id]);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  goToBrowseAll() {
    this.router.navigate(['/browse-all-rooms']);
  }
}
