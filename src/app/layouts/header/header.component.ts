import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [AuthService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAdmin = false;
  constructor(private authService: AuthService, private router: Router) {
    const user = this.authService.getUser();

    if (user && user.role === 'admin') {
      this.isAdmin = true;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
