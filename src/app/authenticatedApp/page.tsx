'use client'
import { createBrowserClient } from '@/lib/supabaseBrowserClient';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Loading from './components/Loading';
import AddPost from './components/AddPost';
async function AuthenticatedApp(props: any | null) {
  // const [posts, setPosts] = useState<any>([])
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const supabase = createClientComponentClient()
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div >
      <AddPost />
    </>
  );
}

export default AuthenticatedApp;