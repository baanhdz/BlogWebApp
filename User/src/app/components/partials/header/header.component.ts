import { ActivatedRoute, Router } from '@angular/router';
import { NewService } from '../../../services/new.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { New } from 'src/app/models/new.model';
import { FormsModule } from '@angular/forms';

declare const NavbarJs: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  dataNews: New[] = [];
  searchTerm:string = '';
  constructor(
    // private newService: NewService,
    // private activatedRoute: ActivatedRoute,
    private router:Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadNavbarScript();
  }

  loadNavbarScript() {
    const script = this.renderer.createElement('script');
    script.src = '../../../../assets/js/navbar.js';
    script.type = 'text/javascript';
    this.renderer.appendChild(document.body, script);
  }
  
  onSearchEnter() {
    if (this.searchTerm) {
      this.router.navigate(['/search/'], { queryParams: { term: this.searchTerm } });
    }
  }

}
