import { Link } from "react-router-dom"
import DatabaseService from "../Appwrite/appWriteConfig"
import parse from "html-react-parser";





  {/* <Link to={`/post/${$id}`}>
   <Card className="h-[350]" >
    <CardHeader>
    <img src={DatabaseService.getFilePreview(imageId)} alt={title} />

    <CardTitle>
         {title}
        </CardTitle>
    </CardHeader>
     <CardContent>
     {Content}
        </CardContent>
        <CardFooter>
        <CardDescription>
          Read more....
        </CardDescription>
        </CardFooter>
     
   </Card>

   </Link> */}
  

// eslint-disable-next-line react/prop-types
function BlogCard({$id,title,imageId,content}) {

   const Content  = parse(content) 
  return (
    <Link 
    to={`/post/${$id}`}
    className="block w-full overflow-hidden"
  >
    <div className="flex flex-col h-[500px]">
      <div className="h-[300px] overflow-hidden">
        <img
          src={DatabaseService.getFilePreview(imageId)}
          alt={title}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
      
      <div className="flex flex-col mt-1">
        <h2 className="text-lg font-semibold line-clamp-2 mb-2 ">
          {title}
        </h2>
        <p className="text-sm  line-clamp-4">
          {Content}
        </p>
      </div>
    </div>
  </Link>
  )
}

export default BlogCard