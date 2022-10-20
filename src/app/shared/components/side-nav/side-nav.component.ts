import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  sideNavOpened: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigateHome() {
    this.router.navigate(['main-view'], {relativeTo: this.route});
  }

  navigateForYou() {
    this.router.navigate(['consumer-foryou'], {relativeTo: this.route});
  }
}
