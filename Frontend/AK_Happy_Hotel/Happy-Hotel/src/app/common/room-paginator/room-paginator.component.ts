// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-room-paginator',
//   standalone: true,
//   imports: [],
//   templateUrl: './room-paginator.component.html',
//   styleUrl: './room-paginator.component.css'
// })
// export class RoomPaginatorComponent {

// }



import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-room-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-paginator.component.html',
  styleUrls: ['./room-paginator.component.css']
})
export class RoomPaginatorComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  windowStart: number = 1;
  windowSize: number = 3;
  pages: (number | string)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage']) {
      if (this.currentPage < this.windowStart) {
        this.windowStart = Math.max(this.currentPage - 1, 1);
      } else if (this.currentPage >= this.windowStart + this.windowSize) {
        this.windowStart = this.currentPage - 1;
      }
      this.generatePages();
    }
  }

  private handleDotClick(direction: 'forward' | 'backward'): void {
    let newStart: number, newPage: number;

    if (direction === 'forward') {
      newStart = Math.min(this.windowStart + this.windowSize, this.totalPages - this.windowSize + 1);
      newPage = newStart;
    } else {
      newStart = Math.max(this.windowStart - this.windowSize, 1);
      newPage = newStart + this.windowSize - 1;
      if (newPage > this.totalPages) newPage = this.totalPages;
    }

    this.windowStart = newStart;
    this.pageChange.emit(newPage);
    this.generatePages();
  }

  private generatePages(): void {
    const pages: (number | string)[] = [];
    const isAtStart = this.windowStart === 1;
    const isAtEnd = this.windowStart + this.windowSize - 1 >= this.totalPages;

    if (!isAtStart) pages.push('...back');

    for (let i = this.windowStart; i < this.windowStart + this.windowSize && i <= this.totalPages; i++) {
      pages.push(i);
    }

    if (!isAtEnd) pages.push('...forward');

    this.pages = pages;
  }

  onClick(page: number | string): void {
    if (page === '...forward') {
      this.handleDotClick('forward');
    } else if (page === '...back') {
      this.handleDotClick('backward');
    } else {
      this.pageChange.emit(page as number);
    }
  }
}
