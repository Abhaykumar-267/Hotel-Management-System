import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RoomCardComponent } from '../room-card/room-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-search-results',
  standalone: true,
  imports: [RoomCardComponent, CommonModule],
  templateUrl: './room-search-results.component.html',
  styleUrls: ['./room-search-results.component.css']
})
export class RoomSearchResultsComponent {
  @Input() results: any[] = []; // ✅ Initialize to avoid "possibly undefined"
  @Output() clear = new EventEmitter<void>();
  filteredRooms: any[] = [];

  currentPage: number = 1;
  resultsPerPage: number = 3;

  get totalPages(): number {
    return Math.ceil(this.results.length / this.resultsPerPage);
  }

  get paginatedResults(): any[] {
    const start = (this.currentPage - 1) * this.resultsPerPage;
    return this.results.slice(start, start + this.resultsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  clearSearch(): void {
    this.clear.emit();
  }
  setFilteredRooms(filtered: any[]) {
  this.filteredRooms = filtered;
}
}
