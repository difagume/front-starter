import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

const Productos = gql`
  query todosProductos($id: ID!) {
    producto: productoes(where: { id: $id }) {
        nombre
        valor
    }
  }
`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
  productos: any[];
  loading = true;
  error: any;
  articulo: any;
  idProducto: String;
  private querySubscription: Subscription;

  closeResult: string;

  constructor(private apollo: Apollo, private modalService: NgbModal) { }

  ngOnInit() {
    this.idProducto = 'cjnhpli2t000l0822cggy3bu1';
    this.querySubscription = this.apollo
      .watchQuery({
        query: Productos,
        variables: {
          id: this.idProducto,
        },
        /* context: {
          // example of setting the headers with context per operation
          headers: new HttpHeaders().set('Authorization', `Bearer ${this.authenticationService.credentials.token}`),
        }, */
        // errorPolicy: 'ignore'
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.error = data['error'];
        this.productos = data && data['producto'];
      }, (err) => {
        this.error = err;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
