// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-room-card',
//   standalone: true,
//   imports: [],
//   templateUrl: './room-card.component.html',
//   styleUrl: './room-card.component.css'
// })
// export class RoomCardComponent {

// }


import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent {
  @Input() room: any;
}
