import { Link } from "react-router-dom"
import DatabaseService from "../Appwrite/appWriteConfig"
import parse from "html-react-parser";


import {
    Card,
    CardContent,
    // eslint-disable-next-line no-unused-vars
    CardDescription,
    
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

// eslint-disable-next-line react/prop-types
function BlogCard({$id,title,imageId,content}) {
  return (
<Link to={`/post/${$id}`}>
   <Card>
    <CardHeader>
    <img src={DatabaseService.getFilePreview(imageId)} alt={title} />
    </CardHeader>
     <CardContent>
        <CardTitle>
         <h2>{title}</h2>
        </CardTitle>
        <CardDescription>
          {parse(content)}
        </CardDescription>
     </CardContent>
   </Card>

   </Link>
  )
}

export default BlogCard