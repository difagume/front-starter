import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { AboutComponent } from './about.component';
import { AboutRoutes } from './about.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AboutRoutes), NgbAccordionModule],
  declarations: [AboutComponent]
})

export class AboutModule { }
