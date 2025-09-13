// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { AuthService } from '../service/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent {
//   email = '';
//   password = '';
//   errorMessage: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   onLoginSubmit(): void {
//     const credentials = { email: this.email, password: this.password };

//     this.authService.loginUser(credentials).subscribe(
//       (response) => {
//         console.log('Login response:', response); // 👈 ye add karo
        
//         const role = response.roles[0]; // take first role
//         const name = response.name || response.username || response.email; // 👈 yahan fallback
        
//         this.authService.handleLogin(response.token, role, name);

//         this.router.navigate(['/']);
//       },
//       (error) => {
//         this.errorMessage = 'Invalid credentials. Please try again.';
//       }
//     );
//   }
// }



import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLoginSubmit(): void {
    const credentials = { email: this.email, password: this.password };

    this.authService.loginUser(credentials).subscribe(
      (response) => {
        console.log('Login response:', response); // 👈 debug ke liye

        const role = response.roles?.[0] || response.role; // role fallback
        const name = response.name || response.username || response.email; // name fallback
        const userId = response.id || response.userId; // 👈 yahan id bhi le rahe hai

        // ✅ Ab id bhi pass karenge handleLogin me
        this.authService.handleLogin(response.token, role, name, userId);

        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }
}
