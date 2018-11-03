/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

export type DateTime = any;

export type Long = any;

export interface Node {
  id: string;
}

export interface Query {
  articulo?: Articulo | null;
  articuloes: (Articulo | null)[];
  articuloesConnection: ArticuloConnection;
  articulo_detalle?: ArticuloDetalle | null;
  articulo_detalles: (ArticuloDetalle | null)[];
  articulo_detallesConnection: ArticuloDetalleConnection;
  menu?: Menu | null;
  menus: (Menu | null)[];
  menusConnection: MenuConnection;
  producto?: Producto | null;
  productoes: (Producto | null)[];
  productoesConnection: ProductoConnection;
  rol?: Rol | null;
  rols: (Rol | null)[];
  rolsConnection: RolConnection;
  usuario?: Usuario | null;
  usuarios: (Usuario | null)[];
  usuariosConnection: UsuarioConnection;
  node?: Node | null;
  login: AuthPayload;
}

export interface Articulo {
  id: string;
  nombre: string;
  valor: number;
  tiempo_preparacion?: DateTime | null;
  menu: Menu;
  articulos_detalle?: ArticuloDetalle[] | null;
  activo: boolean;
}

export interface Menu {
  id: string;
  nombre: string;
  articulos?: Articulo[] | null;
  activo: boolean;
}

export interface ArticuloDetalle {
  id: string;
  cantidad: number;
  producto: Producto;
  articulo: Articulo;
  activo: boolean;
}

export interface Producto {
  id: string;
  nombre: string;
  valor: number;
  stock: number;
  articulos_detalle?: ArticuloDetalle[] | null;
  activo: boolean;
}

export interface ArticuloConnection {
  pageInfo: PageInfo;
  edges: (ArticuloEdge | null)[];
  aggregate: AggregateArticulo;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
}

export interface ArticuloEdge {
  node: Articulo;
  cursor: string;
}

export interface AggregateArticulo {
  count: number;
}

export interface ArticuloDetalleConnection {
  pageInfo: PageInfo;
  edges: (ArticuloDetalleEdge | null)[];
  aggregate: AggregateArticuloDetalle;
}

export interface ArticuloDetalleEdge {
  node: ArticuloDetalle;
  cursor: string;
}

export interface AggregateArticuloDetalle {
  count: number;
}

export interface MenuConnection {
  pageInfo: PageInfo;
  edges: (MenuEdge | null)[];
  aggregate: AggregateMenu;
}

export interface MenuEdge {
  node: Menu;
  cursor: string;
}

export interface AggregateMenu {
  count: number;
}

export interface ProductoConnection {
  pageInfo: PageInfo;
  edges: (ProductoEdge | null)[];
  aggregate: AggregateProducto;
}

export interface ProductoEdge {
  node: Producto;
  cursor: string;
}

export interface AggregateProducto {
  count: number;
}

export interface Rol {
  id: string;
  nombre: string;
  activo: boolean;
}

export interface RolConnection {
  pageInfo: PageInfo;
  edges: (RolEdge | null)[];
  aggregate: AggregateRol;
}

export interface RolEdge {
  node: Rol;
  cursor: string;
}

export interface AggregateRol {
  count: number;
}

export interface Usuario {
  id: string;
  usuario: string;
  email: string;
  password: string;
  rol: string;
  img?: string | null;
  social?: boolean | null;
  nombre?: string | null;
  apellido?: string | null;
  estado: string;
  activo: boolean;
}

export interface UsuarioConnection {
  pageInfo: PageInfo;
  edges: (UsuarioEdge | null)[];
  aggregate: AggregateUsuario;
}

export interface UsuarioEdge {
  node: Usuario;
  cursor: string;
}

export interface AggregateUsuario {
  count: number;
}

export interface AuthPayload {
  token: string;
  user: Usuario;
}

export interface Mutation {
  createArticulo: Articulo;
  updateArticulo?: Articulo | null;
  updateManyArticuloes: BatchPayload;
  upsertArticulo: Articulo;
  deleteArticulo?: Articulo | null;
  deleteManyArticuloes: BatchPayload;
  createArticulo_detalle: ArticuloDetalle;
  updateArticulo_detalle?: ArticuloDetalle | null;
  updateManyArticulo_detalles: BatchPayload;
  upsertArticulo_detalle: ArticuloDetalle;
  deleteArticulo_detalle?: ArticuloDetalle | null;
  deleteManyArticulo_detalles: BatchPayload;
  createMenu: Menu;
  updateMenu?: Menu | null;
  updateManyMenus: BatchPayload;
  upsertMenu: Menu;
  deleteMenu?: Menu | null;
  deleteManyMenus: BatchPayload;
  createProducto: Producto;
  updateProducto?: Producto | null;
  updateManyProductoes: BatchPayload;
  upsertProducto: Producto;
  deleteProducto?: Producto | null;
  deleteManyProductoes: BatchPayload;
  createRol: Rol;
  updateRol?: Rol | null;
  updateManyRols: BatchPayload;
  upsertRol: Rol;
  deleteRol?: Rol | null;
  deleteManyRols: BatchPayload;
  createUsuario: Usuario;
  updateUsuario?: Usuario | null;
  updateManyUsuarios: BatchPayload;
  upsertUsuario: Usuario;
  deleteUsuario?: Usuario | null;
  deleteManyUsuarios: BatchPayload;
  signup: AuthPayload;
  restablecerPassword: Usuario;
  actualizarPassword: Usuario;
}

export interface BatchPayload {
  count: Long;
}

export interface Subscription {
  articulo?: ArticuloSubscriptionPayload | null;
  articulo_detalle?: ArticuloDetalleSubscriptionPayload | null;
  menu?: MenuSubscriptionPayload | null;
  producto?: ProductoSubscriptionPayload | null;
  rol?: RolSubscriptionPayload | null;
  usuario?: UsuarioSubscriptionPayload | null;
  roles?: Rol | null;
  usuarios?: Usuario | null;
}

export interface ArticuloSubscriptionPayload {
  mutation: MutationType;
  node?: Articulo | null;
  updatedFields?: string[] | null;
  previousValues?: ArticuloPreviousValues | null;
}

export interface ArticuloPreviousValues {
  id: string;
  nombre: string;
  valor: number;
  tiempo_preparacion?: DateTime | null;
  activo: boolean;
}

export interface ArticuloDetalleSubscriptionPayload {
  mutation: MutationType;
  node?: ArticuloDetalle | null;
  updatedFields?: string[] | null;
  previousValues?: ArticuloDetallePreviousValues | null;
}

export interface ArticuloDetallePreviousValues {
  id: string;
  cantidad: number;
  activo: boolean;
}

export interface MenuSubscriptionPayload {
  mutation: MutationType;
  node?: Menu | null;
  updatedFields?: string[] | null;
  previousValues?: MenuPreviousValues | null;
}

export interface MenuPreviousValues {
  id: string;
  nombre: string;
  activo: boolean;
}

export interface ProductoSubscriptionPayload {
  mutation: MutationType;
  node?: Producto | null;
  updatedFields?: string[] | null;
  previousValues?: ProductoPreviousValues | null;
}

export interface ProductoPreviousValues {
  id: string;
  nombre: string;
  valor: number;
  stock: number;
  activo: boolean;
}

export interface RolSubscriptionPayload {
  mutation: MutationType;
  node?: Rol | null;
  updatedFields?: string[] | null;
  previousValues?: RolPreviousValues | null;
}

export interface RolPreviousValues {
  id: string;
  nombre: string;
  activo: boolean;
}

export interface UsuarioSubscriptionPayload {
  mutation: MutationType;
  node?: Usuario | null;
  updatedFields?: string[] | null;
  previousValues?: UsuarioPreviousValues | null;
}

export interface UsuarioPreviousValues {
  id: string;
  usuario: string;
  email: string;
  password: string;
  rol: string;
  img?: string | null;
  social?: boolean | null;
  nombre?: string | null;
  apellido?: string | null;
  estado: string;
  activo: boolean;
}

export interface ArticuloWhereUniqueInput {
  id?: string | null;
  nombre?: string | null;
}

export interface ArticuloWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  nombre?: string | null;
  nombre_not?: string | null;
  nombre_in?: string[] | null;
  nombre_not_in?: string[] | null;
  nombre_lt?: string | null;
  nombre_lte?: string | null;
  nombre_gt?: string | null;
  nombre_gte?: string | null;
  nombre_contains?: string | null;
  nombre_not_contains?: string | null;
  nombre_starts_with?: string | null;
  nombre_not_starts_with?: string | null;
  nombre_ends_with?: string | null;
  nombre_not_ends_with?: string | null;
  valor?: number | null;
  valor_not?: number | null;
  valor_in?: number[] | null;
  valor_not_in?: number[] | null;
  valor_lt?: number | null;
  valor_lte?: number | null;
  valor_gt?: number | null;
  valor_gte?: number | null;
  tiempo_preparacion?: DateTime | null;
  tiempo_preparacion_not?: DateTime | null;
  tiempo_preparacion_in?: DateTime[] | null;
  tiempo_preparacion_not_in?: DateTime[] | null;
  tiempo_preparacion_lt?: DateTime | null;
  tiempo_preparacion_lte?: DateTime | null;
  tiempo_preparacion_gt?: DateTime | null;
  tiempo_preparacion_gte?: DateTime | null;
  menu?: MenuWhereInput | null;
  articulos_detalle_every?: ArticuloDetalleWhereInput | null;
  articulos_detalle_some?: ArticuloDetalleWhereInput | null;
  articulos_detalle_none?: ArticuloDetalleWhereInput | null;
  activo?: boolean | null;
  activo_not?: boolean | null;
  AND?: ArticuloWhereInput[] | null;
  OR?: ArticuloWhereInput[] | null;
  NOT?: ArticuloWhereInput[] | null;
}

export interface MenuWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  nombre?: string | null;
  nombre_not?: string | null;
  nombre_in?: string[] | null;
  nombre_not_in?: string[] | null;
  nombre_lt?: string | null;
  nombre_lte?: string | null;
  nombre_gt?: string | null;
  nombre_gte?: string | null;
  nombre_contains?: string | null;
  nombre_not_contains?: string | null;
  nombre_starts_with?: string | null;
  nombre_not_starts_with?: string | null;
  nombre_ends_with?: string | null;
  nombre_not_ends_with?: string | null;
  articulos_every?: ArticuloWhereInput | null;
  articulos_some?: ArticuloWhereInput | null;
  articulos_none?: ArticuloWhereInput | null;
  activo?: boolean | null;
  activo_not?: boolean | null;
  AND?: MenuWhereInput[] | null;
  OR?: MenuWhereInput[] | null;
  NOT?: MenuWhereInput[] | null;
}

export interface ArticuloDetalleWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  cantidad?: number | null;
  cantidad_not?: number | null;
  cantidad_in?: number[] | null;
  cantidad_not_in?: number[] | null;
  cantidad_lt?: number | null;
  cantidad_lte?: number | null;
  cantidad_gt?: number | null;
  cantidad_gte?: number | null;
  producto?: ProductoWhereInput | null;
  articulo?: ArticuloWhereInput | null;
  activo?: boolean | null;
  activo_not?: boolean | null;
  AND?: ArticuloDetalleWhereInput[] | null;
  OR?: ArticuloDetalleWhereInput[] | null;
  NOT?: ArticuloDetalleWhereInput[] | null;
}

export interface ProductoWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  nombre?: string | null;
  nombre_not?: string | null;
  nombre_in?: string[] | null;
  nombre_not_in?: string[] | null;
  nombre_lt?: string | null;
  nombre_lte?: string | null;
  nombre_gt?: string | null;
  nombre_gte?: string | null;
  nombre_contains?: string | null;
  nombre_not_contains?: string | null;
  nombre_starts_with?: string | null;
  nombre_not_starts_with?: string | null;
  nombre_ends_with?: string | null;
  nombre_not_ends_with?: string | null;
  valor?: number | null;
  valor_not?: number | null;
  valor_in?: number[] | null;
  valor_not_in?: number[] | null;
  valor_lt?: number | null;
  valor_lte?: number | null;
  valor_gt?: number | null;
  valor_gte?: number | null;
  stock?: number | null;
  stock_not?: number | null;
  stock_in?: number[] | null;
  stock_not_in?: number[] | null;
  stock_lt?: number | null;
  stock_lte?: number | null;
  stock_gt?: number | null;
  stock_gte?: number | null;
  articulos_detalle_every?: ArticuloDetalleWhereInput | null;
  articulos_detalle_some?: ArticuloDetalleWhereInput | null;
  articulos_detalle_none?: ArticuloDetalleWhereInput | null;
  activo?: boolean | null;
  activo_not?: boolean | null;
  AND?: ProductoWhereInput[] | null;
  OR?: ProductoWhereInput[] | null;
  NOT?: ProductoWhereInput[] | null;
}

export interface ArticuloDetalleWhereUniqueInput {
  id?: string | null;
}

export interface MenuWhereUniqueInput {
  id?: string | null;
  nombre?: string | null;
}

export interface ProductoWhereUniqueInput {
  id?: string | null;
  nombre?: string | null;
}

export interface RolWhereUniqueInput {
  id?: string | null;
}

export interface RolWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  nombre?: string | null;
  nombre_not?: string | null;
  nombre_in?: string[] | null;
  nombre_not_in?: string[] | null;
  nombre_lt?: string | null;
  nombre_lte?: string | null;
  nombre_gt?: string | null;
  nombre_gte?: string | null;
  nombre_contains?: string | null;
  nombre_not_contains?: string | null;
  nombre_starts_with?: string | null;
  nombre_not_starts_with?: string | null;
  nombre_ends_with?: string | null;
  nombre_not_ends_with?: string | null;
  activo?: boolean | null;
  activo_not?: boolean | null;
  AND?: RolWhereInput[] | null;
  OR?: RolWhereInput[] | null;
  NOT?: RolWhereInput[] | null;
}

export interface UsuarioWhereUniqueInput {
  id?: string | null;
  usuario?: string | null;
  email?: string | null;
}

export interface UsuarioWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  usuario?: string | null;
  usuario_not?: string | null;
  usuario_in?: string[] | null;
  usuario_not_in?: string[] | null;
  usuario_lt?: string | null;
  usuario_lte?: string | null;
  usuario_gt?: string | null;
  usuario_gte?: string | null;
  usuario_contains?: string | null;
  usuario_not_contains?: string | null;
  usuario_starts_with?: string | null;
  usuario_not_starts_with?: string | null;
  usuario_ends_with?: string | null;
  usuario_not_ends_with?: string | null;
  email?: string | null;
  email_not?: string | null;
  email_in?: string[] | null;
  email_not_in?: string[] | null;
  email_lt?: string | null;
  email_lte?: string | null;
  email_gt?: string | null;
  email_gte?: string | null;
  email_contains?: string | null;
  email_not_contains?: string | null;
  email_starts_with?: string | null;
  email_not_starts_with?: string | null;
  email_ends_with?: string | null;
  email_not_ends_with?: string | null;
  password?: string | null;
  password_not?: string | null;
  password_in?: string[] | null;
  password_not_in?: string[] | null;
  password_lt?: string | null;
  password_lte?: string | null;
  password_gt?: string | null;
  password_gte?: string | null;
  password_contains?: string | null;
  password_not_contains?: string | null;
  password_starts_with?: string | null;
  password_not_starts_with?: string | null;
  password_ends_with?: string | null;
  password_not_ends_with?: string | null;
  rol?: string | null;
  rol_not?: string | null;
  rol_in?: string[] | null;
  rol_not_in?: string[] | null;
  rol_lt?: string | null;
  rol_lte?: string | null;
  rol_gt?: string | null;
  rol_gte?: string | null;
  rol_contains?: string | null;
  rol_not_contains?: string | null;
  rol_starts_with?: string | null;
  rol_not_starts_with?: string | null;
  rol_ends_with?: string | null;
  rol_not_ends_with?: string | null;
  img?: string | null;
  img_not?: string | null;
  img_in?: string[] | null;
  img_not_in?: string[] | null;
  img_lt?: string | null;
  img_lte?: string | null;
  img_gt?: string | null;
  img_gte?: string | null;
  img_contains?: string | null;
  img_not_contains?: string | null;
  img_starts_with?: string | null;
  img_not_starts_with?: string | null;
  img_ends_with?: string | null;
  img_not_ends_with?: string | null;
  social?: boolean | null;
  social_not?: boolean | null;
  nombre?: string | null;
  nombre_not?: string | null;
  nombre_in?: string[] | null;
  nombre_not_in?: string[] | null;
  nombre_lt?: string | null;
  nombre_lte?: string | null;
  nombre_gt?: string | null;
  nombre_gte?: string | null;
  nombre_contains?: string | null;
  nombre_not_contains?: string | null;
  nombre_starts_with?: string | null;
  nombre_not_starts_with?: string | null;
  nombre_ends_with?: string | null;
  nombre_not_ends_with?: string | null;
  apellido?: string | null;
  apellido_not?: string | null;
  apellido_in?: string[] | null;
  apellido_not_in?: string[] | null;
  apellido_lt?: string | null;
  apellido_lte?: string | null;
  apellido_gt?: string | null;
  apellido_gte?: string | null;
  apellido_contains?: string | null;
  apellido_not_contains?: string | null;
  apellido_starts_with?: string | null;
  apellido_not_starts_with?: string | null;
  apellido_ends_with?: string | null;
  apellido_not_ends_with?: string | null;
  estado?: string | null;
  estado_not?: string | null;
  estado_in?: string[] | null;
  estado_not_in?: string[] | null;
  estado_lt?: string | null;
  estado_lte?: string | null;
  estado_gt?: string | null;
  estado_gte?: string | null;
  estado_contains?: string | null;
  estado_not_contains?: string | null;
  estado_starts_with?: string | null;
  estado_not_starts_with?: string | null;
  estado_ends_with?: string | null;
  estado_not_ends_with?: string | null;
  activo?: boolean | null;
  activo_not?: boolean | null;
  AND?: UsuarioWhereInput[] | null;
  OR?: UsuarioWhereInput[] | null;
  NOT?: UsuarioWhereInput[] | null;
}

export interface ArticuloCreateInput {
  nombre: string;
  valor: number;
  tiempo_preparacion?: DateTime | null;
  menu: MenuCreateOneWithoutArticulosInput;
  articulos_detalle?: ArticuloDetalleCreateManyWithoutArticuloInput | null;
  activo?: boolean | null;
}

export interface MenuCreateOneWithoutArticulosInput {
  create?: MenuCreateWithoutArticulosInput | null;
  connect?: MenuWhereUniqueInput | null;
}

export interface MenuCreateWithoutArticulosInput {
  nombre: string;
  activo?: boolean | null;
}

export interface ArticuloDetalleCreateManyWithoutArticuloInput {
  create?: ArticuloDetalleCreateWithoutArticuloInput[] | null;
  connect?: ArticuloDetalleWhereUniqueInput[] | null;
}

export interface ArticuloDetalleCreateWithoutArticuloInput {
  cantidad: number;
  producto: ProductoCreateOneWithoutArticulosDetalleInput;
  activo?: boolean | null;
}

export interface ProductoCreateOneWithoutArticulosDetalleInput {
  create?: ProductoCreateWithoutArticulosDetalleInput | null;
  connect?: ProductoWhereUniqueInput | null;
}

export interface ProductoCreateWithoutArticulosDetalleInput {
  nombre: string;
  valor: number;
  stock: number;
  activo?: boolean | null;
}

export interface ArticuloUpdateInput {
  nombre?: string | null;
  valor?: number | null;
  tiempo_preparacion?: DateTime | null;
  menu?: MenuUpdateOneRequiredWithoutArticulosInput | null;
  articulos_detalle?: ArticuloDetalleUpdateManyWithoutArticuloInput | null;
  activo?: boolean | null;
}

export interface MenuUpdateOneRequiredWithoutArticulosInput {
  create?: MenuCreateWithoutArticulosInput | null;
  update?: MenuUpdateWithoutArticulosDataInput | null;
  upsert?: MenuUpsertWithoutArticulosInput | null;
  connect?: MenuWhereUniqueInput | null;
}

export interface MenuUpdateWithoutArticulosDataInput {
  nombre?: string | null;
  activo?: boolean | null;
}

export interface MenuUpsertWithoutArticulosInput {
  update: MenuUpdateWithoutArticulosDataInput;
  create: MenuCreateWithoutArticulosInput;
}

export interface ArticuloDetalleUpdateManyWithoutArticuloInput {
  create?: ArticuloDetalleCreateWithoutArticuloInput[] | null;
  delete?: ArticuloDetalleWhereUniqueInput[] | null;
  connect?: ArticuloDetalleWhereUniqueInput[] | null;
  disconnect?: ArticuloDetalleWhereUniqueInput[] | null;
  update?: ArticuloDetalleUpdateWithWhereUniqueWithoutArticuloInput[] | null;
  upsert?: ArticuloDetalleUpsertWithWhereUniqueWithoutArticuloInput[] | null;
}

export interface ArticuloDetalleUpdateWithWhereUniqueWithoutArticuloInput {
  where: ArticuloDetalleWhereUniqueInput;
  data: ArticuloDetalleUpdateWithoutArticuloDataInput;
}

export interface ArticuloDetalleUpdateWithoutArticuloDataInput {
  cantidad?: number | null;
  producto?: ProductoUpdateOneRequiredWithoutArticulosDetalleInput | null;
  activo?: boolean | null;
}

export interface ProductoUpdateOneRequiredWithoutArticulosDetalleInput {
  create?: ProductoCreateWithoutArticulosDetalleInput | null;
  update?: ProductoUpdateWithoutArticulosDetalleDataInput | null;
  upsert?: ProductoUpsertWithoutArticulosDetalleInput | null;
  connect?: ProductoWhereUniqueInput | null;
}

export interface ProductoUpdateWithoutArticulosDetalleDataInput {
  nombre?: string | null;
  valor?: number | null;
  stock?: number | null;
  activo?: boolean | null;
}

export interface ProductoUpsertWithoutArticulosDetalleInput {
  update: ProductoUpdateWithoutArticulosDetalleDataInput;
  create: ProductoCreateWithoutArticulosDetalleInput;
}

export interface ArticuloDetalleUpsertWithWhereUniqueWithoutArticuloInput {
  where: ArticuloDetalleWhereUniqueInput;
  update: ArticuloDetalleUpdateWithoutArticuloDataInput;
  create: ArticuloDetalleCreateWithoutArticuloInput;
}

export interface ArticuloDetalleCreateInput {
  cantidad: number;
  producto: ProductoCreateOneWithoutArticulosDetalleInput;
  articulo: ArticuloCreateOneWithoutArticulosDetalleInput;
  activo?: boolean | null;
}

export interface ArticuloCreateOneWithoutArticulosDetalleInput {
  create?: ArticuloCreateWithoutArticulosDetalleInput | null;
  connect?: ArticuloWhereUniqueInput | null;
}

export interface ArticuloCreateWithoutArticulosDetalleInput {
  nombre: string;
  valor: number;
  tiempo_preparacion?: DateTime | null;
  menu: MenuCreateOneWithoutArticulosInput;
  activo?: boolean | null;
}

export interface ArticuloDetalleUpdateInput {
  cantidad?: number | null;
  producto?: ProductoUpdateOneRequiredWithoutArticulosDetalleInput | null;
  articulo?: ArticuloUpdateOneRequiredWithoutArticulosDetalleInput | null;
  activo?: boolean | null;
}

export interface ArticuloUpdateOneRequiredWithoutArticulosDetalleInput {
  create?: ArticuloCreateWithoutArticulosDetalleInput | null;
  update?: ArticuloUpdateWithoutArticulosDetalleDataInput | null;
  upsert?: ArticuloUpsertWithoutArticulosDetalleInput | null;
  connect?: ArticuloWhereUniqueInput | null;
}

export interface ArticuloUpdateWithoutArticulosDetalleDataInput {
  nombre?: string | null;
  valor?: number | null;
  tiempo_preparacion?: DateTime | null;
  menu?: MenuUpdateOneRequiredWithoutArticulosInput | null;
  activo?: boolean | null;
}

export interface ArticuloUpsertWithoutArticulosDetalleInput {
  update: ArticuloUpdateWithoutArticulosDetalleDataInput;
  create: ArticuloCreateWithoutArticulosDetalleInput;
}

export interface MenuCreateInput {
  nombre: string;
  articulos?: ArticuloCreateManyWithoutMenuInput | null;
  activo?: boolean | null;
}

export interface ArticuloCreateManyWithoutMenuInput {
  create?: ArticuloCreateWithoutMenuInput[] | null;
  connect?: ArticuloWhereUniqueInput[] | null;
}

export interface ArticuloCreateWithoutMenuInput {
  nombre: string;
  valor: number;
  tiempo_preparacion?: DateTime | null;
  articulos_detalle?: ArticuloDetalleCreateManyWithoutArticuloInput | null;
  activo?: boolean | null;
}

export interface MenuUpdateInput {
  nombre?: string | null;
  articulos?: ArticuloUpdateManyWithoutMenuInput | null;
  activo?: boolean | null;
}

export interface ArticuloUpdateManyWithoutMenuInput {
  create?: ArticuloCreateWithoutMenuInput[] | null;
  delete?: ArticuloWhereUniqueInput[] | null;
  connect?: ArticuloWhereUniqueInput[] | null;
  disconnect?: ArticuloWhereUniqueInput[] | null;
  update?: ArticuloUpdateWithWhereUniqueWithoutMenuInput[] | null;
  upsert?: ArticuloUpsertWithWhereUniqueWithoutMenuInput[] | null;
}

export interface ArticuloUpdateWithWhereUniqueWithoutMenuInput {
  where: ArticuloWhereUniqueInput;
  data: ArticuloUpdateWithoutMenuDataInput;
}

export interface ArticuloUpdateWithoutMenuDataInput {
  nombre?: string | null;
  valor?: number | null;
  tiempo_preparacion?: DateTime | null;
  articulos_detalle?: ArticuloDetalleUpdateManyWithoutArticuloInput | null;
  activo?: boolean | null;
}

export interface ArticuloUpsertWithWhereUniqueWithoutMenuInput {
  where: ArticuloWhereUniqueInput;
  update: ArticuloUpdateWithoutMenuDataInput;
  create: ArticuloCreateWithoutMenuInput;
}

export interface ProductoCreateInput {
  nombre: string;
  valor: number;
  stock: number;
  articulos_detalle?: ArticuloDetalleCreateManyWithoutProductoInput | null;
  activo?: boolean | null;
}

export interface ArticuloDetalleCreateManyWithoutProductoInput {
  create?: ArticuloDetalleCreateWithoutProductoInput[] | null;
  connect?: ArticuloDetalleWhereUniqueInput[] | null;
}

export interface ArticuloDetalleCreateWithoutProductoInput {
  cantidad: number;
  articulo: ArticuloCreateOneWithoutArticulosDetalleInput;
  activo?: boolean | null;
}

export interface ProductoUpdateInput {
  nombre?: string | null;
  valor?: number | null;
  stock?: number | null;
  articulos_detalle?: ArticuloDetalleUpdateManyWithoutProductoInput | null;
  activo?: boolean | null;
}

export interface ArticuloDetalleUpdateManyWithoutProductoInput {
  create?: ArticuloDetalleCreateWithoutProductoInput[] | null;
  delete?: ArticuloDetalleWhereUniqueInput[] | null;
  connect?: ArticuloDetalleWhereUniqueInput[] | null;
  disconnect?: ArticuloDetalleWhereUniqueInput[] | null;
  update?: ArticuloDetalleUpdateWithWhereUniqueWithoutProductoInput[] | null;
  upsert?: ArticuloDetalleUpsertWithWhereUniqueWithoutProductoInput[] | null;
}

export interface ArticuloDetalleUpdateWithWhereUniqueWithoutProductoInput {
  where: ArticuloDetalleWhereUniqueInput;
  data: ArticuloDetalleUpdateWithoutProductoDataInput;
}

export interface ArticuloDetalleUpdateWithoutProductoDataInput {
  cantidad?: number | null;
  articulo?: ArticuloUpdateOneRequiredWithoutArticulosDetalleInput | null;
  activo?: boolean | null;
}

export interface ArticuloDetalleUpsertWithWhereUniqueWithoutProductoInput {
  where: ArticuloDetalleWhereUniqueInput;
  update: ArticuloDetalleUpdateWithoutProductoDataInput;
  create: ArticuloDetalleCreateWithoutProductoInput;
}

export interface RolCreateInput {
  nombre: string;
  activo?: boolean | null;
}

export interface RolUpdateInput {
  nombre?: string | null;
  activo?: boolean | null;
}

export interface UsuarioCreateInput {
  usuario: string;
  email: string;
  password: string;
  rol?: string | null;
  img?: string | null;
  social?: boolean | null;
  nombre?: string | null;
  apellido?: string | null;
  estado?: string | null;
  activo?: boolean | null;
}

export interface UsuarioUpdateInput {
  usuario?: string | null;
  email?: string | null;
  password?: string | null;
  rol?: string | null;
  img?: string | null;
  social?: boolean | null;
  nombre?: string | null;
  apellido?: string | null;
  estado?: string | null;
  activo?: boolean | null;
}

export interface ArticuloSubscriptionWhereInput {
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: ArticuloWhereInput | null;
  AND?: ArticuloSubscriptionWhereInput[] | null;
  OR?: ArticuloSubscriptionWhereInput[] | null;
  NOT?: ArticuloSubscriptionWhereInput[] | null;
}

export interface ArticuloDetalleSubscriptionWhereInput {
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: ArticuloDetalleWhereInput | null;
  AND?: ArticuloDetalleSubscriptionWhereInput[] | null;
  OR?: ArticuloDetalleSubscriptionWhereInput[] | null;
  NOT?: ArticuloDetalleSubscriptionWhereInput[] | null;
}

export interface MenuSubscriptionWhereInput {
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: MenuWhereInput | null;
  AND?: MenuSubscriptionWhereInput[] | null;
  OR?: MenuSubscriptionWhereInput[] | null;
  NOT?: MenuSubscriptionWhereInput[] | null;
}

export interface ProductoSubscriptionWhereInput {
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: ProductoWhereInput | null;
  AND?: ProductoSubscriptionWhereInput[] | null;
  OR?: ProductoSubscriptionWhereInput[] | null;
  NOT?: ProductoSubscriptionWhereInput[] | null;
}

export interface RolSubscriptionWhereInput {
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: RolWhereInput | null;
  AND?: RolSubscriptionWhereInput[] | null;
  OR?: RolSubscriptionWhereInput[] | null;
  NOT?: RolSubscriptionWhereInput[] | null;
}

export interface UsuarioSubscriptionWhereInput {
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: UsuarioWhereInput | null;
  AND?: UsuarioSubscriptionWhereInput[] | null;
  OR?: UsuarioSubscriptionWhereInput[] | null;
  NOT?: UsuarioSubscriptionWhereInput[] | null;
}
export interface ArticuloQueryArgs {
  where: ArticuloWhereUniqueInput;
}
export interface ArticuloesQueryArgs {
  where?: ArticuloWhereInput | null;
  orderBy?: ArticuloOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface ArticuloesConnectionQueryArgs {
  where?: ArticuloWhereInput | null;
  orderBy?: ArticuloOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface ArticuloDetalleQueryArgs {
  where: ArticuloDetalleWhereUniqueInput;
}
export interface ArticuloDetallesQueryArgs {
  where?: ArticuloDetalleWhereInput | null;
  orderBy?: ArticuloDetalleOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface ArticuloDetallesConnectionQueryArgs {
  where?: ArticuloDetalleWhereInput | null;
  orderBy?: ArticuloDetalleOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface MenuQueryArgs {
  where: MenuWhereUniqueInput;
}
export interface MenusQueryArgs {
  where?: MenuWhereInput | null;
  orderBy?: MenuOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface MenusConnectionQueryArgs {
  where?: MenuWhereInput | null;
  orderBy?: MenuOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface ProductoQueryArgs {
  where: ProductoWhereUniqueInput;
}
export interface ProductoesQueryArgs {
  where?: ProductoWhereInput | null;
  orderBy?: ProductoOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface ProductoesConnectionQueryArgs {
  where?: ProductoWhereInput | null;
  orderBy?: ProductoOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface RolQueryArgs {
  where: RolWhereUniqueInput;
}
export interface RolsQueryArgs {
  where?: RolWhereInput | null;
  orderBy?: RolOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface RolsConnectionQueryArgs {
  where?: RolWhereInput | null;
  orderBy?: RolOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface UsuarioQueryArgs {
  where: UsuarioWhereUniqueInput;
}
export interface UsuariosQueryArgs {
  where?: UsuarioWhereInput | null;
  orderBy?: UsuarioOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface UsuariosConnectionQueryArgs {
  where?: UsuarioWhereInput | null;
  orderBy?: UsuarioOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface NodeQueryArgs {
  id: string;
}
export interface LoginQueryArgs {
  usuario: string;
  password: string;
}
export interface ArticulosDetalleArticuloArgs {
  where?: ArticuloDetalleWhereInput | null;
  orderBy?: ArticuloDetalleOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface ArticulosMenuArgs {
  where?: ArticuloWhereInput | null;
  orderBy?: ArticuloOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface ArticulosDetalleProductoArgs {
  where?: ArticuloDetalleWhereInput | null;
  orderBy?: ArticuloDetalleOrderByInput | null;
  skip?: number | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
}
export interface CreateArticuloMutationArgs {
  data: ArticuloCreateInput;
}
export interface UpdateArticuloMutationArgs {
  data: ArticuloUpdateInput;
  where: ArticuloWhereUniqueInput;
}
export interface UpdateManyArticuloesMutationArgs {
  data: ArticuloUpdateInput;
  where?: ArticuloWhereInput | null;
}
export interface UpsertArticuloMutationArgs {
  where: ArticuloWhereUniqueInput;
  create: ArticuloCreateInput;
  update: ArticuloUpdateInput;
}
export interface DeleteArticuloMutationArgs {
  where: ArticuloWhereUniqueInput;
}
export interface DeleteManyArticuloesMutationArgs {
  where?: ArticuloWhereInput | null;
}
export interface CreateArticuloDetalleMutationArgs {
  data: ArticuloDetalleCreateInput;
}
export interface UpdateArticuloDetalleMutationArgs {
  data: ArticuloDetalleUpdateInput;
  where: ArticuloDetalleWhereUniqueInput;
}
export interface UpdateManyArticuloDetallesMutationArgs {
  data: ArticuloDetalleUpdateInput;
  where?: ArticuloDetalleWhereInput | null;
}
export interface UpsertArticuloDetalleMutationArgs {
  where: ArticuloDetalleWhereUniqueInput;
  create: ArticuloDetalleCreateInput;
  update: ArticuloDetalleUpdateInput;
}
export interface DeleteArticuloDetalleMutationArgs {
  where: ArticuloDetalleWhereUniqueInput;
}
export interface DeleteManyArticuloDetallesMutationArgs {
  where?: ArticuloDetalleWhereInput | null;
}
export interface CreateMenuMutationArgs {
  data: MenuCreateInput;
}
export interface UpdateMenuMutationArgs {
  data: MenuUpdateInput;
  where: MenuWhereUniqueInput;
}
export interface UpdateManyMenusMutationArgs {
  data: MenuUpdateInput;
  where?: MenuWhereInput | null;
}
export interface UpsertMenuMutationArgs {
  where: MenuWhereUniqueInput;
  create: MenuCreateInput;
  update: MenuUpdateInput;
}
export interface DeleteMenuMutationArgs {
  where: MenuWhereUniqueInput;
}
export interface DeleteManyMenusMutationArgs {
  where?: MenuWhereInput | null;
}
export interface CreateProductoMutationArgs {
  data: ProductoCreateInput;
}
export interface UpdateProductoMutationArgs {
  data: ProductoUpdateInput;
  where: ProductoWhereUniqueInput;
}
export interface UpdateManyProductoesMutationArgs {
  data: ProductoUpdateInput;
  where?: ProductoWhereInput | null;
}
export interface UpsertProductoMutationArgs {
  where: ProductoWhereUniqueInput;
  create: ProductoCreateInput;
  update: ProductoUpdateInput;
}
export interface DeleteProductoMutationArgs {
  where: ProductoWhereUniqueInput;
}
export interface DeleteManyProductoesMutationArgs {
  where?: ProductoWhereInput | null;
}
export interface CreateRolMutationArgs {
  data: RolCreateInput;
}
export interface UpdateRolMutationArgs {
  data: RolUpdateInput;
  where: RolWhereUniqueInput;
}
export interface UpdateManyRolsMutationArgs {
  data: RolUpdateInput;
  where?: RolWhereInput | null;
}
export interface UpsertRolMutationArgs {
  where: RolWhereUniqueInput;
  create: RolCreateInput;
  update: RolUpdateInput;
}
export interface DeleteRolMutationArgs {
  where: RolWhereUniqueInput;
}
export interface DeleteManyRolsMutationArgs {
  where?: RolWhereInput | null;
}
export interface CreateUsuarioMutationArgs {
  data: UsuarioCreateInput;
}
export interface UpdateUsuarioMutationArgs {
  data: UsuarioUpdateInput;
  where: UsuarioWhereUniqueInput;
}
export interface UpdateManyUsuariosMutationArgs {
  data: UsuarioUpdateInput;
  where?: UsuarioWhereInput | null;
}
export interface UpsertUsuarioMutationArgs {
  where: UsuarioWhereUniqueInput;
  create: UsuarioCreateInput;
  update: UsuarioUpdateInput;
}
export interface DeleteUsuarioMutationArgs {
  where: UsuarioWhereUniqueInput;
}
export interface DeleteManyUsuariosMutationArgs {
  where?: UsuarioWhereInput | null;
}
export interface SignupMutationArgs {
  usuario: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
}
export interface RestablecerPasswordMutationArgs {
  usuario: string;
  email: string;
}
export interface ActualizarPasswordMutationArgs {
  token: string;
  password: string;
}
export interface ArticuloSubscriptionArgs {
  where?: ArticuloSubscriptionWhereInput | null;
}
export interface ArticuloDetalleSubscriptionArgs {
  where?: ArticuloDetalleSubscriptionWhereInput | null;
}
export interface MenuSubscriptionArgs {
  where?: MenuSubscriptionWhereInput | null;
}
export interface ProductoSubscriptionArgs {
  where?: ProductoSubscriptionWhereInput | null;
}
export interface RolSubscriptionArgs {
  where?: RolSubscriptionWhereInput | null;
}
export interface UsuarioSubscriptionArgs {
  where?: UsuarioSubscriptionWhereInput | null;
}

export enum ArticuloOrderByInput {
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  nombre_ASC = "nombre_ASC",
  nombre_DESC = "nombre_DESC",
  valor_ASC = "valor_ASC",
  valor_DESC = "valor_DESC",
  tiempo_preparacion_ASC = "tiempo_preparacion_ASC",
  tiempo_preparacion_DESC = "tiempo_preparacion_DESC",
  activo_ASC = "activo_ASC",
  activo_DESC = "activo_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC"
}

export enum ArticuloDetalleOrderByInput {
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  cantidad_ASC = "cantidad_ASC",
  cantidad_DESC = "cantidad_DESC",
  activo_ASC = "activo_ASC",
  activo_DESC = "activo_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC"
}

export enum MenuOrderByInput {
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  nombre_ASC = "nombre_ASC",
  nombre_DESC = "nombre_DESC",
  activo_ASC = "activo_ASC",
  activo_DESC = "activo_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC"
}

export enum ProductoOrderByInput {
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  nombre_ASC = "nombre_ASC",
  nombre_DESC = "nombre_DESC",
  valor_ASC = "valor_ASC",
  valor_DESC = "valor_DESC",
  stock_ASC = "stock_ASC",
  stock_DESC = "stock_DESC",
  activo_ASC = "activo_ASC",
  activo_DESC = "activo_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC"
}

export enum RolOrderByInput {
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  nombre_ASC = "nombre_ASC",
  nombre_DESC = "nombre_DESC",
  activo_ASC = "activo_ASC",
  activo_DESC = "activo_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC"
}

export enum UsuarioOrderByInput {
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  usuario_ASC = "usuario_ASC",
  usuario_DESC = "usuario_DESC",
  email_ASC = "email_ASC",
  email_DESC = "email_DESC",
  password_ASC = "password_ASC",
  password_DESC = "password_DESC",
  rol_ASC = "rol_ASC",
  rol_DESC = "rol_DESC",
  img_ASC = "img_ASC",
  img_DESC = "img_DESC",
  social_ASC = "social_ASC",
  social_DESC = "social_DESC",
  nombre_ASC = "nombre_ASC",
  nombre_DESC = "nombre_DESC",
  apellido_ASC = "apellido_ASC",
  apellido_DESC = "apellido_DESC",
  estado_ASC = "estado_ASC",
  estado_DESC = "estado_DESC",
  activo_ASC = "activo_ASC",
  activo_DESC = "activo_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC"
}

export enum MutationType {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DELETED = "DELETED"
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    articulo?: ArticuloResolver<Articulo | null, any, Context>;
    articuloes?: ArticuloesResolver<(Articulo | null)[], any, Context>;
    articuloesConnection?: ArticuloesConnectionResolver<
      ArticuloConnection,
      any,
      Context
    >;
    articulo_detalle?: ArticuloDetalleResolver<
      ArticuloDetalle | null,
      any,
      Context
    >;
    articulo_detalles?: ArticuloDetallesResolver<
      (ArticuloDetalle | null)[],
      any,
      Context
    >;
    articulo_detallesConnection?: ArticuloDetallesConnectionResolver<
      ArticuloDetalleConnection,
      any,
      Context
    >;
    menu?: MenuResolver<Menu | null, any, Context>;
    menus?: MenusResolver<(Menu | null)[], any, Context>;
    menusConnection?: MenusConnectionResolver<MenuConnection, any, Context>;
    producto?: ProductoResolver<Producto | null, any, Context>;
    productoes?: ProductoesResolver<(Producto | null)[], any, Context>;
    productoesConnection?: ProductoesConnectionResolver<
      ProductoConnection,
      any,
      Context
    >;
    rol?: RolResolver<Rol | null, any, Context>;
    rols?: RolsResolver<(Rol | null)[], any, Context>;
    rolsConnection?: RolsConnectionResolver<RolConnection, any, Context>;
    usuario?: UsuarioResolver<Usuario | null, any, Context>;
    usuarios?: UsuariosResolver<(Usuario | null)[], any, Context>;
    usuariosConnection?: UsuariosConnectionResolver<
      UsuarioConnection,
      any,
      Context
    >;
    node?: NodeResolver<Node | null, any, Context>;
    login?: LoginResolver<AuthPayload, any, Context>;
  }

  export type ArticuloResolver<
    R = Articulo | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ArticuloArgs>;
  export interface ArticuloArgs {
    where: ArticuloWhereUniqueInput;
  }

  export type ArticuloesResolver<
    R = (Articulo | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ArticuloesArgs>;
  export interface ArticuloesArgs {
    where?: ArticuloWhereInput | null;
    orderBy?: ArticuloOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type ArticuloesConnectionResolver<
    R = ArticuloConnection,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ArticuloesConnectionArgs>;
  export interface ArticuloesConnectionArgs {
    where?: ArticuloWhereInput | null;
    orderBy?: ArticuloOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type ArticuloDetalleResolver<
    R = ArticuloDetalle | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ArticuloDetalleArgs>;
  export interface ArticuloDetalleArgs {
    where: ArticuloDetalleWhereUniqueInput;
  }

  export type ArticuloDetallesResolver<
    R = (ArticuloDetalle | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ArticuloDetallesArgs>;
  export interface ArticuloDetallesArgs {
    where?: ArticuloDetalleWhereInput | null;
    orderBy?: ArticuloDetalleOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type ArticuloDetallesConnectionResolver<
    R = ArticuloDetalleConnection,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ArticuloDetallesConnectionArgs>;
  export interface ArticuloDetallesConnectionArgs {
    where?: ArticuloDetalleWhereInput | null;
    orderBy?: ArticuloDetalleOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type MenuResolver<
    R = Menu | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, MenuArgs>;
  export interface MenuArgs {
    where: MenuWhereUniqueInput;
  }

  export type MenusResolver<
    R = (Menu | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, MenusArgs>;
  export interface MenusArgs {
    where?: MenuWhereInput | null;
    orderBy?: MenuOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type MenusConnectionResolver<
    R = MenuConnection,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, MenusConnectionArgs>;
  export interface MenusConnectionArgs {
    where?: MenuWhereInput | null;
    orderBy?: MenuOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type ProductoResolver<
    R = Producto | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ProductoArgs>;
  export interface ProductoArgs {
    where: ProductoWhereUniqueInput;
  }

  export type ProductoesResolver<
    R = (Producto | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ProductoesArgs>;
  export interface ProductoesArgs {
    where?: ProductoWhereInput | null;
    orderBy?: ProductoOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type ProductoesConnectionResolver<
    R = ProductoConnection,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ProductoesConnectionArgs>;
  export interface ProductoesConnectionArgs {
    where?: ProductoWhereInput | null;
    orderBy?: ProductoOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type RolResolver<
    R = Rol | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RolArgs>;
  export interface RolArgs {
    where: RolWhereUniqueInput;
  }

  export type RolsResolver<
    R = (Rol | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RolsArgs>;
  export interface RolsArgs {
    where?: RolWhereInput | null;
    orderBy?: RolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type RolsConnectionResolver<
    R = RolConnection,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RolsConnectionArgs>;
  export interface RolsConnectionArgs {
    where?: RolWhereInput | null;
    orderBy?: RolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type UsuarioResolver<
    R = Usuario | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UsuarioArgs>;
  export interface UsuarioArgs {
    where: UsuarioWhereUniqueInput;
  }

  export type UsuariosResolver<
    R = (Usuario | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UsuariosArgs>;
  export interface UsuariosArgs {
    where?: UsuarioWhereInput | null;
    orderBy?: UsuarioOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type UsuariosConnectionResolver<
    R = UsuarioConnection,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UsuariosConnectionArgs>;
  export interface UsuariosConnectionArgs {
    where?: UsuarioWhereInput | null;
    orderBy?: UsuarioOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type NodeResolver<
    R = Node | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, NodeArgs>;
  export interface NodeArgs {
    id: string;
  }

  export type LoginResolver<
    R = AuthPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, LoginArgs>;
  export interface LoginArgs {
    usuario: string;
    password: string;
  }
}

export namespace ArticuloResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    nombre?: NombreResolver<string, any, Context>;
    valor?: ValorResolver<number, any, Context>;
    tiempo_preparacion?: TiempoPreparacionResolver<
      DateTime | null,
      any,
      Context
    >;
    menu?: MenuResolver<Menu, any, Context>;
    articulos_detalle?: ArticulosDetalleResolver<
      ArticuloDetalle[] | null,
      any,
      Context
    >;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NombreResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ValorResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TiempoPreparacionResolver<
    R = DateTime | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type MenuResolver<R = Menu, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ArticulosDetalleResolver<
    R = ArticuloDetalle[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ArticulosDetalleArgs>;
  export interface ArticulosDetalleArgs {
    where?: ArticuloDetalleWhereInput | null;
    orderBy?: ArticuloDetalleOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MenuResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    nombre?: NombreResolver<string, any, Context>;
    articulos?: ArticulosResolver<Articulo[] | null, any, Context>;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NombreResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ArticulosResolver<
    R = Articulo[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ArticulosArgs>;
  export interface ArticulosArgs {
    where?: ArticuloWhereInput | null;
    orderBy?: ArticuloOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ArticuloDetalleResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    cantidad?: CantidadResolver<number, any, Context>;
    producto?: ProductoResolver<Producto, any, Context>;
    articulo?: ArticuloResolver<Articulo, any, Context>;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CantidadResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ProductoResolver<
    R = Producto,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ArticuloResolver<
    R = Articulo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ProductoResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    nombre?: NombreResolver<string, any, Context>;
    valor?: ValorResolver<number, any, Context>;
    stock?: StockResolver<number, any, Context>;
    articulos_detalle?: ArticulosDetalleResolver<
      ArticuloDetalle[] | null,
      any,
      Context
    >;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NombreResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ValorResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type StockResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ArticulosDetalleResolver<
    R = ArticuloDetalle[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ArticulosDetalleArgs>;
  export interface ArticulosDetalleArgs {
    where?: ArticuloDetalleWhereInput | null;
    orderBy?: ArticuloDetalleOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }

  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ArticuloConnectionResolvers {
  export interface Resolvers<Context = any> {
    pageInfo?: PageInfoResolver<PageInfo, any, Context>;
    edges?: EdgesResolver<(ArticuloEdge | null)[], any, Context>;
    aggregate?: AggregateResolver<AggregateArticulo, any, Context>;
  }

  export type PageInfoResolver<
    R = PageInfo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EdgesResolver<
    R = (ArticuloEdge | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AggregateResolver<
    R = AggregateArticulo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PageInfoResolvers {
  export interface Resolvers<Context = any> {
    hasNextPage?: HasNextPageResolver<boolean, any, Context>;
    hasPreviousPage?: HasPreviousPageResolver<boolean, any, Context>;
    startCursor?: StartCursorResolver<string | null, any, Context>;
    endCursor?: EndCursorResolver<string | null, any, Context>;
  }

  export type HasNextPageResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type HasPreviousPageResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type StartCursorResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EndCursorResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ArticuloEdgeResolvers {
  export interface Resolvers<Context = any> {
    node?: NodeResolver<Articulo, any, Context>;
    cursor?: CursorResolver<string, any, Context>;
  }

  export type NodeResolver<
    R = Articulo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type CursorResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace AggregateArticuloResolvers {
  export interface Resolvers<Context = any> {
    count?: CountResolver<number, any, Context>;
  }

  export type CountResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace ArticuloDetalleConnectionResolvers {
  export interface Resolvers<Context = any> {
    pageInfo?: PageInfoResolver<PageInfo, any, Context>;
    edges?: EdgesResolver<(ArticuloDetalleEdge | null)[], any, Context>;
    aggregate?: AggregateResolver<AggregateArticuloDetalle, any, Context>;
  }

  export type PageInfoResolver<
    R = PageInfo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EdgesResolver<
    R = (ArticuloDetalleEdge | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AggregateResolver<
    R = AggregateArticuloDetalle,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ArticuloDetalleEdgeResolvers {
  export interface Resolvers<Context = any> {
    node?: NodeResolver<ArticuloDetalle, any, Context>;
    cursor?: CursorResolver<string, any, Context>;
  }

  export type NodeResolver<
    R = ArticuloDetalle,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type CursorResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace AggregateArticuloDetalleResolvers {
  export interface Resolvers<Context = any> {
    count?: CountResolver<number, any, Context>;
  }

  export type CountResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace MenuConnectionResolvers {
  export interface Resolvers<Context = any> {
    pageInfo?: PageInfoResolver<PageInfo, any, Context>;
    edges?: EdgesResolver<(MenuEdge | null)[], any, Context>;
    aggregate?: AggregateResolver<AggregateMenu, any, Context>;
  }

  export type PageInfoResolver<
    R = PageInfo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EdgesResolver<
    R = (MenuEdge | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AggregateResolver<
    R = AggregateMenu,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MenuEdgeResolvers {
  export interface Resolvers<Context = any> {
    node?: NodeResolver<Menu, any, Context>;
    cursor?: CursorResolver<string, any, Context>;
  }

  export type NodeResolver<R = Menu, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CursorResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace AggregateMenuResolvers {
  export interface Resolvers<Context = any> {
    count?: CountResolver<number, any, Context>;
  }

  export type CountResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace ProductoConnectionResolvers {
  export interface Resolvers<Context = any> {
    pageInfo?: PageInfoResolver<PageInfo, any, Context>;
    edges?: EdgesResolver<(ProductoEdge | null)[], any, Context>;
    aggregate?: AggregateResolver<AggregateProducto, any, Context>;
  }

  export type PageInfoResolver<
    R = PageInfo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EdgesResolver<
    R = (ProductoEdge | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AggregateResolver<
    R = AggregateProducto,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ProductoEdgeResolvers {
  export interface Resolvers<Context = any> {
    node?: NodeResolver<Producto, any, Context>;
    cursor?: CursorResolver<string, any, Context>;
  }

  export type NodeResolver<
    R = Producto,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type CursorResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace AggregateProductoResolvers {
  export interface Resolvers<Context = any> {
    count?: CountResolver<number, any, Context>;
  }

  export type CountResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace RolResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    nombre?: NombreResolver<string, any, Context>;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NombreResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace RolConnectionResolvers {
  export interface Resolvers<Context = any> {
    pageInfo?: PageInfoResolver<PageInfo, any, Context>;
    edges?: EdgesResolver<(RolEdge | null)[], any, Context>;
    aggregate?: AggregateResolver<AggregateRol, any, Context>;
  }

  export type PageInfoResolver<
    R = PageInfo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EdgesResolver<
    R = (RolEdge | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AggregateResolver<
    R = AggregateRol,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace RolEdgeResolvers {
  export interface Resolvers<Context = any> {
    node?: NodeResolver<Rol, any, Context>;
    cursor?: CursorResolver<string, any, Context>;
  }

  export type NodeResolver<R = Rol, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CursorResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace AggregateRolResolvers {
  export interface Resolvers<Context = any> {
    count?: CountResolver<number, any, Context>;
  }

  export type CountResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace UsuarioResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    usuario?: UsuarioResolver<string, any, Context>;
    email?: EmailResolver<string, any, Context>;
    password?: PasswordResolver<string, any, Context>;
    rol?: RolResolver<string, any, Context>;
    img?: ImgResolver<string | null, any, Context>;
    social?: SocialResolver<boolean | null, any, Context>;
    nombre?: NombreResolver<string | null, any, Context>;
    apellido?: ApellidoResolver<string | null, any, Context>;
    estado?: EstadoResolver<string, any, Context>;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UsuarioResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PasswordResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RolResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ImgResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type SocialResolver<
    R = boolean | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NombreResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ApellidoResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EstadoResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace UsuarioConnectionResolvers {
  export interface Resolvers<Context = any> {
    pageInfo?: PageInfoResolver<PageInfo, any, Context>;
    edges?: EdgesResolver<(UsuarioEdge | null)[], any, Context>;
    aggregate?: AggregateResolver<AggregateUsuario, any, Context>;
  }

  export type PageInfoResolver<
    R = PageInfo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EdgesResolver<
    R = (UsuarioEdge | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AggregateResolver<
    R = AggregateUsuario,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace UsuarioEdgeResolvers {
  export interface Resolvers<Context = any> {
    node?: NodeResolver<Usuario, any, Context>;
    cursor?: CursorResolver<string, any, Context>;
  }

  export type NodeResolver<R = Usuario, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CursorResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace AggregateUsuarioResolvers {
  export interface Resolvers<Context = any> {
    count?: CountResolver<number, any, Context>;
  }

  export type CountResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace AuthPayloadResolvers {
  export interface Resolvers<Context = any> {
    token?: TokenResolver<string, any, Context>;
    user?: UserResolver<Usuario, any, Context>;
  }

  export type TokenResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UserResolver<R = Usuario, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    createArticulo?: CreateArticuloResolver<Articulo, any, Context>;
    updateArticulo?: UpdateArticuloResolver<Articulo | null, any, Context>;
    updateManyArticuloes?: UpdateManyArticuloesResolver<
      BatchPayload,
      any,
      Context
    >;
    upsertArticulo?: UpsertArticuloResolver<Articulo, any, Context>;
    deleteArticulo?: DeleteArticuloResolver<Articulo | null, any, Context>;
    deleteManyArticuloes?: DeleteManyArticuloesResolver<
      BatchPayload,
      any,
      Context
    >;
    createArticulo_detalle?: CreateArticuloDetalleResolver<
      ArticuloDetalle,
      any,
      Context
    >;
    updateArticulo_detalle?: UpdateArticuloDetalleResolver<
      ArticuloDetalle | null,
      any,
      Context
    >;
    updateManyArticulo_detalles?: UpdateManyArticuloDetallesResolver<
      BatchPayload,
      any,
      Context
    >;
    upsertArticulo_detalle?: UpsertArticuloDetalleResolver<
      ArticuloDetalle,
      any,
      Context
    >;
    deleteArticulo_detalle?: DeleteArticuloDetalleResolver<
      ArticuloDetalle | null,
      any,
      Context
    >;
    deleteManyArticulo_detalles?: DeleteManyArticuloDetallesResolver<
      BatchPayload,
      any,
      Context
    >;
    createMenu?: CreateMenuResolver<Menu, any, Context>;
    updateMenu?: UpdateMenuResolver<Menu | null, any, Context>;
    updateManyMenus?: UpdateManyMenusResolver<BatchPayload, any, Context>;
    upsertMenu?: UpsertMenuResolver<Menu, any, Context>;
    deleteMenu?: DeleteMenuResolver<Menu | null, any, Context>;
    deleteManyMenus?: DeleteManyMenusResolver<BatchPayload, any, Context>;
    createProducto?: CreateProductoResolver<Producto, any, Context>;
    updateProducto?: UpdateProductoResolver<Producto | null, any, Context>;
    updateManyProductoes?: UpdateManyProductoesResolver<
      BatchPayload,
      any,
      Context
    >;
    upsertProducto?: UpsertProductoResolver<Producto, any, Context>;
    deleteProducto?: DeleteProductoResolver<Producto | null, any, Context>;
    deleteManyProductoes?: DeleteManyProductoesResolver<
      BatchPayload,
      any,
      Context
    >;
    createRol?: CreateRolResolver<Rol, any, Context>;
    updateRol?: UpdateRolResolver<Rol | null, any, Context>;
    updateManyRols?: UpdateManyRolsResolver<BatchPayload, any, Context>;
    upsertRol?: UpsertRolResolver<Rol, any, Context>;
    deleteRol?: DeleteRolResolver<Rol | null, any, Context>;
    deleteManyRols?: DeleteManyRolsResolver<BatchPayload, any, Context>;
    createUsuario?: CreateUsuarioResolver<Usuario, any, Context>;
    updateUsuario?: UpdateUsuarioResolver<Usuario | null, any, Context>;
    updateManyUsuarios?: UpdateManyUsuariosResolver<BatchPayload, any, Context>;
    upsertUsuario?: UpsertUsuarioResolver<Usuario, any, Context>;
    deleteUsuario?: DeleteUsuarioResolver<Usuario | null, any, Context>;
    deleteManyUsuarios?: DeleteManyUsuariosResolver<BatchPayload, any, Context>;
    signup?: SignupResolver<AuthPayload, any, Context>;
    restablecerPassword?: RestablecerPasswordResolver<Usuario, any, Context>;
    actualizarPassword?: ActualizarPasswordResolver<Usuario, any, Context>;
  }

  export type CreateArticuloResolver<
    R = Articulo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateArticuloArgs>;
  export interface CreateArticuloArgs {
    data: ArticuloCreateInput;
  }

  export type UpdateArticuloResolver<
    R = Articulo | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateArticuloArgs>;
  export interface UpdateArticuloArgs {
    data: ArticuloUpdateInput;
    where: ArticuloWhereUniqueInput;
  }

  export type UpdateManyArticuloesResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateManyArticuloesArgs>;
  export interface UpdateManyArticuloesArgs {
    data: ArticuloUpdateInput;
    where?: ArticuloWhereInput | null;
  }

  export type UpsertArticuloResolver<
    R = Articulo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpsertArticuloArgs>;
  export interface UpsertArticuloArgs {
    where: ArticuloWhereUniqueInput;
    create: ArticuloCreateInput;
    update: ArticuloUpdateInput;
  }

  export type DeleteArticuloResolver<
    R = Articulo | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteArticuloArgs>;
  export interface DeleteArticuloArgs {
    where: ArticuloWhereUniqueInput;
  }

  export type DeleteManyArticuloesResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteManyArticuloesArgs>;
  export interface DeleteManyArticuloesArgs {
    where?: ArticuloWhereInput | null;
  }

  export type CreateArticuloDetalleResolver<
    R = ArticuloDetalle,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateArticuloDetalleArgs>;
  export interface CreateArticuloDetalleArgs {
    data: ArticuloDetalleCreateInput;
  }

  export type UpdateArticuloDetalleResolver<
    R = ArticuloDetalle | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateArticuloDetalleArgs>;
  export interface UpdateArticuloDetalleArgs {
    data: ArticuloDetalleUpdateInput;
    where: ArticuloDetalleWhereUniqueInput;
  }

  export type UpdateManyArticuloDetallesResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateManyArticuloDetallesArgs>;
  export interface UpdateManyArticuloDetallesArgs {
    data: ArticuloDetalleUpdateInput;
    where?: ArticuloDetalleWhereInput | null;
  }

  export type UpsertArticuloDetalleResolver<
    R = ArticuloDetalle,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpsertArticuloDetalleArgs>;
  export interface UpsertArticuloDetalleArgs {
    where: ArticuloDetalleWhereUniqueInput;
    create: ArticuloDetalleCreateInput;
    update: ArticuloDetalleUpdateInput;
  }

  export type DeleteArticuloDetalleResolver<
    R = ArticuloDetalle | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteArticuloDetalleArgs>;
  export interface DeleteArticuloDetalleArgs {
    where: ArticuloDetalleWhereUniqueInput;
  }

  export type DeleteManyArticuloDetallesResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteManyArticuloDetallesArgs>;
  export interface DeleteManyArticuloDetallesArgs {
    where?: ArticuloDetalleWhereInput | null;
  }

  export type CreateMenuResolver<
    R = Menu,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateMenuArgs>;
  export interface CreateMenuArgs {
    data: MenuCreateInput;
  }

  export type UpdateMenuResolver<
    R = Menu | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateMenuArgs>;
  export interface UpdateMenuArgs {
    data: MenuUpdateInput;
    where: MenuWhereUniqueInput;
  }

  export type UpdateManyMenusResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateManyMenusArgs>;
  export interface UpdateManyMenusArgs {
    data: MenuUpdateInput;
    where?: MenuWhereInput | null;
  }

  export type UpsertMenuResolver<
    R = Menu,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpsertMenuArgs>;
  export interface UpsertMenuArgs {
    where: MenuWhereUniqueInput;
    create: MenuCreateInput;
    update: MenuUpdateInput;
  }

  export type DeleteMenuResolver<
    R = Menu | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteMenuArgs>;
  export interface DeleteMenuArgs {
    where: MenuWhereUniqueInput;
  }

  export type DeleteManyMenusResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteManyMenusArgs>;
  export interface DeleteManyMenusArgs {
    where?: MenuWhereInput | null;
  }

  export type CreateProductoResolver<
    R = Producto,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateProductoArgs>;
  export interface CreateProductoArgs {
    data: ProductoCreateInput;
  }

  export type UpdateProductoResolver<
    R = Producto | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateProductoArgs>;
  export interface UpdateProductoArgs {
    data: ProductoUpdateInput;
    where: ProductoWhereUniqueInput;
  }

  export type UpdateManyProductoesResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateManyProductoesArgs>;
  export interface UpdateManyProductoesArgs {
    data: ProductoUpdateInput;
    where?: ProductoWhereInput | null;
  }

  export type UpsertProductoResolver<
    R = Producto,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpsertProductoArgs>;
  export interface UpsertProductoArgs {
    where: ProductoWhereUniqueInput;
    create: ProductoCreateInput;
    update: ProductoUpdateInput;
  }

  export type DeleteProductoResolver<
    R = Producto | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteProductoArgs>;
  export interface DeleteProductoArgs {
    where: ProductoWhereUniqueInput;
  }

  export type DeleteManyProductoesResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteManyProductoesArgs>;
  export interface DeleteManyProductoesArgs {
    where?: ProductoWhereInput | null;
  }

  export type CreateRolResolver<
    R = Rol,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateRolArgs>;
  export interface CreateRolArgs {
    data: RolCreateInput;
  }

  export type UpdateRolResolver<
    R = Rol | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateRolArgs>;
  export interface UpdateRolArgs {
    data: RolUpdateInput;
    where: RolWhereUniqueInput;
  }

  export type UpdateManyRolsResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateManyRolsArgs>;
  export interface UpdateManyRolsArgs {
    data: RolUpdateInput;
    where?: RolWhereInput | null;
  }

  export type UpsertRolResolver<
    R = Rol,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpsertRolArgs>;
  export interface UpsertRolArgs {
    where: RolWhereUniqueInput;
    create: RolCreateInput;
    update: RolUpdateInput;
  }

  export type DeleteRolResolver<
    R = Rol | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteRolArgs>;
  export interface DeleteRolArgs {
    where: RolWhereUniqueInput;
  }

  export type DeleteManyRolsResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteManyRolsArgs>;
  export interface DeleteManyRolsArgs {
    where?: RolWhereInput | null;
  }

  export type CreateUsuarioResolver<
    R = Usuario,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateUsuarioArgs>;
  export interface CreateUsuarioArgs {
    data: UsuarioCreateInput;
  }

  export type UpdateUsuarioResolver<
    R = Usuario | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateUsuarioArgs>;
  export interface UpdateUsuarioArgs {
    data: UsuarioUpdateInput;
    where: UsuarioWhereUniqueInput;
  }

  export type UpdateManyUsuariosResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateManyUsuariosArgs>;
  export interface UpdateManyUsuariosArgs {
    data: UsuarioUpdateInput;
    where?: UsuarioWhereInput | null;
  }

  export type UpsertUsuarioResolver<
    R = Usuario,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpsertUsuarioArgs>;
  export interface UpsertUsuarioArgs {
    where: UsuarioWhereUniqueInput;
    create: UsuarioCreateInput;
    update: UsuarioUpdateInput;
  }

  export type DeleteUsuarioResolver<
    R = Usuario | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteUsuarioArgs>;
  export interface DeleteUsuarioArgs {
    where: UsuarioWhereUniqueInput;
  }

  export type DeleteManyUsuariosResolver<
    R = BatchPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteManyUsuariosArgs>;
  export interface DeleteManyUsuariosArgs {
    where?: UsuarioWhereInput | null;
  }

  export type SignupResolver<
    R = AuthPayload,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SignupArgs>;
  export interface SignupArgs {
    usuario: string;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
  }

  export type RestablecerPasswordResolver<
    R = Usuario,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RestablecerPasswordArgs>;
  export interface RestablecerPasswordArgs {
    usuario: string;
    email: string;
  }

  export type ActualizarPasswordResolver<
    R = Usuario,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ActualizarPasswordArgs>;
  export interface ActualizarPasswordArgs {
    token: string;
    password: string;
  }
}

export namespace BatchPayloadResolvers {
  export interface Resolvers<Context = any> {
    count?: CountResolver<Long, any, Context>;
  }

  export type CountResolver<R = Long, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace SubscriptionResolvers {
  export interface Resolvers<Context = any> {
    articulo?: ArticuloResolver<
      ArticuloSubscriptionPayload | null,
      any,
      Context
    >;
    articulo_detalle?: ArticuloDetalleResolver<
      ArticuloDetalleSubscriptionPayload | null,
      any,
      Context
    >;
    menu?: MenuResolver<MenuSubscriptionPayload | null, any, Context>;
    producto?: ProductoResolver<
      ProductoSubscriptionPayload | null,
      any,
      Context
    >;
    rol?: RolResolver<RolSubscriptionPayload | null, any, Context>;
    usuario?: UsuarioResolver<UsuarioSubscriptionPayload | null, any, Context>;
    roles?: RolesResolver<Rol | null, any, Context>;
    usuarios?: UsuariosResolver<Usuario | null, any, Context>;
  }

  export type ArticuloResolver<
    R = ArticuloSubscriptionPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ArticuloArgs>;
  export interface ArticuloArgs {
    where?: ArticuloSubscriptionWhereInput | null;
  }

  export type ArticuloDetalleResolver<
    R = ArticuloDetalleSubscriptionPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ArticuloDetalleArgs>;
  export interface ArticuloDetalleArgs {
    where?: ArticuloDetalleSubscriptionWhereInput | null;
  }

  export type MenuResolver<
    R = MenuSubscriptionPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, MenuArgs>;
  export interface MenuArgs {
    where?: MenuSubscriptionWhereInput | null;
  }

  export type ProductoResolver<
    R = ProductoSubscriptionPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ProductoArgs>;
  export interface ProductoArgs {
    where?: ProductoSubscriptionWhereInput | null;
  }

  export type RolResolver<
    R = RolSubscriptionPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RolArgs>;
  export interface RolArgs {
    where?: RolSubscriptionWhereInput | null;
  }

  export type UsuarioResolver<
    R = UsuarioSubscriptionPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UsuarioArgs>;
  export interface UsuarioArgs {
    where?: UsuarioSubscriptionWhereInput | null;
  }

  export type RolesResolver<
    R = Rol | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UsuariosResolver<
    R = Usuario | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ArticuloSubscriptionPayloadResolvers {
  export interface Resolvers<Context = any> {
    mutation?: MutationResolver<MutationType, any, Context>;
    node?: NodeResolver<Articulo | null, any, Context>;
    updatedFields?: UpdatedFieldsResolver<string[] | null, any, Context>;
    previousValues?: PreviousValuesResolver<
      ArticuloPreviousValues | null,
      any,
      Context
    >;
  }

  export type MutationResolver<
    R = MutationType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NodeResolver<
    R = Articulo | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UpdatedFieldsResolver<
    R = string[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PreviousValuesResolver<
    R = ArticuloPreviousValues | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ArticuloPreviousValuesResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    nombre?: NombreResolver<string, any, Context>;
    valor?: ValorResolver<number, any, Context>;
    tiempo_preparacion?: TiempoPreparacionResolver<
      DateTime | null,
      any,
      Context
    >;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NombreResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ValorResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TiempoPreparacionResolver<
    R = DateTime | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ArticuloDetalleSubscriptionPayloadResolvers {
  export interface Resolvers<Context = any> {
    mutation?: MutationResolver<MutationType, any, Context>;
    node?: NodeResolver<ArticuloDetalle | null, any, Context>;
    updatedFields?: UpdatedFieldsResolver<string[] | null, any, Context>;
    previousValues?: PreviousValuesResolver<
      ArticuloDetallePreviousValues | null,
      any,
      Context
    >;
  }

  export type MutationResolver<
    R = MutationType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NodeResolver<
    R = ArticuloDetalle | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UpdatedFieldsResolver<
    R = string[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PreviousValuesResolver<
    R = ArticuloDetallePreviousValues | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ArticuloDetallePreviousValuesResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    cantidad?: CantidadResolver<number, any, Context>;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CantidadResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MenuSubscriptionPayloadResolvers {
  export interface Resolvers<Context = any> {
    mutation?: MutationResolver<MutationType, any, Context>;
    node?: NodeResolver<Menu | null, any, Context>;
    updatedFields?: UpdatedFieldsResolver<string[] | null, any, Context>;
    previousValues?: PreviousValuesResolver<
      MenuPreviousValues | null,
      any,
      Context
    >;
  }

  export type MutationResolver<
    R = MutationType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NodeResolver<
    R = Menu | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UpdatedFieldsResolver<
    R = string[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PreviousValuesResolver<
    R = MenuPreviousValues | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MenuPreviousValuesResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    nombre?: NombreResolver<string, any, Context>;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NombreResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ProductoSubscriptionPayloadResolvers {
  export interface Resolvers<Context = any> {
    mutation?: MutationResolver<MutationType, any, Context>;
    node?: NodeResolver<Producto | null, any, Context>;
    updatedFields?: UpdatedFieldsResolver<string[] | null, any, Context>;
    previousValues?: PreviousValuesResolver<
      ProductoPreviousValues | null,
      any,
      Context
    >;
  }

  export type MutationResolver<
    R = MutationType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NodeResolver<
    R = Producto | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UpdatedFieldsResolver<
    R = string[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PreviousValuesResolver<
    R = ProductoPreviousValues | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ProductoPreviousValuesResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    nombre?: NombreResolver<string, any, Context>;
    valor?: ValorResolver<number, any, Context>;
    stock?: StockResolver<number, any, Context>;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NombreResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ValorResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type StockResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace RolSubscriptionPayloadResolvers {
  export interface Resolvers<Context = any> {
    mutation?: MutationResolver<MutationType, any, Context>;
    node?: NodeResolver<Rol | null, any, Context>;
    updatedFields?: UpdatedFieldsResolver<string[] | null, any, Context>;
    previousValues?: PreviousValuesResolver<
      RolPreviousValues | null,
      any,
      Context
    >;
  }

  export type MutationResolver<
    R = MutationType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NodeResolver<
    R = Rol | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UpdatedFieldsResolver<
    R = string[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PreviousValuesResolver<
    R = RolPreviousValues | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace RolPreviousValuesResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    nombre?: NombreResolver<string, any, Context>;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NombreResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace UsuarioSubscriptionPayloadResolvers {
  export interface Resolvers<Context = any> {
    mutation?: MutationResolver<MutationType, any, Context>;
    node?: NodeResolver<Usuario | null, any, Context>;
    updatedFields?: UpdatedFieldsResolver<string[] | null, any, Context>;
    previousValues?: PreviousValuesResolver<
      UsuarioPreviousValues | null,
      any,
      Context
    >;
  }

  export type MutationResolver<
    R = MutationType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NodeResolver<
    R = Usuario | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UpdatedFieldsResolver<
    R = string[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PreviousValuesResolver<
    R = UsuarioPreviousValues | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace UsuarioPreviousValuesResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    usuario?: UsuarioResolver<string, any, Context>;
    email?: EmailResolver<string, any, Context>;
    password?: PasswordResolver<string, any, Context>;
    rol?: RolResolver<string, any, Context>;
    img?: ImgResolver<string | null, any, Context>;
    social?: SocialResolver<boolean | null, any, Context>;
    nombre?: NombreResolver<string | null, any, Context>;
    apellido?: ApellidoResolver<string | null, any, Context>;
    estado?: EstadoResolver<string, any, Context>;
    activo?: ActivoResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UsuarioResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PasswordResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RolResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ImgResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type SocialResolver<
    R = boolean | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NombreResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ApellidoResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EstadoResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ActivoResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

import { Injectable } from "@angular/core";

import * as Apollo from "apollo-angular";

import gql from "graphql-tag";
