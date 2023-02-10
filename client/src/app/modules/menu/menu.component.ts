import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  user!: User | null;

  constructor(private router: Router, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
  }

  loginRedirect() {
    this.router.navigate(['/login'])
  }

  signOut(){
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
