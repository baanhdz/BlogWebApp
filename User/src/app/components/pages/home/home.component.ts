import { Component, OnInit } from '@angular/core';
import { New } from 'src/app/models/new.model';
import { Tag } from 'src/app/models/tag.model';
import { NewService } from 'src/app/services/new.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dataNews: New[] = [];
  featuredNews: New[] = [];
  tags: Tag[] = [];
  //new theo chủ đề;
  congNgheNews: New[] = [];
  thuThuatNews: New[] = [];
  setupNews: New[] = [];
  generalNews: New[] = [];
  constructor(private newService: NewService, private tagService: TagService) {}

  ngOnInit(): void {
    this.getList();
    this.loadTagNews();
  }

  getList() {
    this.newService.getList().subscribe((res) => {
      this.dataNews = res;
      this.featuredNews = this.getFirstFiveNews(this.dataNews); // Lấy 5 bài viết đầu tiên
    });
  }

  getFirstFiveNews(newsList: New[]): New[] {
    return newsList.slice(0, 5);
  }

  loadTagNews() {
    this.tagService.getAllTag().subscribe((tags: Tag[]) => {
      tags.forEach((tag: Tag) => {
        this.newService.getByTag(tag._id).subscribe((newsList: New[]) => {
          if (tag.tag === 'Công Nghệ') {
            this.congNgheNews = newsList;
            console.log(this.congNgheNews)
          } else if (tag.tag === 'Thủ Thuật') {
            this.thuThuatNews = newsList;
            console.log(this.thuThuatNews)
          } else if (tag.tag === 'Setup PC') {
            this.setupNews = newsList;
          } else if (tag.tag === 'Tin Tức Chung') {
            this.generalNews = newsList;
          } 
          // Tiếp tục phân loại cho các chủ đề tag khác (nếu có)
        });
      });
    });
  }
}
