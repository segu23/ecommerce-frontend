"use client"
import React from "react";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Product } from "@/types";
import { Image } from "@nextui-org/image";

export default function ProductCard({ item }: { item: Product }) {
	let argentinianPeso = new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS',
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});

	return (
		<Card shadow="sm" key={item.name} isPressable style={{ width: "288px", height: "504px" }}>
			<CardBody className="overflow-visible p-0 h-[360px]">
				<Image
					shadow="sm"
					radius="lg"
					width="100%"
					height="200px"
					className="w-full object-cover"
					src="https://nextui.org/images/fruit-1.jpeg"
				/>
			</CardBody>
			<CardFooter className="p-[20px] block h-[144px]" style={{ textAlign: "start",  }}>
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
	)
}