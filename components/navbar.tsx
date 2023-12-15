"use client"

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
	NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import {
	SearchIcon,
} from "@/components/icons";
import { HiMail } from "react-icons/hi";
import { useEffect, useState } from "react";
import { User as UserType } from "@/types";
import { User } from "@nextui-org/user";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/services/ProductServices";
import { ThemeSwitch } from "./theme-switch";
import { Badge } from "@nextui-org/badge";
import { NotificationIcon } from "./notificationIcon";
import { CartIcon } from "./cartIcon";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Notification from "./notification";


const notifications = [
	{
		"icon": <HiMail/>		,
		"title": "Hoy Especial Deco Navideña 🎄",
		"description": "Los mejores Adornos, Arbolitos, Bebidas y Cajas Navideñas con descuentos INCREÍBLES y Envío en 24 hs 🛵💨 ¡Ideal para las fiestas!",
		"date": "",
		"readState": true
	},
	{
		"icon": <HiMail/>		,
		"title": "Cuponazos Navideños 🎁🎄",
		"description": "Aprovechá HOY $5.000 OFF en TVs y $3.000 OFF en Parlantes seleccionados + hasta 30% OFF + Hasta 9 CUOTAS sin interés 🔥 ",
		"date": "",
		"readState": false
	},

]

export const Navbar = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userData, setUserData] = useState<UserType>();
	const [focusing, setFocusing] = useState(false);
	let typingTimeout: any = null;
	const [actualSearchResponse, setActualSearchResponse] = useState([] as string[]);

	const searchParams = useSearchParams();
	const searchText = searchParams.get("search");
	const [value, setValue] = useState<string>(searchText != null ? searchText : "");

	useEffect(() => {
		const cachedUserData = localStorage.getItem("userData");
		if (cachedUserData != null) {
			setUserData(JSON.parse(cachedUserData))
			setLoggedIn(true);
		}
	}, [])

	const searchInput = (
		<>
			<Input
				aria-label="Search"
				classNames={{
					inputWrapper: "bg-default-100",
					input: "text-sm",
				}}
				endContent={
					<Kbd className="hidden lg:inline-block" keys={["enter"]} />
				}
				labelPlacement="outside"
				placeholder="Search..."
				startContent={
					<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
				}
				onKeyDown={e => {
					if (value.trim() !== "" && e.code == "Enter") {
						window.location.href = (`/products?search=${encodeURIComponent(value.trim())}`);
					}
				}}
				value={`${value}`}
				onValueChange={e => {
					setValue(e);
					clearTimeout(typingTimeout)
					typingTimeout = setTimeout(() => {
						if (e == "") {
							setActualSearchResponse([])
						} else {
							getProducts(e, 0, 5)
								.then(productsResponse => {
									setActualSearchResponse(productsResponse.content.map((item: any) => item.name))
								})
						}
					}, 350)
				}
				}
				onBlur={e => setFocusing(false)}
				onFocus={e => setFocusing(true)}
				type="search"
			/>
			{focusing == true && actualSearchResponse.length > 0 ?
				<div style={{ position: "relative", display: "block", top: "-31px", background: "white", zIndex: "-1", paddingTop: "15px", width: "100%", borderRadius: "15px" }}>
					<ul>
						{actualSearchResponse.map((name) =>
							<li style={{ padding: "5px 10px" }} key={name}>
								<Link href={`/products?search=${name}`}>{name}</Link>
							</li>
						)}
					</ul>
				</div>
				:
				<></>
			}
		</>
	);

	return (
		<NextUINavbar maxWidth="xl" isBordered>
			<NavbarBrand>
				<Link href="/products"><p className="font-bold text-inherit">segulibre</p></Link>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4 flex-col pt-3">
				{searchInput}
			</NavbarContent>
			<NavbarContent justify="end">
				<ThemeSwitch />
				{loggedIn ?
					<>
						<User
							name={userData?.firstName + " " + userData?.lastName}
							description={(
								<Link href="/profile" size="sm" isExternal>
									@{userData?.name}
								</Link>
							)}
							avatarProps={{
								src: "https://avatars.githubusercontent.com/u/30373425?v=4"
							}}
						/>
						<div className="flex items-center gap-3">
							<Popover placement="bottom-end">
								<PopoverTrigger>
									<button className="outline-none">
										<Badge color="danger" content={5} shape="circle">
											<NotificationIcon className="fill-current" size={30} />
										</Badge>
									</button>
								</PopoverTrigger>
								<PopoverContent>
									<div >
										<span>Notificaciones</span>
									</div>
									{notifications.map((notification) => <Notification data={notification} />)}
								</PopoverContent>
							</Popover>
							<Popover placement="bottom-end">
								<PopoverTrigger>
									<button className="outline-none">
										<Badge color="danger" content={50} shape="circle">
											<CartIcon size={30} />
										</Badge>
									</button>
								</PopoverTrigger>
								<PopoverContent>
									{notifications.map((notification) => <Notification data={notification} />)}
								</PopoverContent>
							</Popover>
						</div>
					</>
					:
					<>
						<NavbarItem className="flex">
							<Link href="/auth/login">Login</Link>
						</NavbarItem>
						<NavbarItem>
							<Button as={Link} color="primary" href="/auth/sign-up" variant="flat">
								Sign Up
							</Button>
						</NavbarItem>
					</>
				}
			</NavbarContent>
		</NextUINavbar>
	);
};
