// import {useState,useEffect} from 'react'
import {BlogCard,Container} from ".."
// import DatabaseService from '@/Appwrite/appWriteConfig'
import useGetpost from '@/utils/useGetpost'
import { useSelector } from 'react-redux'

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
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
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