import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useHistory } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const StyledBlogPostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //const history = useHistory();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const response = await axios.get(
  //       );
  //       setPost(response.data.articles[0]);
  //     } catch (error) {
  //       console.error('Error fetching post:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchPost();
  // }, []);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(id)}&apiKey=96f0a2104ee9417e8abb8d6452d6bda3`
        );
        setPost(response.data.articles[0]);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  if (!post) return <div>Post not found.</div>;

  return (
    // <div>
    //   <Button onClick={() => history.push('/')}>Back</Button>
    //   <Typography variant="h3">{post.title}</Typography>
    //   <Typography variant="body1">{new Date(post.publishedAt).toLocaleDateString()}</Typography>
    //   <Typography variant="body1">{post.content}</Typography>
    //   {post.urlToImage && <img src={post.urlToImage} alt={post.title} />}
    // </div>
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" p="3%">
      <Card style={{ width: '100%' }}>
        {post.urlToImage && (
          <CardMedia
            component="img"
            image={post.urlToImage}
            alt={post.title}
            style={{ width: '60%', objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
            {post.content}
          </Typography>
        </CardContent>
      </Card>
      <IconButton onClick={() => navigate('/')} color="primary" style={{ position: 'absolute', top: '20px', left: '40px' }}>
        <ArrowBackIcon />
      </IconButton>
    </Box>
  );
};

export default StyledBlogPostDetails;
