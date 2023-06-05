import { Component,OnInit } from '@angular/core';
import AOS from "aos";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  ngOnInit(): void {
    AOS.init();
  }

}