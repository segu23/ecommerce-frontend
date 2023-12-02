import { BackendErrorResponse, LoginResponse, RegisterResponse } from "@/types";
import axios, { AxiosResponse } from "axios";

export function login(email: string, password: string, twoFactorCode: string): Promise<LoginResponse>{
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`, {
			email: email,
			password: password,
			twoFactorCode: twoFactorCode
        })
            .then((response: AxiosResponse) => {
                resolve(response.data as LoginResponse);
            })
            .catch((error: BackendErrorResponse) => {
                console.error('Error on login:', error);
                reject(new Error(error.error));
            });
    });
}

export function register(email: string, password: string, name: string, firstName: string, lastName: string): Promise<RegisterResponse>{
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register`, {
			email: email,
			password: password,
			name: name,
			firstName: firstName,
			lastName: lastName,
        })
            .then((response: AxiosResponse) => {
                resolve(response.data as RegisterResponse);
            })
            .catch((error: BackendErrorResponse) => {
                console.error('Error on register:', error);
                reject(new Error(error.error));
            });
    });
}