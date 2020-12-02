import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({providedIn:"root"})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}


  createUser(registerForm: any){
    this.http.post<{message: string}>('http://localhost:4000/users/register', registerForm).subscribe((response) => {
      console.log(response);
      if(response.message !== "Username Already Exist!")
      {
        this.router.navigate(['/login']);
      }
    });
  }
  login(loginForm: any){
    this.http.post<{message: string, token: string, username: string}>('http://localhost:4000/users/login', loginForm).subscribe(response => {
      this.token = response.token;
      console.log(response.message);
      this.isAuthenticated = true;
      if(response.token)
      {
        this.saveAuthData(this.token, response.username);
      this.authStatusListener.next(true);
      }
      this.router.navigate(['/surveys']);
    });
  }
  getisAuthenticated()
  {
    return this.isAuthenticated;
  }
  getToken()
  {
    return this.token;
  }
  getAuthStatusListener()
  {
    return this.authStatusListener.asObservable();
  }
  logout()
  {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
  }
  saveAuthData(token: string, username: string)
  {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("isAuthenticated", "true");
  }
  clearAuthData()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isAuthenticated");
  }
  getAuthdata()
  {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if(!token || !username)
    {
      return {
        token: null,
        username: null,
        isAuthenticated: false
      };
    }
    return {
      token: token,
      username: username,
      isAuthenticated: true
    };
  }
}
