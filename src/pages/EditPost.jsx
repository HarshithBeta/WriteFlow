import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import appwriteService from "../appwrite/config";

const EditPost = () => {
  const [post, setPost] = useState();
  const { slug } = useParams();  
  const navigate = useNavigate();

  useEffect(() => {
    
    if (slug) {
      console.log("Slug from URL:", slug);  
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          console.log("Fetched post:", post);  
          setPost(post);
        } else {
          console.error("Post not found for slug:", slug);
          navigate("/");  
        }
      });
    }
  }, [slug, navigate]);

  return (
    <div className="py-6">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
