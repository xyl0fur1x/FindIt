import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './pages/feed/feed.component';
import { PostMainComponent } from './pages/shared/post-main/post-main.component';
import { PostPreviewComponent } from './pages/shared/post-preview/post-preview.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfilePreviewComponent } from './pages/shared/profile-preview/profile-preview.component';



const appRoutes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'search', component: SearchPageComponent},
  {path: 'new-post', component: NewPostComponent},
  {path: 'profile/:userName', component: ProfileComponent},

]


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PostMainComponent,
    PostPreviewComponent,
    NavbarComponent,
    SearchPageComponent,
    ProfileComponent,
    NewPostComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    ProfilePreviewComponent,
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
