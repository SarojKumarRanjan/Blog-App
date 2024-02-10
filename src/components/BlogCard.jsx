import { Link } from "react-router-dom"
import DatabaseService from "../Appwrite/appWriteConfig"


import {
    Card,
    CardContent,
    // eslint-disable-next-line no-unused-vars
    CardDescription,
    
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

// eslint-disable-next-line react/prop-types
function BlogCard({$id,title,postImage}) {
  return (
<Link to={`/post/${$id}`}>
   <Card>
    <CardHeader>
    <img src={DatabaseService.getFilePreview(postImage)} alt={title} />
    </CardHeader>
     <CardContent>
        <CardTitle>
         <h2>{title}</h2>
        </CardTitle>
     
     </CardContent>
   </Card>

   </Link>
  )
}

export default BlogCard