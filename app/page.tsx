import Image from "next/image";
import { getCurrentUser } from "./actions/getCurrentUser";
import { getBlogs } from "./actions/getBlogs";
import SingleBlog from "@/components/SingleBlog";

export default async function Home() {

  const currentUser = await getCurrentUser();
  const blogs = await getBlogs();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
        {blogs.map((item:any) => (
          <SingleBlog
          key={item.id}
          data={item}
          currentUser={currentUser}
          />
        ))}
    </main>
  )
}
