import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable()
export class logoutAuth implements CanActivate {
  constructor(private tokenService: TokenStorageService, private router: Router) {}

  canActivate(): boolean {
    const user = this.tokenService.getUser();

    if(!user){
      this.router.navigate(['login'])
      return false;
    }

    return true;
  }
}