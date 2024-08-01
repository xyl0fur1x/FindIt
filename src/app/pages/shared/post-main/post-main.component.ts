import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PostService } from '../post-instruments/post.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-post-main',
  templateUrl: './post-main.component.html',
  styleUrl: './post-main.component.scss'
})
export class PostMainComponent {
  @Input() postId:number = 0;
  @Input() userName:string = '';
  @Input() header:string = '';
  @Input() description:string = '';
  @Input() lat: number = 0;
  @Input() lng: number = 0;
  
  @ViewChild("iframe_box") iframe_box !: ElementRef<HTMLIFrameElement>;
  constructor(private PostService: PostService, private router: Router) {}
  ngOnInit() {
     setTimeout(()=> this.setMapPos(this.lat, this.lng));
  }
  
  setMapPos(lat:number, lng: number) {
    try {
      this.iframe_box.nativeElement.src = this.PostService.makeUrl(lat, lng);
    } catch (error) {
      console.error("OPAAAAAAAAA?:::", error);
    }
  }


  goToProfile(userName:string) {
    this.router.navigate(['/profile', userName]);
  }
  

}
