import { Injectable } from '@angular/core';
import { ProfileService } from '../shared/profile-instruments/profile.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  temp: any;
  private url = this.ConfigService.getApiUrl();
  constructor(private ProfileService:ProfileService, private http: HttpClient, private ConfigService:ConfigService) { }

  getSubscriptions(firstUserId: number, secondUserId: number, code:number) {
    return this.ProfileService.subscriptions(firstUserId, secondUserId, code);
  }
  getPosts(subscriptions: any) {
    return this.http.post(`${this.url}/getPosts`, {subscriptions});
  }
}
