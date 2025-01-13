import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatabaseService from "@/Appwrite/appWriteConfig";
import { Container } from "..";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { ArrowBigLeft } from "lucide-react";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      DatabaseService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    DatabaseService.deletePost(post.$id).then((status) => {
      if (status) {
        DatabaseService.deleteFile(post.imageId);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 mt-16">
      <Container>

        
        
        <div className="w-full flex justify-center mb-8 relative">
          <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-lg relative">
          <Button className="mb-4">
            <Link className="flex items-center gap-2" to="/all-post">
                <ArrowBigLeft size={24} />
            Back</Link>
        </Button>
            <img
              src={DatabaseService.getFilePreview(post.imageId)}
              alt={post.title}
              className="w-full  object-cover" 
            />

            
            {isAuthor && (
              <div className="absolute right-6 top-6 flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition duration-300">
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={deletePost}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-300"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Title Section */}
        <div className="w-full max-w-5xl mx-auto mb-8">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="text-sm mt-2">
            Posted on: {new Date(post.$createdAt).toLocaleDateString()} | Last
            updated: {new Date(post.$updatedAt).toLocaleDateString()}
          </p>
        </div>

        
        <div className="w-full max-w-5xl mx-auto prose prose-lg">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
