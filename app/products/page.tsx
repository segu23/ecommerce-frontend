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
		axios.get(`http://localhost:8080/products/search?name=${productToSearch != undefined ? productToSearch : ""}`)
			.then(response => {
				setProducts(response.data)
			})
	}, []);

	let argentinianPeso = new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS',
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});

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
					<Card shadow="sm" key={item.name} isPressable style={{ width: "288px", height: "auto" }}>
						<CardBody className="overflow-visible p-0">
							<Image
								shadow="sm"
								radius="lg"
								width="100%"
								height="200px"
								className="w-full object-cover h-100"
								src="https://nextui.org/images/fruit-1.jpeg"
							/>
						</CardBody>
						<CardFooter className="p-[20px] block" style={{textAlign: "start"}}>

							<s>
								<span>{argentinianPeso.format(item.price)}</span>
							</s>
							<div className="text-2xl flex items-center">
								<span>{argentinianPeso.format(item.price)}</span>
								<span className="text-base pl-[4px] text-emerald-600">55% OFF</span>
							</div>
							<div>
								<p className="line-clamp-2">{item.name}</p>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}
