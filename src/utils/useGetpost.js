import DatabaseService from "@/Appwrite/appWriteConfig"
import { useEffect } from "react"
import { addPosts} from "@/Store/postSlice"
import {  useDispatch } from "react-redux"






function useGetpost() {

    //console.log("useget gets called");

    const dispatch = useDispatch()

    
    useEffect(() => {
        DatabaseService.getPosts([]).then((post) => {
            if (post) {
                
                dispatch(addPosts(post.documents));
                
            }
            
        });
         
       

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    

 
}

export default useGetpost