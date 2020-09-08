import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-persontest',
  templateUrl: './persontest.component.html',
  styleUrls: ['./persontest.component.css']
})
export class PersontestComponent implements OnInit {

  displayModal: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  showModalDialog() {
    this.displayModal = true
  }

}
