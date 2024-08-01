import { Component, Input } from '@angular/core';
import { ProfileService } from '../shared/profile-instruments/profile.service';
import { Profile } from '../shared/profile-instruments/profile.model';
import { Post } from '../shared/post-instruments/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { count } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  error:string | null = null;
  fetchedUserData:any | null = null;
  temp:any | null = null;
  isSubable: boolean = false;
  isSubscribed: boolean = false;
  btnText:string = "Підписатися";


  userId : number = 0;
  userName : string = '';
  userPhotoUrl : string = '';
  userDescription : string = '';
  userPostsAmount : number = 0;
  userPosts : Post[] = []; 
  userSubscribersAmount : number = 0;
  userSubscriptionsAmount : number = 0;

  
  constructor(private ProfileService: ProfileService, private route:ActivatedRoute, private router:Router) {}

  onLoadUser(userName: string) {
    this.error = null;
    this.userPosts = [];
    this.userPostsAmount = 0;
    this.isSubable = false;
    this.isSubscribed = false;

    this.ProfileService.getUser(userName).subscribe(res => {
      this.fetchedUserData = res;
      this.fetchedUserData = this.fetchedUserData.result;
      this.userId = this.fetchedUserData.userId;
      this.userName = this.fetchedUserData.userName;
      this.userPhotoUrl = this.fetchedUserData.userPhotoUrl;
      this.userDescription = this.fetchedUserData.userDescription;
      console.log(this.fetchedUserData)

      if(this.ProfileService.loggedUserData) { // КОРИСТУВАЧ АВТОРИЗОВАНИЙ?
        if(this.userName === this.ProfileService.loggedUserData.userName) { // ВАША СТОРІНКА
          this.loadSubs(this.ProfileService.loggedUserData.userId, this.userId); // ФЕТЧ ПІДПИСКИ
          this.isSubable = false;
          this.isSubscribed = false;
        } else { // НЕ ВАША СТОРІНКА
          this.isSubable = true;
          this.ProfileService.subscriptions(this.ProfileService.loggedUserData.userId, this.userId, 0).subscribe(res => { // ВИ ПІДПИСАНІ?
            this.isSubscribed = true;
            this.btnText = "Ви підписані";
          }, error => {
            this.isSubscribed = false;
            this.btnText = "Підписатися";
          })
          this.loadSubs(this.ProfileService.loggedUserData.userId, this.userId); // ФЕТЧ ПІДПИСКИ
        }
      } else { // КОРИСТУВАЧ НЕ АВТОРИЗОВАНИЙ
        this.loadSubs(this.userId, this.userId);
      }
      

      this.ProfileService.fetchPosts(this.fetchedUserData.userId).subscribe(res => {
        this.temp = res;
        this.temp = this.temp.posts;
        for (let index = this.temp.length-1; index >= 0; index--) {
          this.userPosts.push(new Post(this.temp[index].postId, this.userName, this.temp[index].header, this.temp[index].description, this.temp[index].lat, this.temp[index].lng) )
          this.userPostsAmount+=1;

        }
      }, error => {
        this.error = error.error.message;
      })

    }, error => {
      this.error = error.error.message;
    })
  }
  loadSubs(firstUserId: number, secondUserId: number) {
    this.ProfileService.subscriptions(firstUserId, secondUserId, 1).subscribe(res => { // ФЕТЧ ПІДПИСКИ
      this.temp = res;
      this.temp = this.temp.subscriptions;
      this.userSubscriptionsAmount = this.temp.length;
    }, error => {
      this.userSubscriptionsAmount = 0;
    })
    this.ProfileService.subscriptions(firstUserId, secondUserId, 2).subscribe(res => { // ФЕТЧ ПІДПИСНИКИ
      this.temp = res;
      this.temp = this.temp.subscribers;
      this.userSubscribersAmount = this.temp.length;
    }, error => {
      this.userSubscribersAmount = 0;
    })
  }
  subscribeTo() {
    this.ProfileService.subscribeTo(this.ProfileService.loggedUserData.userId, this.userId).subscribe(res=> {
      this.isSubscribed = true;
      this.btnText = "Ви підписані";
      this.loadSubs(this.ProfileService.loggedUserData.userId, this.userId);
    }, error => {
      console.log(error.error.message);
    })
  }


  ngOnInit() {
    if(!this.ProfileService.isAuth) {
      this.router.navigate(['/']);
    } else {
      this.route.params.subscribe(params => {
      this.userName = params['userName'];
      this.onLoadUser(this.userName);
    });
    }
  }
}
