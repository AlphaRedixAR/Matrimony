import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SwipeComponent } from './swipe/swipe.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  
  declarations: [
    AppComponent,
    SwipeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,HttpClientModule,MatCardModule,MatIconModule  ,    MatSnackBarModule         
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
