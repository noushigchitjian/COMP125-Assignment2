import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    dateCreated: new FormControl(new Date),
    contact: new FormControl(null, Validators.required)
  });
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister()
  {
    if(this.registerForm.invalid)
    {
      return;
    }
    this.authService.createUser(this.registerForm.getRawValue());
  }
}
