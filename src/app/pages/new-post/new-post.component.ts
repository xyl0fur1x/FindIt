import { Component, ElementRef, ViewChild } from '@angular/core';
import { PostService } from '../shared/post-instruments/post.service';
import { Router } from '@angular/router';
import { ProfileService } from '../shared/profile-instruments/profile.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  @ViewChild('iframe_box') iframe_box!: ElementRef<HTMLIFrameElement>; 



  ngOnInit(): void {
    if(!this.ProfileService.isAuth) {
      this.router.navigate(['/']);
    } else {
      this.showCurrentLocationMap();
    }
  }
  constructor(private PostService:PostService, private router: Router, private ProfileService:ProfileService) {}



  async getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  } 
  getGoogleMapsIframeUrl(lat: number, lng: number): string {
    return this.PostService.makeUrl(lat, lng);
  }
  async showCurrentLocationMap() {
    try {
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const iframeUrl = this.getGoogleMapsIframeUrl(latitude, longitude);
      this.iframe_box.nativeElement.src = iframeUrl;
      console.log(this.PostService.lat, this.PostService.lng );
    } catch (error) {
      console.error('Error getting location: ', error);
    }
  }

  onSubmit(form: NgForm) {
    this.PostService.sendPost(this.ProfileService.loggedUserData.userId, this.ProfileService.loggedUserData.userName, form.value.header, form.value.description, this.PostService.lat, this.PostService.lng ).subscribe(res => {
      console.log(res);
      this.routeToProfile();
    })
  }


  routeToProfile() {
    this.router.navigate(['/profile', this.ProfileService.loggedUserData.userName]);
  }
}
