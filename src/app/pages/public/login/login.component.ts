import { Component } from '@angular/core';
import { authUser } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginUser: authUser = {
    email: '',
    password: ''
  }
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
  }

  login(loginUser: authUser) {
    this.authService.login(loginUser.email, loginUser.password)
  }
}
