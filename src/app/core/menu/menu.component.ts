import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuService, Menu } from './menu.service';
/* tslint:disable:max-line-length */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  providers: [MenuService]
})

export class MenuComponent {
  currentLang = 'en';
  menu: Menu[];

  constructor(
    public menuService: MenuService,
    public translate: TranslateService) {
    this.menu = menuService.getAll();
  }
}
