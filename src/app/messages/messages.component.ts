import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}
