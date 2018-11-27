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
    usuarios(where: { activo: true }) {
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

export const DeleteUsuario = gql`
  mutation eliminarUsuario($id: ID!) {
    eliminarUsuario: deleteUsuario(where: { id: $id }) {
      id
      usuario
    }
  }
`;

export const ActualizarUsuario = gql`
  mutation updateUsuario($data: UsuarioUpdateInput!, $id: ID!) {
    updateUsuario(data: $data, where: { id: $id }) {
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
    usuarios {
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

export const RestablecerPassword = gql`
  mutation restablecerPassword($usuario: String!, $email: String!) {
    usuario: restablecerPassword(usuario: $usuario, email: $email) {
      id
      usuario
      email
      nombre
      apellido
    }
  }
`;

export const ActualizarPassword = gql`
  mutation actualizarPassword($token: String!, $password: String!) {
    usuario: actualizarPassword(token: $token, password: $password) {
      id
      usuario
      email
      nombre
      apellido
    }
  }
`;

export const articulos = gql`
  query Articulos {
    articulos: articuloes(orderBy: id_ASC, where: { activo: true }) {
      id
      nombre
      valor
      tiempo_preparacion
      menu {
        id
        nombre
      }
      articuloDetalle: articulos_detalle {
        id
        cantidad
        producto {
          id
          nombre
          valor
          stock
        }
      }
    }
  }
`;

export const AllMenus = gql`
  {
    menus(where: { activo: true }, orderBy: id_ASC) {
      id
      nombre
    }
  }
`;

export const AllProductos = gql`
  {
    productos: productoes(where: { activo: true }, orderBy: id_ASC) {
      id
      nombre
      valor
    }
  }
`;

export const CreateArticulo = gql`
  mutation createArticulo( $data: ArticuloCreateInput! ) {
    createArticulo( data: $data ) {
      id
      nombre
      valor
      tiempo_preparacion
      menu {
        id
        nombre
      }
      articuloDetalle: articulos_detalle {
        id
        cantidad
        producto {
          id
          nombre
          valor
          stock
        }
      }
    }
  }
`;

export const DeleteArticulo = gql`
  mutation eliminarArticulo($id: ID!) {
    eliminarArticulo: deleteArticulo(where: { id: $id }) {
      id
      nombre
    }
  }
`;

/* export const DeleteManyArticulo_detalles = gql`
  mutation deleteManyArticulo_detalles($id: ID!) {
    eliminarArticuloDetalles: deleteManyArticulo_detalles(where: { articulo: { id: $id } }) {
      count
    }
  }
`; */

export const UpdateArticulo = gql`
  mutation updateArticulo($data: ArticuloUpdateInput!, $id: ID!) {
    updateArticulo(data: $data, where: { id: $id }) {
      id
      nombre
      valor
      tiempo_preparacion
      menu {
        id
        nombre
      }
      articuloDetalle: articulos_detalle {
        id
        cantidad
        producto {
          id
          nombre
          valor
          stock
        }
      }
    }
  }
`;

export const CrearProducto = gql`
  mutation crearProducto($data: ProductoCreateInput!) {
    createProducto(data: $data) {
      id
      nombre
      stock
      valor
    }
  }
`;

export const CrearMenu = gql`
  mutation crearMenu($data: MenuCreateInput!) {
    createMenu(data: $data) {
      id
      nombre
    }
  }
`;

export const CrearRol = gql`
  mutation crearRol($data: RolCreateInput!) {
    createRol(data: $data) {
      id
      nombre
    }
  }
`;

export const MenusArticulos = gql`
  query menusArticulos {
    menusArticulos {
      id
      nombre
      articulos(where: { activo: true }) {
        id
        nombre
        valor
        tiempo_preparacion
        articulos_detalle(where: { activo: true }) {
          id
          cantidad
          producto {
            id
            nombre
            valor
            stock
          }
        }
      }
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
