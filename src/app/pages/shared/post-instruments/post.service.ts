import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = this.ConfigService.getApiUrl();
  private apiKey: string = this.ConfigService.getApiKey();
  lat:number=0;
  lng:number=0;

  constructor(private http:HttpClient, private ConfigService:ConfigService) { }
  
  makeUrl(lat:number, lng: number) {
    this.lat=lat;
    this.lng=lng;
    return `https://www.google.com/maps/embed/v1/place?q=
    ${lat},${lng}
    &zoom=18&key=
    ${this.apiKey}`;
  }
  
  sendPost(userId:number, userName:string, header: string, description: string, lat: number, lng: number) {
    return this.http.post(`${this.url}/new-post`, { userId, userName, header, description, lat, lng })
  }
  
}
