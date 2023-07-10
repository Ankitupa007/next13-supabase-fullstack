import 'server-only';
import SupabaseListener from './auth/supabaseListener'
import SupabaseProvider from './auth/supabaseProvider'
import Login from './auth/login/page';
import './globals.css';
import { createServerClient } from '@/lib/supabaseServerClient';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import AuthenticatedApp from './authenticatedApp/page';

export type TypedSupabaseClient = SupabaseClient;

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { session }
  } = await supabase.auth.getSession();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          {session ? children : <Login />}
        </SupabaseProvider>
      </body>
    </html>
  );
}