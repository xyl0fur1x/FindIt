import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrl: './profile-preview.component.scss'
})
export class ProfilePreviewComponent {

  @Input() userId : number = 0;
  @Input() userName : string = '';
  @Input() userPhotoUrl : string = '';
  @Input() userDescription : string = '';

  constructor(private router:Router) {}

  goToProfile(userName:string) {
    this.router.navigate(['/profile', userName]);
  }
}
