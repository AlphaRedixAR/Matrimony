import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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

  onSwipeRight() {
    this.snackBar.open('Interested', '', { duration: 2000 });
    this.moveToNextProfile();
  }

  onSwipeLeft() {
    this.snackBar.open('Not Interested', '', { duration: 2000 });
    this.moveToNextProfile();
  }
  onViewProfile(profile: any) {
    this.router.navigate(['/profile'], {
      queryParams: { profile: JSON.stringify(profile) }
    });
  }
  getProfiles() {
    this.profileService.getProfiles().subscribe(
      (data: any) => {
        this.profiles = data; 
      },
      (error) => {
        console.error('Error fetching profiles:', error); 
      }
    );
  }
  swipe(direction: string) {
    if (direction === 'right') {
      this.showToast('Interested');
    }
    else if(direction ==='shortlist')
      {
        this.showToast('Shortlisted');
      } else {
      this.showToast('Not Interested');
    }
    this.nextProfile();
  }

  nextProfile() {
    if (this.currentProfileIndex < this.profiles.length - 1) {
      this.currentProfileIndex++;
    } else {
      this.currentProfileIndex = 0; 
    }
  }

  showToast(message: string) {
    alert(message); 
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.currentX = event.clientX;

    const distance = this.currentX - this.startX;
    if (distance > 50) { 
      this.swipe('right');
      this.isDragging = false;
    } else if (distance < -50) { 
      this.swipe('left');
      this.isDragging = false;
    }
  }
  goBack() {
    this.router.navigate(['/swipe']); 
}
  onMouseUp() {
    this.isDragging = false; 
  }

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
