import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import { environment } from 'src/environments/environment';
// Import required actions and qualifiers.
import {thumbnail} from '@cloudinary/url-gen/actions/resize';
import {byRadius} from '@cloudinary/url-gen/actions/roundCorners';
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  cld: Cloudinary = new Cloudinary({
    cloud: {
      cloudName: environment.cloudinaryName
    }
  });
  

  constructor(private http: HttpClient) { }


  getImage(_public_id: string, _width: number, _height: number) {
    if(_public_id === 'myCloud.public_id') {
      return this.getDefaultImage(_width, _height);
    } else {
      let img = this.cld.image(_public_id);
      img.resize(thumbnail().width(_width).height(_height).gravity(focusOn(FocusOn.face()))) // Crop the image, focusing on the face.
      .roundCorners(byRadius(20));    // Round the corners.
      return img;
    }
  }


  getDefaultImage(_width: number, _height: number) {
    let img = this.cld.image('stuserve/no-image');
    img.resize(thumbnail().width(_width).height(_height).gravity(focusOn(FocusOn.face()))) // Crop the image, focusing on the face.
    .roundCorners(byRadius(20));    // Round the corners.
    return img;
  }


  postImage(img: File, name: string, folder: string) {
    var formData: FormData = new FormData();
    formData.append('file', img);
    formData.append('upload_preset', 'ciaeeyjy');
    formData.append('public_id', name);
    formData.append('folder', folder);
    formData.append('api_key', '173557259112287');
    return this.http.post('https://api.cloudinary.com/v1_1/dw1a14crt/image/upload', formData);
  }
}
