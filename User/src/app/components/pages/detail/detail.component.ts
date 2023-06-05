import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { New } from 'src/app/models/new.model';
import { NewService } from './../../../services/new.service';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  detailNew = new New;
  comments: Comment[] = [];
  newComment: Comment = new Comment();
  // newComment = new Comment; 
  

  constructor(
    private newService:NewService,
    private commentService:CommentService,
    private activatedRouter:ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
      this.getById(this.activatedRouter.snapshot.params['id']);
      this.getComments(this.activatedRouter.snapshot.params['id']);
  }

  getById(id:string){
    this.newService.getById(id).subscribe((res:any)=>{
      this.detailNew = res;
    });    
  }

  //danh sách comment của bài viết
  getComments(postId: string) {
    this.commentService.getCommentsByNewId(postId).subscribe((res: Comment[]) => {
      this.comments = res;
    });
  }

  addComment() {
    this.newComment.newId = this.detailNew._id;
    this.commentService.addComment(this.newComment).subscribe((res: Comment) => {
      this.comments.push(res);
      this.newComment = new Comment();
    });
  }

}
