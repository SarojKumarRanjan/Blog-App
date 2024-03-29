import  { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatabaseService from "@/Appwrite/appWriteConfig";
import { Container } from "..";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            DatabaseService.getPost(slug).then((post) => {
               // console.log(post);
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
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
        
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                        src={DatabaseService.getFilePreview(post.imageId)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgcolor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button  onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
        
    ) : null;
}
