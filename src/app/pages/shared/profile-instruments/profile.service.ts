import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient, private router: Router, private ConfigService:ConfigService) { }
  private url = this.ConfigService.getApiUrl();
  isAuth: boolean = false;
  loggedUserData:any | null = null; 

  onSetLogged(userData: any, isAuth: boolean) {
    if(isAuth) {
      this.isAuth = isAuth;
        this.getUser(userData.result.userName).subscribe(res => {
        this.loggedUserData = res;
        this.loggedUserData = this.loggedUserData.result;
        this.router.navigate(['/feed']);
      })
    } else {
      this.isAuth = false;
      throw Error("Не авторизовано");
    }
  }


  getUser(userName: string) {
    return this.http.get(`${this.url}/profile/${userName}`)
  }


  fetchPosts(userId: number) {
    const params = new HttpParams()
      .set('userId', userId);
    return this.http.get(`${this.url}/posts/${userId}`, {params});
  }


  subscriptions(userId: number, clickedUserId: number, code: number) { //code: 0-провірка підписки   1-підписки    2-підписники
    const params = new HttpParams()
      .set('userId', userId)
      .set('clickedUserId', clickedUserId)
      .set('code', code);
    return this.http.get(`${this.url}/subscribers`, {params});
  }
  subscribeTo(userId: number, clickedUserId: number) {
    return this.http.post(`${this.url}/subscribeTo`, {userId, clickedUserId});
  }
}
