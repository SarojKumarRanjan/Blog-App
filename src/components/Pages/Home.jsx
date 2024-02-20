// import {useState,useEffect} from 'react'
import {BlogCard,Container} from ".."
// import DatabaseService from '@/Appwrite/appWriteConfig'
import useGetpost from '@/utils/useGetpost'
import { useSelector } from 'react-redux'
import Shimmer from "@/utils/Shimmer"

function Home()  {
    /* const [posts, setPosts] = useState([])

    useEffect(() => {
        DatabaseService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, []) */

    useGetpost()

    const posts = useSelector((state) => state.posts.posts)

  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <Shimmer/>
                </Container>
            </div>
        )
    }
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

export default Home