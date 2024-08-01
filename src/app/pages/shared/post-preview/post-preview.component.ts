import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PostService } from '../post-instruments/post.service';
@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss'
})
export class PostPreviewComponent {

  @Input() postId:string = '';
  @Input() userName:string = '';
  @Input() header:string = '';
  @Input() description:string = '';
  @Input() lat: number = 0;
  @Input() lng: number = 0;
  
  @ViewChild("iframe_box") iframe_box !: ElementRef<HTMLIFrameElement>;
  constructor(private PostService: PostService) {}
  ngOnInit() {
     setTimeout(()=> this.setMapPos(this.lat, this.lng));
  }
  
  setMapPos(lat:number, lng: number) {
    try {
      this.iframe_box.nativeElement.src = this.PostService.makeUrl(lat, lng);
    } catch (error) {
      console.error("OPAAAAAAA?:::", error);
    }
  }
}
