import { BackendErrorResponse, PaginationResponse, Product } from "@/types";
import axios, { AxiosResponse } from "axios";

export function getProducts(name: string | undefined, page: number, amount: number): Promise<PaginationResponse<Product>>{
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/search?name=${name !== undefined ? name : ""}&page=${page}&amount=${amount}`)
            .then((response: AxiosResponse) => {
                resolve(response.data as PaginationResponse<Product>);
            })
            .catch((error: BackendErrorResponse) => {
                console.error('Error fetching products:', error);
                reject(new Error(error.error));
            });
    });
}


