"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { signUpAction } from "@/utils/actions/auth";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SubmitButton } from "@/components/submit-button";
import { startTransition } from "react";

export function SignUp() {
	const [state, formAction] = useFormState(signUpAction, null);

	const clientAction = (formData: FormData) => {
		startTransition(() => {
			formAction(formData);

			if (state?.message !== null && state?.message !== undefined) {
				toast(state.message);
				return;
			}

			if (state?.error !== null && state?.error !== undefined) {
				toast(state.error);
				return;
			}
		});



		return;
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="grid gap-4" action={clientAction}>
					<small
						className={cn(
							"text-xs",
							state?.error
								? "text-red-500"
								: state?.message
									? "text-green-500"
									: null,
						)}
					>
						{state?.error ? state.error : state?.message ? state.message : null}
					</small>
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="first-name">First name</Label>
							<Input
								name="first_name"
								id="first-name"
								placeholder="Max"
								required
							/>
							{state?.errors?.first_name?.map((error) => (
								<small key={error} className="text-xs text-red-500">
									{error}
								</small>
							))}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last-name">Last name</Label>
							<Input
								id="last-name"
								name="last_name"
								placeholder="Robinson"
								required
							/>
							{state?.errors?.last_name?.map((error) => (
								<small key={error} className="text-xs text-red-500">
									{error}
								</small>
							))}
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="m@example.com"
							required
						/>
						{state?.errors?.email?.map((error) => (
							<small key={error} className="text-xs text-red-500">
								{error}
							</small>
						))}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" name="password" type="password" />
						{state?.errors?.password?.map((error) => (
							<small key={error} className="text-xs text-red-500">
								{error}
							</small>
						))}
					</div>
					<SubmitButton type="submit" className="w-full">
						Create an account
					</SubmitButton>
				</form>
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<Link href="/login" className="underline">
						Sign in
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
