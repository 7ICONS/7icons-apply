import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const APPLY_AUTH_COOKIE =
  "7icons-apply-auth";

export async function createClient() {
  const cookieStore = await cookies();

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables.",
    );
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookieOptions: {
        name: APPLY_AUTH_COOKIE,
      },

      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(
              ({
                name,
                value,
                options,
              }) => {
                cookieStore.set(
                  name,
                  value,
                  options,
                );
              },
            );
          } catch {
            /*
             * setAll can be called from a Server
             * Component where cookies cannot be
             * written.
             *
             * Session refresh will be handled by
             * the application proxy.
             */
          }
        },
      },
    },
  );
}