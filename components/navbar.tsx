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

import { useEffect, useState } from "react";
import { User as UserType } from "@/types";
import { User } from "@nextui-org/user";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export const Navbar = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userData, setUserData] = useState<UserType>();
	const [focusing, setFocusing] = useState(false);
	let typingTimeout: any = null;
	const [actualSearchResponse, setActualSearchResponse] = useState([]);

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
							axios.get(`http://localhost:8080/products/search?name=${value}`)
								.then(response => {
									setActualSearchResponse(response.data.map((item: any) => item.name))
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
		<NextUINavbar maxWidth="xl">
			<NavbarBrand>
				<Link href="/products" className="text-black"><p className="font-bold text-inherit">segulibre</p></Link>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4 flex-col pt-3">
				{searchInput}
			</NavbarContent>
			<NavbarContent justify="end">
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
