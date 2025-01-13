
import {BlogCard} from ".."

import useGetpost from "@/utils/useGetpost"
import { Link } from "react-router-dom"


import {  useSelector } from "react-redux"


function AllPost() {
  



    useGetpost()
 


  const posts = useSelector((state) => state.posts.posts)

   //console.log(posts);

   
  return (
    <div className='min-h-screen mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {posts.map((post) => (
                      <div key={post.id} className="flex">
                        <Link 
                          to={`/post/${post.id}`} 
                          className="w-full "
                        >
                          <BlogCard {...post} />
                        </Link>
                      </div>
                    ))}
                  </div>
        
                  {posts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">No posts found</p>
                    </div>
                  )}
    </div>
  )
}

export default AllPost