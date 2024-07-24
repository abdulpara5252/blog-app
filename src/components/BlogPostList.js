import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostItem from './BlogPostItem';
import { Pagination, CircularProgress, Box } from '@mui/material';
import '../css/BlogPostList.css';
import FadeIn from 'react-fade-in';

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const option = {
  //     root: null,
  //     rootMargin: '20px',
  //     threshold: 1.0
  //   };
  //   const currentObserver = observer.current;
  //   if (currentObserver) {
  //     currentObserver.disconnect();
  //   }
  //   const newObserver = new IntersectionObserver(handleObserver, option);
  //   if (observer.current) {
  //     newObserver.observe(observer.current);
  //   }
  //   observer.current = newObserver;
  // }, [handleObserver]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=technology&apiKey=96f0a2104ee9417e8abb8d6452d6bda3&page=${currentPage}`
        );
        setPosts(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / 20)); // Assuming 20 results per page
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); 
      }
    };
    fetchPosts();
  }, [currentPage]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  return (
    <div className="blog-post-list">
      <FadeIn>
        {posts.map((post, index) => (
          <BlogPostItem key={index} post={post} />
        ))}
      </FadeIn>
      <div className="pagination-container">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default BlogPostList;
