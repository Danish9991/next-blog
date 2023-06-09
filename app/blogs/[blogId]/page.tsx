import {getCurrentUser} from "@/app/actions/getCurrentUser"
import {getBlogsById} from "../../actions/getBlogsById"
import SingleBlog from "@/components/SingleBlog";
import BlogId from "@/components/blogId";

interface IParams {
    blogId:string,
}

export default async function page({params}:{params:IParams}) {

    const blog  = await getBlogsById(params)
    const currentUser = await getCurrentUser();

    const date = blog?.createdAt
 
  return (

    <div className="">
        <div>
        <BlogId
          name={blog?.name}
          description={blog?.description}
          blogId={blog?.id}
          imageSrc={blog?.imageSrc}
        />
      </div>
    </div>
  )
}