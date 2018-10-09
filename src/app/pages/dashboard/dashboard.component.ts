import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

// const productos = gql`{allProductos{nodes{id nombre valor stock}}}`;
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

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.idProducto = 6;
    this.querySubscription = this.apollo
      .watchQuery({
        query: Productos,
        variables: {
          id: this.idProducto,
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.error = data['error'];
        this.productos = data && data['allProductos'].nodes;
      }, (err) => {
        this.error = err;
        this.loading = false;
      });

    /* this.apollo
      .watchQuery({
        query: gql`{allProductos{nodes{id nombre valor stock}}}`,
      })
      .valueChanges.subscribe(result => {
        this.productos = result.data && result.data['allProductos'].nodes;
        console.log(this.productos);
        this.loading = result.loading;
        this.error = result['error'];
      }); */
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
