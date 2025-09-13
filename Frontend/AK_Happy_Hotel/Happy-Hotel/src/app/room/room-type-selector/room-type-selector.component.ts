import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-type-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-type-selector.component.html',
  styleUrls: ['./room-type-selector.component.css']
})
export class RoomTypeSelectorComponent implements OnInit {
  @Input() roomType: string = '';
  @Output() roomTypeChange = new EventEmitter<string>();

  roomTypes: string[] = ['All types'];  // "All types" as default shown
  newRoom: string = '';
  showNewRoomTypeInput: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getRoomTypes();
  }

  getRoomTypes(): void {
    this.http.get<string[]>('http://localhost:8081/rooms/room/types').subscribe({
      next: (data) => {
        const filtered = data.filter(type => type.trim() !== '');
        this.roomTypes = ['All types', ...filtered, 'Add New'];
      },
      error: (err) => console.error('Error fetching room types', err)
    });
  }

  onSelectChange(value: string) {
    if (value === 'Add New') {
      this.showNewRoomTypeInput = true;
    } else {
      this.showNewRoomTypeInput = false;
      this.roomTypeChange.emit(value);
    }
  }

  addNewRoomType(): void {
    const trimmed = this.newRoom.trim();
    if (trimmed !== '') {
      this.roomTypes.splice(this.roomTypes.length - 1, 0, trimmed); // insert before "Add New"
      this.roomType = trimmed;
      this.roomTypeChange.emit(trimmed);
      this.newRoom= '';
      this.showNewRoomTypeInput = false;
    }
  }
  
}
