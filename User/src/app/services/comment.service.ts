import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiComment ='';

  constructor(private httpClient: HttpClient) { }
  getCommentsByNewId(newId: string): Observable<Comment[]> {
    const url = `${this.apiComment}/comments?postId=${newId}`;
    return this.httpClient.get<Comment[]>(url);
  }

  addComment(comment: Comment): Observable<Comment> {
    const url = `${this.apiComment}/comments`;
    return this.httpClient.post<Comment>(url, comment);
  }

  deleteComment(commentId: string): Observable<void> {
    const url = `${this.apiComment}/comments/${commentId}`;
    return this.httpClient.delete<void>(url);
  }
}
