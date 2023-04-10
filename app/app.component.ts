import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientCA2';
  isAuthenticated$ = this.auth.isAuthenticated$
  authService: any;
  isShow?: boolean=false;

  star = [ 1, 2,3,4,5];
    albumForm: any;

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService){}

  ngOnInit(): void {
      
  }

  handleLogout() {
    this.authService.logout()
  }
  
  handleLogin() {
    this.authService.loginWithRedirect({appState: { target: '/profile',}})

  }
  handleSignUp() {
    this.authService.loginWithRedirect({screen_hint:"signup"})
   
  }

 

login(){
  this.auth.loginWithRedirect(); 
}

}
