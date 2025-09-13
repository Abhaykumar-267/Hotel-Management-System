import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWifi, faUtensils, faTshirt, faCocktail, faParking, faSnowflake, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hotel-service',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './hotel-service.component.html',
  styleUrls: ['./hotel-service.component.css'],
})
export class HotelServiceComponent {
  faClock = faClock;
  services = [
    {
      icon: faWifi,
      title: 'WiFi',
      description: 'Stay connected with high-speed internet access.',
    },
    {
      icon: faUtensils,
      title: 'Breakfast',
      description: 'Start your day with a delicious breakfast buffet.',
    },
    {
      icon: faTshirt,
      title: 'Laundry',
      description: 'Keep your clothes clean and fresh with our laundry service.',
    },
    {
      icon: faCocktail,
      title: 'Mini-bar',
      description: 'Enjoy a refreshing drink or snack from our in-room mini-bar.',
    },
    {
      icon: faParking,
      title: 'Parking',
      description: 'Park your car conveniently in our on-site parking lot.',
    },
    {
      icon: faSnowflake,
      title: 'Air conditioning',
      description: 'Stay cool and comfortable with our air conditioning system.',
    },
    
  ];

  currentYear: number = new Date().getFullYear();
}
