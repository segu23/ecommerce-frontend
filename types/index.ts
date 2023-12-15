import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  name: string;
  role: string;
  twoFactorEnabled: boolean;
}

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  price: number;
  stock: number;
}

export type BackendErrorResponse = {
  error: string;
}

export type LoginResponse = {
  user: User;
  token: string;
}

export type RegisterResponse = {
  user: User;
}

export type Pageable = {
  sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
  };
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export type PaginationResponse<T> = {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
