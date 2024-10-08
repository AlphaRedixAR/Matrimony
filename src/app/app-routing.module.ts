import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwipeComponent } from './swipe/swipe.component';
import { ProfileComponent } from './profile/profile.component';  

const routes: Routes = [
  { path: '', redirectTo: '/swipe', pathMatch: 'full' },  
  { path: 'swipe', component: SwipeComponent },            
  { path: 'profile', component: ProfileComponent },       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
