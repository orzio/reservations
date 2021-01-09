import { Component, OnInit, Input } from '@angular/core';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { Photo } from '../_models/Photo';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../_services/room.service';
import { Room } from '../_models/room';
@Component({
  selector: 'app-photo-galerry',
  templateUrl: './photo-galerry.component.html',
  styleUrls: ['./photo-galerry.component.css']
})
export class PhotoGalerryComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route:ActivatedRoute, private roomService: RoomService) { }

  ngOnInit(): void {
    this.initOptions();
    const _this = this;
    this.roomService.photoRoomChanged.subscribe((room:Room)=>{
      //console.log("zmienione zdjecie");
      _this.galleryImages = _this.fillWithPhotos(room.photos);
    })
    
  }

  initOptions(){
    this.galleryOptions = [
      {
        breakpoint: 800,
          width: '550px',
          height: '500px',
          imagePercent:40,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview:false,
          imageArrows:true,
          thumbnailsArrows: true,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      }
    ];

  }
  
  fillWithPhotos(photos:Photo[]){
    const photosUrls = [];
    for (const photo of photos) {
      photosUrls.push({
        small:photo.photoUrl,
        medium: photo.photoUrl,
        big: photo.photoUrl,
      });
    }

    //console.log(photosUrls.length)
    return photosUrls;
  }

}
