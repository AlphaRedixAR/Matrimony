import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-swipe', 
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss']
})
export class SwipeComponent implements OnInit {
  profiles: any[] = [];
  currentProfile: number = 0;
  currentProfileIndex = 0;
  isDragging = false;
  startX = 0;
  currentX = 0;
  constructor(private profileService: ProfileService, private snackBar: MatSnackBar,private router: Router) {}

  ngOnInit() {
    this.profileService.getProfiles().subscribe((data) => {
 
      this.profiles = data;
    });
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX; 
  }
  
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.currentX = event.clientX; 
    const distance = this.currentX - this.startX;
  
    if (distance < -100) { 
      this.swipe('left');
      this.isDragging = false; 
    } else if (distance > 100) { 
      this.swipe('right');
      this.isDragging = false;
    }
  }
  
  onMouseUp() {
    this.isDragging = false; 
  }
  
  swipe(direction: string) {
    if (direction === 'left') {
      this.nextProfile(); 
    } else if (direction === 'right') {
      this.previousProfile();
    }
  }
  onViewProfile(profile: any) {
    this.router.navigate(['/profile'], {
      queryParams: { profile: JSON.stringify(profile) }
    });
  }
  nextProfile() {
    if (this.currentProfileIndex < this.profiles.length - 2) {
      this.currentProfileIndex += 1;
    } else {
      this.currentProfileIndex = 0; 
    }
  }
  
  previousProfile() {
    if (this.currentProfileIndex > 1) {
      this.currentProfileIndex -= 1;
    } else {
      this.currentProfileIndex = 0; 
    }
  }
  
  
  // nextProfile() {
  //   if (this.currentProfileIndex < this.profiles.length - 1) {
  //     this.currentProfileIndex++;
  //   } else {
  //     this.currentProfileIndex = 0; 
  //   }
  // }

  // showToast(message: string) {
  //   alert(message); 
  // }
  // showInterested() {
  //   // Show interested toast
  // }

  // showNotInterested() {
  //   // Show not interested toast
  // }
  // onMouseDown(event: MouseEvent) {
  //   this.isDragging = true;
  //   this.startX = event.clientX;
  // }

 

  onMouseLeave() {
    this.isDragging = false; 
  }
  moveToNextProfile() {
    if (this.currentProfile < this.profiles.length - 1) {
      this.currentProfile++;
    } else {
      this.currentProfile = 0; 
    }
  }
}
