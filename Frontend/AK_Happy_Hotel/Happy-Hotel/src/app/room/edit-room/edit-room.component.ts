// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-edit-room',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './edit-room.component.html',
// //   styleUrl: './edit-room.component.css'
// // })
// // export class EditRoomComponent {

// // }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RoomService } from '../../room/services/room-service.service';

// @Component({
//   selector: 'app-edit-room',
//   standalone: true,
//   imports: [CommonModule,RouterLink,FormsModule],
//   templateUrl: './edit-room.component.html',
//   styleUrls: ['./edit-room.component.css']
// })
// export class EditRoomComponent implements OnInit {

//   roomId: string = '';
//   room: any = {
//     photo: '',
//     roomType: '',
//     roomPrice: ''
//   };

//   imagePreview: string = '';
//   successMessage: string = '';
//   errorMessage: string = '';

//   constructor(
//     private route: ActivatedRoute,
//     private roomService: RoomService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.roomId = this.route.snapshot.paramMap.get('roomId') || '';
//     this.fetchRoom();
//   }

//   fetchRoom() {
//     this.roomService.getRoomById(this.roomId).subscribe({
//       next: (data) => {
//         this.room = data;
//         this.imagePreview = data.photo;
//       },
//       error: (err) => console.error(err)
//     });
//   }

//   handleImageChange(event: any) {
//     const selected = event.target.files[0];
//     this.room.photo = selected;
//     this.imagePreview = URL.createObjectURL(selected);
//   }

//   handleSubmit() {
//     this.roomService.updateRoom(this.roomId, this.room).subscribe({
//       next: () => {
//         this.successMessage = 'Room updated successfully!';
//         this.errorMessage = '';
//         // refetch updated info
//         this.fetchRoom();
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Error updating room';
//         this.successMessage = '';
//       }
//     });
//   }
// }




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../room/services/room-service.service';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  roomId: string = '';
  room: any = {
    photo: '',
    roomType: '',
    roomPrice: ''
  };

  imagePreview: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // get id from route
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    // fetch room details
    this.fetchRoom();
  }

  fetchRoom() {
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (data) => {
        this.room = data;
        // ✅ backend se base64 aa raha hai - show as preview
        this.imagePreview = data.photo;
      },
      error: (err) => console.error(err)
    });
  }

  handleImageChange(event: any) {
    const selected = event.target.files[0];
    this.room.photo = selected;

    // ✅ generate live base64 preview for UI
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result.split(',')[1];   // keep only base64
    };
    reader.readAsDataURL(selected);
  }

  handleSubmit() {
    this.roomService.updateRoom(this.roomId, this.room).subscribe({
      next: () => {
        this.successMessage = 'Room updated successfully!';
        this.errorMessage = '';
        this.fetchRoom(); // refresh
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error updating room';
        this.successMessage = '';
      }
    });
  }
}
