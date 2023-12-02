"use client"
import React from "react";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { Product } from "@/types";

export default function ProductCard({item} : {item: Product}) {
    return (
        <a href={`/products/${item.name}`} className="bg-white rounded-md border-1 border-slate-300 w-72 text-sm transition-all hover:shadow-lg">
            <Image
                width="100"
                alt={item.name}
                className="w-full object-cover h-72 rounded-t-md"
                height="100"
                src="/celu.webp"
            />
            <div className="p-[20px]">
                <s>
                    <span>{item.price}</span>
                </s>
                <div className="text-2xl flex items-center">
                    <span>{item.price}</span>
                    <span className="text-base pl-[4px] text-emerald-600">{item.discount}</span>
                </div>
                <div>
                    <p className="line-clamp-2">{item.name}</p>
                </div>
            </div>
        </a>
    )
}

function getShortedString(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;

    let amount = 0;
    let words = text.split(' ');
    let index = 0;
    while (amount < maxLength) {
        amount += words[index].length;
        amount++;
        index++;
    }
    return text.slice(0, amount - 1) + "...";
}