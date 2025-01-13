/* eslint-disable react/no-unescaped-entities */
import { useParams } from "react-router-dom"
import { BlogCard } from ".."
import { Link } from "react-router-dom"
import { useEffect,useState } from "react";
import DatabaseService from "@/Appwrite/appWriteConfig";

function SearchPage() {
    const { search } = useParams();




    const [posts, setPosts] = useState([]);
    useEffect(() => {
        DatabaseService.searchPosts({search}).then((post) => {
            if (post) {
                setPosts(post.documents);
            }
        });
    }, [search]);
    console.log(search);
    
    console.log(posts);
    
  return (
    <div className='min-h-screen mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        <h1 className='text-3xl font-bold '>Search Results for "{search}"</h1>
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

export default SearchPage