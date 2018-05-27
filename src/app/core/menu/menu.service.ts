import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  roles?: string[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
  roles?: string[];
}

/* const MENUITEMS = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'basic-home',
    roles: ['ADMIN', 'USUARIO']
  },
  {
    state: '',
    name: 'ADMINISTRACION',
    type: 'sub',
    icon: 'basic-gear',
    roles: ['ADMIN'],
    children: [
      {
        state: 'usuarios',
        name: 'USUARIOS',
        roles: ['ADMIN']
      }
    ]
  },
  {
    state: 'about',
    name: 'ABOUT',
    type: 'link',
    icon: 'basic-info',
    roles: ['ADMIN', 'USUARIO']
  },
  {
    state: 'docs',
    name: 'DOCS',
    type: 'link',
    icon: 'basic-sheet-txt',
    roles: ['ADMIN', 'USUARIO']
  }
]; */

@Injectable()
export class MenuService {

  constructor() { }

  /* getAll(): Menu[] {
    return MENUITEMS;
  } */
}
