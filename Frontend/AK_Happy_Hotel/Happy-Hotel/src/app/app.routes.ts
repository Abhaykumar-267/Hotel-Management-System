import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { RoomFilterComponent } from './common/room-filter/room-filter.component';
import { RoomCarouselComponent } from './common/room-carousel/room-carousel.component';
import { HomeComponent } from './layout/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { BookingFormComponent } from './booking/booking-form/booking-form.component';
// import { CheckoutComponent } from './booking/checkout/checkout.component';
import { BookingSuccessComponent } from './booking/booking-success/booking-success.component';
import { ExistingRoomsComponent } from './room/existing-rooms/existing-rooms.component';
import { AddRoomComponent } from './room/add-room/add-room.component';
import { EditRoomComponent } from './room/edit-room/edit-room.component';
import { BookingsComponent } from './booking/bookings/bookings.component';
import { FindBookingComponent } from './booking/find-booking/find-booking.component';
import { BookingPageComponent } from './booking/booking-page/booking-page.component';
import { ProfileComponent } from './layout/profile/profile.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path:'login', component: LoginComponent},
    { path:'register', component: RegisterComponent },
    { path:'find-booking', component: RoomFilterComponent },
    { path:'browse-all-rooms', component:RoomCarouselComponent },
    { path:'admin', component: AdminComponent },
    // { path: 'booking/:roomId', component: BookingFormComponent },
    { path: 'booking-page/:roomId', component: BookingPageComponent },
    // { path:'check-out', component:CheckoutComponent },
    { path: 'booking-success', component: BookingSuccessComponent },
    { path: 'existing-rooms', component: ExistingRoomsComponent },
    { path: 'add-room', component: AddRoomComponent },
    { path: 'edit-room/:id', component:EditRoomComponent },
    { path: 'existing-bookings', component:BookingsComponent },
    { path: 'booking-data', component:FindBookingComponent },
    { path: 'profile', component:ProfileComponent}

];
