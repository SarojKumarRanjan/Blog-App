import DatabaseService from "@/Appwrite/appWriteConfig"
import {BlogCard,Container} from ".."
import { useState,useEffect } from "react"

function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    DatabaseService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
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