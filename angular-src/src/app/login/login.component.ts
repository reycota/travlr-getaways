import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = { name: '', email: '', password: '' };
  formError = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onLoginSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required';
      return;
    }

    const user: User = {
      name: this.credentials.name,
      email: this.credentials.email
    };

    this.authService.login(user, this.credentials.password)
      .subscribe({
        next: (resp) => {
          this.authService.saveToken(resp.token);
          this.router.navigate(['']);
        },
        error: () => {
          this.formError = 'Login failed';
        }
      });
  }
}
