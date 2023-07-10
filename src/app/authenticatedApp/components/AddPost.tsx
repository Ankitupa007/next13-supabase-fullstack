'use client'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createBrowserClient } from "@/lib/supabaseBrowserClient"
export default function AddPost() {
  const [newPost, setNewPost] = useState<any>(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    async function onSubmit(event: React.SyntheticEvent) {
      event.preventDefault()
      const { data, error } = await supabase
        .from('posts')
        .insert([
          { title: newPost }
        ])
        .select()
      console.log("new Post", data)
    }

  }, [newPost])

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="post" placeholder="Name of your project" value={newPost} onChange={(e) => setNewPost(e.currentTarget.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Post</Button>
      </CardFooter>
    </Card>
  )
}
