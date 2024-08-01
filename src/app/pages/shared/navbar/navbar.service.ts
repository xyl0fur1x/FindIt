import { Injectable } from '@angular/core';
import { ProfileService } from '../profile-instruments/profile.service';
@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private isAuth:boolean = false;
  loggedUserData: any | null = null;
  loggedUserName:string = '';
  constructor(private ProfileService:ProfileService) { }

  setRoute(userData:any, isAuth:boolean) {
    if(isAuth) {
      this.isAuth = isAuth;
      this.ProfileService.getUser(userData.result.userName).subscribe(res => {
        this.loggedUserData = res;
        this.loggedUserName = this.loggedUserData.result.userName;
      })
    }
  }
  getStatus() {
    return this.isAuth;
  }
  getRoute() {
    return this.loggedUserName;
  }
}
