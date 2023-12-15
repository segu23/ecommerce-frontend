import { Pagination } from "@nextui-org/pagination";
import ProductCardSkeleton from "./productCardSkeleton";
import ProductCard from "./productCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/ProductServices";
import { PaginationResponse, Product } from "@/types";
import Swal from "sweetalert2";

export default function Products(){
	const [products, setProducts] = useState<PaginationResponse<Product>>();
	const searchParams = useSearchParams()
	const pathname = usePathname();
	const router = useRouter();

	const productToSearch = searchParams.get("search");

	const pageParamString: string | null = searchParams.get("page");
	const pageParam: number = pageParamString ? parseInt(pageParamString) : 1;
    
	useEffect(() => {
		getProducts(productToSearch, pageParam - 1, 3)
			.then(productsPage => {
				setProducts(productsPage)
			})
			.catch(error => {
				Swal.fire({
					title: "Ha ocurrido un error",
					text: error,
					icon: "error"
				});
			});
	}, []);

    return(
        <>
        {products ? 
            <>
                <div className="flex gap-8 flex-wrap">
                    {products.content.map((item) => (
                        <ProductCard item={item} key={item.name} />
                    ))}
                </div>
                <Pagination className="self-center my-10" isCompact showControls total={products?.totalPages} initialPage={products.pageable.pageNumber + 1} onChange={page => {
                    const current = new URLSearchParams(Array.from(searchParams.entries()));
                    current.set("page", `${page}`);
                    const search = current.toString();
                    const query = search ? `?${search}` : "";
        
                    router.push(`${pathname}${query}`);
                    window.location.href = `${pathname}${query}`;
                }}/>
            </>
        :
            <></>
        }
        </>
    )
}