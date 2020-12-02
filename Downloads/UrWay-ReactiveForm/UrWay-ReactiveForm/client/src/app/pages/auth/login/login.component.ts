import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm = new FormGroup({
  username: new FormControl(null, Validators.required),
  password: new FormControl(null, Validators.required)
});

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  onLogin()
    {
      if(this.loginForm.valid){
        this.authService.login(this.loginForm.getRawValue());
      }
    }
}

