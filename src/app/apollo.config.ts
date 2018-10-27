import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { getOperationAST } from 'graphql';
import { URL_SERVICIOS, WS_SERVICIOS } from './config';
declare let swal: any;

@NgModule({
    exports: [
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ]
})
export class GraphQLModule {
    constructor(apollo: Apollo,
        httpLink: HttpLink) {

        // Header para pasar token en las consultas y mutaciones
        const token = this.getToken();
        const authorization = token ? `Bearer ${token}` : null;
        const headers = new HttpHeaders().set('Authorization', authorization);

        // URI del servidor graphql-yoga donde escucha las peticiones de graphql
        const http = httpLink.create({ uri: URL_SERVICIOS, headers });

        // Subscriciones
        const ws = new WebSocketLink({
            uri: WS_SERVICIOS,
            options: {
                reconnect: true,
                connectionParams: {
                    authToken: this.getToken(),
                }
            }
        });
        const link = ApolloLink.split(
            operation => {
                const operationAST = getOperationAST(operation.query, operation.operationName);
                return !!operationAST && operationAST.operation === 'subscription';
            },
            ws,
            http,
        );
        // Middleware para setear headers
        /* const authMiddleware = new ApolloLink((operation, forward) => {
            const currentUser = JSON.parse(localStorage.getItem('credentials'));
            if (currentUser && currentUser.token) {
                operation.setContext({
                    headers: new HttpHeaders().set('Authorization', `Bearer ${currentUser.token}` || null)
                });
            }

            return forward(operation);
        }); */

        // Middleware para manejo de errorers de apollo (paquete: apollo-link-error)
        const errorMiddleware = onError(({ graphQLErrors }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) => {
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
                    swal('Error', message, 'error');
                });
            }
            // if (networkError) { console.log(`[Network error]: ${JSON.stringify(networkError)}`); }
        });

        // Con headers, manejo de errores y subscripciones
        apollo.create({
            link: from([errorMiddleware, link]),
            cache: new InMemoryCache(),
        });

        // Con headers y manejo de errores
        /* apollo.create({
           link: from([authMiddleware, errorMiddleware, http]),
           cache: new InMemoryCache(),
       }); */

        // Con headers
        /* apollo.create({
          link: concat(authMiddleware, http),
          cache: new InMemoryCache(),
        }); */

        // Sin headers
        /* apollo.create({
          link: httpLink.create({ uri: `${URL_SERVICIOS}/graphql` }),
          cache: new InMemoryCache(),
        }); */
    }

    private getToken() {
        const currentUser = JSON.parse(localStorage.getItem('credentials'));
        return currentUser && currentUser.token ? currentUser.token : null;
    }
}