"use client"

import Loader from "@/components/loader";
import ProductCard from "@/components/productCard";
import ProductCardSkeleton from "@/components/productCardSkeleton";
import { getProducts } from "@/services/ProductServices";
import { PaginationResponse, Product } from "@/types";
import { Card } from "@nextui-org/card";
import { Pagination } from "@nextui-org/pagination";
import { CircularProgress } from "@nextui-org/progress";
import { Skeleton } from "@nextui-org/skeleton";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Badge } from "@nextui-org/badge";
import { NotificationIcon } from "@/components/notificationIcon";

const categories = [
	{
		title: "Celulares y Teléfonos",
		amount: 454,
		url: "#",
	}
]

const ProductsComponent = dynamic(() => import('../../components/products'), {
	ssr: false,
	loading: () => <ProductCardSkeleton />
})

const getBaseClasses = () => {
	return ["before:bg-default-200"];
  };
  
  const getContentClasses = () => {
	return [
	  "py-3 px-4 border border-default-200",
	  "bg-gradient-to-br from-white to-default-300",
	  "dark:from-default-100 dark:to-default-50",
	];
  };
  

export default function DocsPage() {
	const [products, setProducts] = useState<PaginationResponse<Product>>();
	const searchParams = useSearchParams()

	const pathname = usePathname();

	const productToSearch = searchParams.get("search");
	const router = useRouter();

	const pageParamString: string | null = searchParams.get("page");
	const pageParam: number = pageParamString ? parseInt(pageParamString) : 1;

	return (
		<div className="flex">
			<aside className="hidden sm:block pr-[20px] grow">
				<div>
					<h2 className="font-bold text-base mt-[32px] mb-[10px]">{productToSearch ?? "Todas"}</h2>
					<p className="text-sm mb-[6px]">
						<a>{products?.totalElements} productos</a>
					</p>
				</div>
				<div>
					<h2 className="font-bold text-base mt-[32px] mb-[10px]">Categorías</h2>
					<ol>
						{categories.map((category) => (
							<li className="text-sm mb-[6px]" key={category.title}>
								<a href={category.url}>{category.title}<span className="text-slate-400"> ({category.amount})</span></a>
							</li>
						))}
					</ol>
				</div>
			</aside>

			<div className="flex flex-col w-[928px] justify-center">
				<ProductsComponent />
			</div>
			{/*(products !== undefined && products.content.length > 0) ?
				:
				<div className="flex w-[928px] justify-center">
					{products == undefined ?
						<>
							<ProductCardSkeleton />
							<ProductCardSkeleton />
						</>
						:
						<span>No hay productos para mostrar.</span>
					}
				</div>
				*/}
		</div>
	)
}
