import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

export default function ProductCardSkeleton() {
    return (
        <Card shadow="sm" isPressable style={{ width: "288px", height: "auto" }}>
            <CardBody className="overflow-visible p-0">
                <Skeleton className="rounded-lg h-[360px] shadow-small">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
            </CardBody>
            <CardFooter className="p-[20px] block h-[144px]" style={{ textAlign: "start" }}>
                <Skeleton className="w-2/5 rounded-lg h-[15px] my-1">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg h-[22px] my-2">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg h-[18px] my-1">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardFooter>
        </Card>
    )
}