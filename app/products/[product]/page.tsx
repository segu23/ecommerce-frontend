"use client"

import { Product } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductPage({ params }: { params: { product: string } }){
    const [products, setProducts] = useState<Product>();
    
	useEffect(() => {
		axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/search?name=${params.product}`)
			.then((response: any) => {
				setProducts(response.data[0])
                console.log(products)
			})
	}, []);
    return (
        <></>
    )
}