"use client"

import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios, { Axios } from "axios";
import Link from "next/link";
import { setegid } from "process";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function SignUpPage() {
	const [isVisible, setIsVisible] = useState(false);

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");

	const toggleVisibility = () => setIsVisible(!isVisible);

	function sendRegister(){
		axios.post('http://localhost:8080/auth/register', {
			email: email,
			password: password,
			name: name,
			firstName: firstName,
			lastName: lastName,
		  })
		  .then(function (response) {
			console.log(response);
		  })
		  .catch(function (error) {
			console.log(error.response.data)
			Swal.fire({
				title: "Ha ocurrido un error",
				text: error.response.data.error,
				icon: "error"
			});
		  });
	}

	return (
		<>
			<h1 className="text-5xl">Registro</h1>
			<Input type="email" label="Email" required onChange={e => setEmail(e.target.value)} />
			<Input type="text" label="Usuario" required onChange={e => setName(e.target.value)} />
			<Input type="text" label="Nombre" required onChange={e => setFirstName(e.target.value)} />
			<Input type="text" label="Apellido" required onChange={e => setLastName(e.target.value)} />
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
			<Button className="bg-white rounded-lg border-2 hover:bg-blue-400 hover:border-blue-400 hover:scale-105 transition-all" onClick={sendRegister}>Registrarse</Button>
		</>
	)
}
