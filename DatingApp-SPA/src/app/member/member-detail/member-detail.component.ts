import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery-9';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  user!: User;
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }
  ];
  galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) {
                this.galleryImages = this.getImages();

               }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      this.galleryImages = this.getImages();
    });
  }
  getImages(){
    const imageUrls = [];
      // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.user?.photos.length; i++) {
        imageUrls.push({
          small: this.user?.photos[i]?.url,
          medium: this.user?.photos[i]?.url,
          big: this.user?.photos[i]?.url,
          description: this.user?.photos[i]?.description
        });
      }
    return imageUrls;
  }
}
