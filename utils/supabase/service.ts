import type { Database } from "@/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

export const createClient = () => {
	const cookieStore = (cookies() as unknown as UnsafeUnwrappedCookies);

	return createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.SERVICE_ROLE,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						// biome-ignore lint/complexity/noForEach: <explanation>
						cookiesToSet.forEach(({ name, value, options }) => {
							cookieStore.set(name, value, options);
						});
					} catch (error) {
						// The `set` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);
};
