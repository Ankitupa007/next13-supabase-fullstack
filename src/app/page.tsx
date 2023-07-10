import Login from './auth/login/page'
import { cookies } from 'next/headers'
import AuthenticatedApp from './authenticatedApp/page'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { type } from 'os'


export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  // const { data: { posts }, error } = await supabase.from('posts').select('*')
  // console.log(posts)
  return (
    <>
      <AuthenticatedApp  />
    </>)
}
