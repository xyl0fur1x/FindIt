import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {
  private url = this.ConfigService.getApiUrl();

  constructor(private http: HttpClient, private ConfigService:ConfigService) { }
  searchUsers(userName: string) {
    const params = new HttpParams()
      .set('userName', userName);
    return this.http.get(`${this.url}/search`, {params});
  }
}
