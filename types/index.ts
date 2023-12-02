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