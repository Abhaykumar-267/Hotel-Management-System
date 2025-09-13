// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-date-slider',
//   standalone: true,
//   imports: [],
//   templateUrl: './date-slider.component.html',
//   styleUrl: './date-slider.component.css'
// })
// export class DateSliderComponent {

// }


import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-slider',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.css'],
  
})
export class DateSliderComponent {

  @Output() dateChange = new EventEmitter<{start: Date | null, end: Date | null}>();

  startDate: Date | null = null;
  endDate: Date | null = null;

  /* Quick shortcuts */
  today() {
    const t = new Date();
    this.setRange(t, t);
  }
  yesterday() {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    this.setRange(y, y);
  }
  thisWeek() {
    const now = new Date();
    const first = now.getDate() - now.getDay();
    const last = first + 6;
    const from = new Date(now.setDate(first));
    const to   = new Date(now.setDate(last));
    this.setRange(from, to);
  }
  lastWeek() {
    const now = new Date();
    const first = now.getDate() - now.getDay() - 7;
    const last = first + 6;
    const from = new Date(now.setDate(first));
    const to   = new Date(now.setDate(last));
    this.setRange(from, to);
  }
  thisMonth() {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    const to   = new Date(now.getFullYear(), now.getMonth()+1, 0);
    this.setRange(from, to);
  }
  lastMonth() {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const to   = new Date(now.getFullYear(), now.getMonth(), 0);
    this.setRange(from, to);
  }
  clear() {
    this.setRange(null, null);
  }

  setRange(start:any, end:any) {
    this.startDate = start;
    this.endDate   = end;
    this.dateChange.emit({ start, end });
  }

  /* Manual calendar input */
  onStartChange(e:string) {
    this.startDate = new Date(e); 
    this.onRangeTriggered();
  }
  onEndChange(e:string) {
    this.endDate = new Date(e);
    this.onRangeTriggered();
  }
  onRangeTriggered(){
    if(this.startDate && this.endDate){
      this.dateChange.emit({start:this.startDate, end:this.endDate});
    }
  }
}
