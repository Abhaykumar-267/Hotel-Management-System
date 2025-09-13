// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-room',
//   standalone: true,
//   imports: [],
//   templateUrl: './add-room.component.html',
//   styleUrl: './add-room.component.css'
// })
// export class AddRoomComponent {

// }


import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RoomService } from '../../room/services/room-service.service';
import { RoomTypeSelectorComponent } from '../room-type-selector/room-type-selector.component';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RoomTypeSelectorComponent],
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent {

  newRoom: any = {
    photo: null,
    roomType: '',
    roomPrice: ''
  };

  successMessage = '';
  errorMessage   = '';
  imagePreview   = '';

  filteredRooms: any[] = [];
  selectedType: string = '';
  rooms: any[] = [];
  roomTypes: string[] = [];
  filter: string = "";

  constructor(private roomService: RoomService) {}

  handleImageChange(event: any) {
    const selected = event.target.files[0];
    this.newRoom.photo = selected;
    this.imagePreview = URL.createObjectURL(selected);
  }

  async handleSubmit() {
    try {
      const result = await this.roomService.addRoom(this.newRoom).toPromise();
      this.successMessage = 'A new room was added successfully!';
      this.newRoom = { photo: null, roomType: '', roomPrice: '' };
      this.imagePreview = '';
      this.errorMessage = '';
    } catch (err: any) {
      this.errorMessage = err.message || 'Error adding room';
    }
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage  = '';
    }, 3000);
  }

  
  // applyFilter(event: Event) {
  //   const value = (event.target as HTMLSelectElement).value;
  //   this.selectedType = value;
  //   this.filteredRooms = value
  //     ? this.rooms.filter((room) => room.roomType === value)
  //     : [...this.rooms];
  // }

}

