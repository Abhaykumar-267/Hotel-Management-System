import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RoomService } from '../../room/services/room-service.service';
import { RoomFilterComponent } from '../../common/room-filter/room-filter.component';
import { RoomPaginatorComponent } from "../../common/room-paginator/room-paginator.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-existing-rooms',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RoomFilterComponent, RoomPaginatorComponent],
  templateUrl: './existing-rooms.component.html',
  styleUrls: ['./existing-rooms.component.css']
})
export class ExistingRoomsComponent implements OnInit {

  roomTypes: string[] = [];
  rooms: any[] = [];
  filteredRooms: any[] = [];
  paginatedRooms: any[] = [];

  // Pagination state
  currentPage = 1;
  pageSize = 7;
  totalPages = 1;

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  selectedType: string = '';
  filter: string = "";

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRooms();
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

  loadRooms(): void {
    this.isLoading = true;
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.filteredRooms = [...data];
        this.updatePagination();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error fetching rooms';
        this.isLoading = false;
      }
    });
  }

  onFilterChange(filteredRooms: any) {
    this.filteredRooms = filteredRooms;
    this.currentPage = 1; // reset to first page
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRooms.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRooms = this.filteredRooms.slice(startIndex, endIndex);
  }
  

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  editRoom(roomId: string): void {
    this.router.navigate(['/edit-room', roomId]);
  }

  deleteRoom(roomId: string): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoom(roomId).subscribe({
        next: () => {
          this.successMessage = 'Room deleted successfully';
          this.rooms = this.rooms.filter(room => room.id !== roomId);
          this.filteredRooms = this.filteredRooms.filter(room => room.id !== roomId);
          this.updatePagination();
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.errorMessage = 'Error deleting room';
        }
      });
    }
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


}



// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterLink } from '@angular/router';
// import { RoomFilterComponent } from '../../common/room-filter/room-filter.component';
// import { RoomPaginatorComponent } from '../../common/room-paginator/room-paginator.component';
// import { RoomService } from '../services/room-service.service';


// @Component({
//   selector: 'app-existing-rooms',
//   standalone: true,
//   imports: [CommonModule, RouterLink, RoomFilterComponent, RoomPaginatorComponent],
//   templateUrl: './existing-rooms.component.html',
//   styleUrls: ['./existing-rooms.component.css']
// })
// export class ExistingRoomsComponent implements OnInit {

//   rooms: any[] = [];
//   filteredRooms: any[] = [];
//   // currentPage = 1;
//   roomsPerPage = 8;
//   isLoading = false;
//   selectedRoomType = '';
//   errorMessage = '';
//   successMessage = '';

//   constructor(private roomService: RoomService, private router: Router) {}

  // ngOnInit() {
  //   this.fetchRooms();
  // }

//   paginatedRooms: any[] = [];
//   currentPage = 1;
//   pageSize = 7;
//   totalPages = 1;

  // fetchRooms() {
  //   this.isLoading = true;
  //   this.roomService.getAllRooms().subscribe({
  //     next: (data) => {
  //       this.rooms = data;
  //       this.filteredRooms = [...data];
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.message;
  //       this.isLoading = false;
  //     }
  //   });
  // }

 

//   handleDelete(roomId: string) {
//     this.roomService.deleteRoom(roomId).subscribe({
//       next: () => {
//         this.successMessage = `Room No ${roomId} was deleted`;
//         this.fetchRooms();
//         setTimeout(() => {
//           this.successMessage = '';
//           this.errorMessage = '';
//         }, 3000);
//       },
//       error: (err) => {
//         this.errorMessage = err.message;
//       }
//     });
//   }

//   onFilterChange(filteredRooms: any) {
//     this.paginatedRooms = filteredRooms;
//   }

//   updatePagination(): void {
//     this.totalPages = Math.ceil(this.filteredRooms.length / this.pageSize);
//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     const endIndex = startIndex + this.pageSize;
//     this.paginatedRooms = this.filteredRooms.slice(startIndex, endIndex);
//   }
//   onPageChange(page: number): void {
//     this.currentPage = page;
//     this.updatePagination();
//   }

//   get currentRooms() {
//     const indexOfLastRoom = this.currentPage * this.roomsPerPage;
//     const indexOfFirstRoom = indexOfLastRoom - this.roomsPerPage;
//     return this.filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
//   }
// }
