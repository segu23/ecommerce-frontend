import { Card } from "@nextui-org/card";

export default function ProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 h-full">
			<div className="bg-sky-500 hidden lg:block">

			</div>
			<div className="flex justify-center">
				<section className="w-[90%] sm:w-[60%] m-auto">
					<Card className="bg-white gap-4 p-8 w-full text-center">
						{children}
					</Card>
				</section>
			</div>
		</section>
	);
}