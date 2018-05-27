import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Menu } from './menu.service';
/* tslint:disable:max-line-length */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  // providers: [MenuService]
})

export class MenuComponent {
  currentLang = 'en';
  menu: Menu[];

  constructor(
    // public menuService: MenuService,
    public translate: TranslateService) {
    this.recuperar((data) => {
      this.menu = data;
    });
  }

  recuperar(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/menu.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
}
