

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  standalone: true,
  imports: [RouterLink],
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/'], {
      state: { message: 'You have been logged out!' },
    });
  }
}
