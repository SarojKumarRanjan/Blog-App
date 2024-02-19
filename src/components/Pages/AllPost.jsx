// import DatabaseService from "@/Appwrite/appWriteConfig"
import {BlogCard,Container} from ".."
// import { useState,useEffect } from "react"
import useGetpost from "@/utils/useGetpost"


import {  useSelector } from "react-redux"


function AllPost() {
   /*  const [posts, setPosts] = useState([])
    useEffect(() => {
        DatabaseService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, []) */




    useGetpost()
 


  const posts = useSelector((state) => state.posts.posts)

   //console.log(posts);
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    
                   
                    <div key={post.$id} className='p-2 w-1/4'>
                        <BlogCard {...post} />
                    </div>
                    
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPost