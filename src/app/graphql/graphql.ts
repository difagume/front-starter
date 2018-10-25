import gql from 'graphql-tag';

export const Login = gql`
  query login($usuario: String!, $password: String!) {
    login(usuario: $usuario, password: $password) {
      token
      user {
        id
        usuario
        email
        nombre
        apellido
        rol
      }
    }
  }
`;

export const Singup = gql`
  mutation signup(
    $usuario: String!
    $email: String!
    $password: String!
    $nombre: String!
    $apellido: String!
  ) {
    signup(
      usuario: $usuario
      email: $email
      password: $password
      nombre: $nombre
      apellido: $apellido
    ) {
      token
      user {
        id
        usuario
        email
        nombre
        apellido
        rol
      }
    }
  }
`;

export const Usuario = gql`
  query usuarios($id: ID!){
    usuarios(where: { id: $id }) {
      id
      usuario
      email
      nombre
      apellido
      rol
    }
  }
`;
