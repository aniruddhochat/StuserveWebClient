import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.css']
})
export class GoogleSignInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   $("#name").text(profile.getName());
  //   $(".data").css("display", "block");
  //   $(".g-signin2").css("display", "none");
  // } 

  // signOut(){
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function(){

  //   });
  // }
}
