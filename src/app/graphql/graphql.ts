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

export const usuarios = gql`
  query Usuarios {
    usuarios: usuarioses(where: { activo: true }) {
      id
      usuario
      email
      nombre
      apellido
      rol
      estado
    }
  }
`;

export const roles = gql`
  query Roles{
    roles: rols(where: { activo: true }) {
      id
      nombre
    }
  }
`;

export const DeleteUsuarios = gql`
  mutation eliminarUsuario($id: ID!) {
    eliminarUsuario: deleteUsuarios(where: { id: $id }) {
      id
      usuario
    }
  }
`;

export const ActualizarUsuario = gql`
  mutation updateUsuarios($data: UsuariosUpdateInput!, $id: ID!) {
    updateUsuarios(data: $data, where: { id: $id }) {
      id
      usuario
      email
      nombre
      apellido
      rol
      estado
    }
  }
`;

export const SingupSubscription = gql`
  subscription {
    usuarios: susuarios {
      id
      usuario
      email
      nombre
      apellido
      rol
      estado
    }
  }
`;
/* export const SingupSubscription = gql`
  subscription {
    usuarios(where: { mutation_in: [CREATED] }) {
      node {
        id
        usuario
        email
        nombre
        apellido
        rol
        estado
      }
    }
  }
`; */
