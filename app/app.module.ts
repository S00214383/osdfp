import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { albumComponent } from './album/album.component';
import { albumListComponent } from './album/album-list/album-list.component';
import { albumRowComponent } from './album/album-row/album-row.component';
import { albumDetailsComponent } from './album/album-details/album-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { albumFormComponent } from './album/album-form/album-form.component';
import { HttpClientModule } from  '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';


import { environment } from 'src/environments/environment';
import {AuthHttpInterceptor } from '@auth0/auth0-angular';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StarRatingModule } from 'angular-star-rating';

import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';


import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";

defineComponents(IgcRatingComponent);

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent, 
    
    albumComponent, 
    albumRowComponent, 
    albumDetailsComponent,
    albumListComponent,
    albumFormComponent,
   
  ],
  imports: [
    [SweetAlert2Module.forRoot()],
    [SweetAlert2Module],
    [SweetAlert2Module.forChild({ /* options */ })],
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
   
    HttpClientModule,
    AuthModule.forRoot({...environment.auth0,
      httpInterceptor: {
        allowedList: [`${environment.apiUri}/album`],
      },}),
    BrowserAnimationsModule,

    StarRatingModule.forRoot(),
    
    environment.production
    ? []
    : AkitaNgDevtools.forRoot({
        maxAge: 25,
      }),

  ],

  
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  },]
,
  bootstrap: [AppComponent]


    
})
export class AppModule { }
