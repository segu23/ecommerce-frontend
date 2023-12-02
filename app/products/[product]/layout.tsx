import Container from "@/components/container";

export default function ProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Container>
			{children}
		</Container>
	);
}