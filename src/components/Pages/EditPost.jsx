import { useState,useEffect } from "react"
import { Container,PostForm } from ".."
import DatabaseService from "@/Appwrite/appWriteConfig"
import { useParams,useNavigate } from "react-router-dom"
function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            DatabaseService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8 mt-16'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost