import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../core/authentication/authentication.service';

const Productos = gql`
  query todosProductos($id: Int!) {
    allProductos(condition: { id: $id }) {
      nodes {
        nombre
        valor
      }
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
  idProducto: number;
  private querySubscription: Subscription;

  constructor(private apollo: Apollo,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.idProducto = 6;
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
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.error = data['error'];
        this.productos = data && data['allProductos'].nodes;
      }, (err) => {
        this.error = err;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
