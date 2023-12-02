"use client"

import { Product } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductPage({ params }: { params: { product: string } }){
    const [products, setProducts] = useState<Product>();
    
	useEffect(() => {
		axios.get(`http://localhost:8080/products/search?name=${params.product}`)
			.then(response => {
				setProducts(response.data[0])
                console.log(products)
			})
	}, []);
    return (
        <></>
    )
}