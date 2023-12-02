"use client"

import ProductCard from "@/components/productCard";
import { Product } from "@/types";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
	{
		title: "Celulares y Teléfonos",
		amount: 454,
		url: "#",
	}
]
export default function DocsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const searchParams = useSearchParams()

	useEffect(() => {
		const productToSearch = searchParams.get("search");
		axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/search?name=${productToSearch != undefined ? productToSearch : ""}`)
			.then((response: any) => {
				setProducts(response.data)
			})
	}, []);

	return (
		<div className="flex">
			<aside className="hidden sm:block pr-[20px] grow">
				<div>
					<h2 className="font-bold text-base mt-[32px] mb-[10px]">Todas</h2>
					<p className="text-sm mb-[6px]">
						<a>10.000 productos</a>
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
			<div className="flex gap-8 flex-wrap w-[928px]">
				{products.map((item) => (
					<ProductCard item={item} key={item.name} />
				))}
			</div>
		</div>
	)
}
