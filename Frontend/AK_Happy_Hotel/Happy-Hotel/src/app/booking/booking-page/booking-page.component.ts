// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-booking-page',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './booking-page.component.html',
// //   styleUrl: './booking-page.component.css'
// // })
// // export class BookingPageComponent {

// // }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CheckoutComponent } from "../checkout/checkout.component";
// import { BookingFormComponent } from "../booking-form/booking-form.component";

// @Component({
//   selector: 'app-booking-page',
//   standalone: true,
//   imports: [[CheckoutComponent, BookingFormComponent]],
//   templateUrl: './booking-page.component.html',
//   styleUrls: ['./booking-page.component.css'],
// })
// export class BookingPageComponent implements OnInit {

//   roomId!: string;
//   summaryData: any = null;
//   summaryPayment: number = 0;

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.roomId = this.route.snapshot.paramMap.get('roomId') as string;
//   }

//   // when form submits, we receive data here
//   onFormSubmit(event: any) {
//     this.summaryData = event.booking;
//     this.summaryPayment = event.payment;
//   }
// }




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../room/services/room-service.service';
import { BookingFormComponent } from "../booking-form/booking-form.component";
import { BookingSummaryComponent } from "../booking-summary/booking-summary.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [CommonModule,BookingFormComponent, BookingSummaryComponent],
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  roomId!: string;
  roomInfo: any = {};
  summaryData: any = null;            // ==> passed to checkout
  summaryPayment: number = 0;         // ==> passed to checkout

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    // get id from URL like /booking-page/:roomId
    this.roomId = this.route.snapshot.paramMap.get('roomId') as string;

    // load room details to show in checkout (left side)
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (data) => {
        this.roomInfo = data;
      },
      error: (err) => {
        console.log("room loading fail", err);
      }
    });
  }

  // Comes from booking-form emit
  onFormSubmit(event: any) {
    this.summaryData = event.booking;        // --> to show in <app-checkout>
    this.summaryPayment = event.payment;     // --> to show in <app-checkout>
  }
  
}

