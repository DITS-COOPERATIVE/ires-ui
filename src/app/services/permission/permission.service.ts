import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Role } from 'src/app/shared/interfaces/Role';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  role: Role = Role.ADMIN;

  constructor(auth: AuthenticationService) {
    this.role = auth.getUserRole();
  }

  canAccess(roles: string[]): boolean {
    return roles.includes(this.role);
  }
}
