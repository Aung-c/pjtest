import { AdminService } from '../Service/Admin.service';import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login-belta.html',
  styleUrls: ['./login-belta.css']
})
export class loginbelta {
  showPassword = false;

  loginData = {
    Email: '',
    Password: '',
    GrantType: 'password'
  };

  errors = {
    Email: '',
    Password: ''
  };

  constructor(
    private router: Router,
    private admin: AdminService
  ) { }

  login(): void {
    this.errors.Email = '';
    this.errors.Password = '';

    if (!this.loginData.Email.trim()) {
      this.errors.Email = 'Email is required';
    }

    if (!this.loginData.Password.trim()) {
      this.errors.Password = 'Password is required';
    }

    if (this.errors.Email || this.errors.Password) {
      return;
    }

    this.admin.login(this.loginData.Email, this.loginData.Password).subscribe({
      next: (res: any) => {
        console.log('LOGIN RESPONSE:', res);

        if (res.StatusCode === '000') {
          const token = res.Result?.AccessToken;

          console.log('token=>',token )

          if (token) {

            this.admin.accessToken = token;

            console.log('Token saved');
            this.router.navigate(['/mor']);

          } else {
            alert('No token received from server');
          }

        } else {
          alert('Login Failed: ' + res.StatusCode + res.Message);
        }
      },
      error: (err: any) => {
        console.error('LOGIN ERROR:', err);
        alert('System Error. Please try again.');
      }
    });
  }

  eye(): void {
    this.showPassword = !this.showPassword;
  }

  resetForm(): void {
    this.loginData = {
      Email: '',
      Password: '',
      GrantType: 'password'
    };
    this.errors = {
      Email: '',
      Password: ''
    };
  }
}