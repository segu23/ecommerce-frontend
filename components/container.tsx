export default function Container({
	children,
}: {
	children: React.ReactNode;
}){
    return (<section className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</section>)
}