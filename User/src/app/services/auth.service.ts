import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiAuth = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

}
