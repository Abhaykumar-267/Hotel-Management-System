import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: any;
  firstName: any;
  lastName: any;
  email: any;
  password: any;

  constructor(private authService: AuthService) {}

      handleSubmit(event: Event) {
    event.preventDefault();

  const form = event.target as HTMLFormElement;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const userData = {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
  };


  // this.authService.registerUser(userData).subscribe({
  //   next: (res) => { alert((res as any).message || '✅ Registration successful!');
  //   this.firstName = ''; 
  //   this.lastName = ''; 
  //   this.email = ''; 
  //   this.password = ''; 
  //   form.reset(); // 💡 Clean form 
  //   }, 
  //   error: (err) => { console.error(err); alert(err?.error?.message || '❌ Registration failed!'); } });

    this.authService.registerUser(userData).subscribe({
      next: (res: any) => {   // 👈 type add kiya
        alert(res?.message || '✅ Registration successful!');
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        form.reset(); // 💡 Clean form
      },
      error: (err: any) => {   // 👈 type add kiya
        console.error(err);
        alert(err?.error?.message || '❌ Registration failed!');
      }
    });
    
  }
}
