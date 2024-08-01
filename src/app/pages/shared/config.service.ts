import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url = 'http://localhost:3000';
  private apiKey: string ='AIzaSyBAZEgW4M-GGDc97DzRN3cc_y6M02sSaPo';
  constructor() { }
  getApiUrl() {
    return this.url;
  }
  getApiKey() {
    return this.apiKey;
  }
}
