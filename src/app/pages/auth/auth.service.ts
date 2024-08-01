import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from '../shared/profile-instruments/profile.service';
import { NavbarService } from '../shared/navbar/navbar.service';
import { Router } from '@angular/router';
import { ConfigService } from '../shared/config.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = this.ConfigService.getApiUrl();
  constructor(private http: HttpClient, private ProfileService: ProfileService, private NavbarService:NavbarService, private router:Router, private ConfigService:ConfigService) { }
  isAuth: boolean = false;
  

  login(userName: string, password: string) {
    const params = new HttpParams()
      .set('username', userName)
      .set('password', password);
      return this.http.get(`${this.url}/login`, { params })
  }

  register(userName: string, password: string) {
    return this.http.post(`${this.url}/register`, { userName, password })
  }
  

  onSuccess(userData:any) {
    this.isAuth = true;
    this.ProfileService.onSetLogged(userData, this.isAuth);
    this.NavbarService.setRoute(userData, this.isAuth);

  }
}
