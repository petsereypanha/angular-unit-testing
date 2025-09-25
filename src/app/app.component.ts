import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MessagesComponent} from './messages/messages.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    MessagesComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
