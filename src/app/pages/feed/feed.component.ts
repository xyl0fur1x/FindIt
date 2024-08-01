import { Component } from '@angular/core';
import { Post } from '../shared/post-instruments/post.model';
import { ProfileService } from '../shared/profile-instruments/profile.service';
import { Router } from '@angular/router';
import { FeedService } from './feed.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  temp:any;
  posts: Post[] = [];
  errMsg:string = '';

  constructor(private ProfileService:ProfileService, private router:Router, private FeedService:FeedService) {}
  ngOnInit() {
    this.errMsg = '';
    if(!this.ProfileService.isAuth) {
      this.router.navigate(['/']);
    } else {
      this.loadPosts()
    }
  }

  loadPosts() {
    this.FeedService.getSubscriptions(this.ProfileService.loggedUserData.userId, this.ProfileService.loggedUserData.userId, 1).subscribe(res => {
      this.errMsg = '';
      this.temp = res;
      this.temp = this.temp.subscriptions;
      this.FeedService.getPosts(this.temp).subscribe(result => {
        this.errMsg = '';
        this.temp = result;
        console.log(result)
        this.temp = this.temp.posts;
        for (let index = this.temp.length-1; index >= 0; index--) {
          this.posts.push(new Post(this.temp[index].postId, this.temp[index].userName, this.temp[index].header, this.temp[index].description, this.temp[index].lat, this.temp[index].lng) )
        }
        // this.posts = this.temp;
      }, error => {
        this.errMsg = error.error.message;
      })
    }, error => {
      this.errMsg = error.error.message;

    })
  }
}
