import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() heading: string;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() openSearch = new EventEmitter<void>();
  @Output() toggleFullscreen = new EventEmitter<void>();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/authentication/login'], { replaceUrl: true }));
  }
}
