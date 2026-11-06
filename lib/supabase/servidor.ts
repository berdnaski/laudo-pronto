import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/** Cliente com a sessão do usuário (cookies). */
export async function supabaseDoUsuario() {
  const store = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => store.getAll(),
        setAll: (lista) => {
          try {
            lista.forEach(({ name, value, options }) => store.set(name, value, options));
          } catch {
            // Chamado de um Server Component: o refresh acontece no navegador.
          }
        },
      },
    },
  );
}

/** Cliente administrativo — só no servidor. Nunca importar em componente "use client". */
export function supabaseAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
