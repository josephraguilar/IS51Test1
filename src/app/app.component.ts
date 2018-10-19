import { Component, OnInit } from '@angular/core';
import { FlexModalService } from './shared-components/flex-modal/flex-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'final';
  aboutText: string;



  constructor(private flexModal: FlexModalService) { 
     
  }

  ngOnInit() {
  }
  openAboutModal(){
    this.aboutText = "This application is designed by Joseph Aguilar. (C) 2018"
    this.flexModal.openDialog('about-modal');
  }
  // Launch flex modal or alert (3pts reduced) showing about text

}
