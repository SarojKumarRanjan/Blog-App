import { Link } from "react-router-dom"
import DatabaseService from "../Appwrite/appWriteConfig"
import parse from "html-react-parser";


import {
    Card,
    CardContent,
    // eslint-disable-next-line no-unused-vars
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

// eslint-disable-next-line react/prop-types
function BlogCard({$id,title,imageId,content}) {

  const Content  = parse(content)
  return (
<Link to={`/post/${$id}`}>
   <Card>
    <CardHeader>
    <img src={DatabaseService.getFilePreview(imageId)} alt={title} />

    <CardTitle>
         {title}
        </CardTitle>
    </CardHeader>
     <CardContent>
     
        </CardContent>
        <CardFooter>
        <CardDescription>
          {Content}
        </CardDescription>
        </CardFooter>
     
   </Card>

   </Link>
  )
}

export default BlogCard