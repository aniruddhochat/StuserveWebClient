import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumer-home',
  templateUrl: './consumer-home.component.html',
  styleUrls: ['./consumer-home.component.css']
})
export class ConsumerHomeComponent implements OnInit {

  sideNavOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
