import { Tag } from './../../../models/tag.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from 'ngx-pagination';
import { New } from 'src/app/models/new.model';
import { NewService } from 'src/app/services/new.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css'],
  providers: [PaginationService]
})
export class ListAllComponent implements OnInit {
  tagId:string ='';
  tag:Tag[]=[]
  newsByTag: New[]=[];
  page: number = 1;
  count: number = 0;
  newSize: number = 7;
  newSizes: any = [3, 6, 9, 12];

  constructor(
    private newService: NewService,
    private tagService: TagService,
    private activatedRoute: ActivatedRoute
    ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.tagId = params['id'];
      this.getNewsByTagId(this.tagId);
      this.getAllTag();
    });
  }

  getAllTag():void{
    this.tagService.getAllTag().subscribe((res) => {
      this.tag = res; 
    });
  }

  getNewsByTagId(tagId: string): void {
    this.newService.getByTag(tagId).subscribe(news => {
      this.newsByTag = news;
    });
  }
  onNewDataChange(event: any) {
    this.page = event;
    this.getNewsByTagId(this.tagId);
  }
  
  onNewSizeChange(event: any): void {
    this.newSize = event.target.value;
    this.page = 1;
    this.getNewsByTagId(this.tagId);
  }
}
