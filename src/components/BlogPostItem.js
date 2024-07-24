import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const BlogPostItem = ({ post }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h5">
          <Link to={`/post/${encodeURIComponent(post.title)}`}>{post.title}</Link>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(post.publishedAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">{post.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default BlogPostItem;
