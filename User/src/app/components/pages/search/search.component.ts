import { NewService } from './../../../services/new.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { New } from 'src/app/models/new.model';
import { PaginationService } from 'ngx-pagination';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],  
  providers: [PaginationService]
})
export class SearchComponent implements OnInit{

  searchTerm:string='';
  searchResults:New[] =[];
  page: number = 1;
  count: number = 0;
  newSize: number = 7;
  newSizes: any = [3, 6, 9, 12];

  constructor(
    private route: ActivatedRoute,
    private newService:NewService
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this.searchTerm = params.term;
      this.getAllNewsBySearchTerm();
    });
  }

  getAllNewsBySearchTerm() {
    this.newService.getAllNewsBySearchTerm(this.searchTerm).subscribe(
      (data: New[]) => {
        this.searchResults = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onNewDataChange(event: any) {
    this.page = event;
    this.getAllNewsBySearchTerm();
  }

  onNewSizeChange(event: any): void {
    this.newSize = event.target.value;
    this.page = 1;
    this.getAllNewsBySearchTerm();
  }
  
}
