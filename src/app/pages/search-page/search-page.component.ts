import { Component } from '@angular/core';
import { Post } from '../shared/post-instruments/post.model';
import { NgForm } from '@angular/forms';
import { SearchPageService } from './search-page.service';
import { TimeoutConfig } from 'rxjs';
import { ProfileService } from '../shared/profile-instruments/profile.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  timeout:any = null;
  isError:boolean = false;
  resultText: string = "Почніть вводити ім'я користувача";
  users: any[] = [];
  temp:any;
  
  constructor(private SearchPageService:SearchPageService, private ProfileService:ProfileService, private router:Router) {}
  ngOnInit() {
    if(!this.ProfileService.isAuth) {
      this.router.navigate(['/']);
    }
  }
  onSearch(form: NgForm) {
    this.isError = false;
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.SearchPageService.searchUsers(form.value.searchRequest).subscribe(res => {
        this.isError = false;
        this.resultText = "Знайдені користувачі";
        this.temp = res;
        this.users = this.temp.users;
      }, error => {
        this.users = [];
        this.isError = true;
        this.resultText = error.error.message;
      })
    }, 500)
  }
  
}
