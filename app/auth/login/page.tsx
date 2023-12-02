"use client"

import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function LoginPage() {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter()

	function sendLogin() {
		axios.post('http://localhost:8080/auth/login', {
			email: email,
			password: password,
			twoFactorCode: ""
		})
			.then(function (response) {
				console.log(response.data.user)
				localStorage.setItem("token", response.data.token)
				localStorage.setItem("userData", JSON.stringify(response.data.user))
				router.push("/profile")
			})
			.catch(function (error) {
				Swal.fire({
					title: "Ha ocurrido un error",
					text: error.response.data.error,
					icon: "error"
				});
			});
	}

	return (
		<>
			<h1 className="text-5xl">Iniciar sesión</h1>
			<Input type="email" label="Email" onChange={e => setEmail(e.target.value)} />
			<div>
				<Input
					label="Contraseña"
					endContent={
						<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
							{isVisible ? (
								<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
							) : (
								<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
							)}
						</button>
					}
					type={isVisible ? "text" : "password"}
					onChange={e => setPassword(e.target.value)}
				/>
				<div className="text-right">
					<Link href="/">Olvidé mi contraseña</Link>
				</div>

			</div>
			<Button className="bg-white rounded-lg border-2 hover:bg-blue-400 hover:border-blue-400 hover:scale-105 transition-all" onClick={sendLogin}>
				Iniciar sesión
			</Button>
		</>
	)
}
