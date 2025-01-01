import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogDetail.css'; // Assuming you're using an external CSS file for styles

const apiUrl = process.env.REACT_APP_API_URL;

interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
  };
}

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const currentUserId = parseInt(localStorage.getItem('userId') || '0');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://blogapp-backend-bn79.onrender.com/blog/view/${id}`);
        setBlog(response.data.blog);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://blogapp-backend-bn79.onrender.com/blog/delete/${id}`, {
        data: { userId: currentUserId }
      });
      navigate('/');
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!blog) return <div className="not-found">Blog not found</div>;

  const isAuthor = currentUserId === blog.author.id;

  return (
    <>
      <article className="blog-detail-container">
        <div className="header">
          <h1 className="blog-title">{blog.title}</h1>
          {isAuthor && (
            <div className="action-buttons">
              <button 
                onClick={() => navigate(`/edit-blog/${id}`)}
                className="edit-btn"
              >
                Edit
              </button>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="meta-info">
          <p className="author">By {blog.author.username}</p>
          <p className="created-at">{new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="content">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="paragraph">{paragraph}</p>
          ))}
        </div>
      </article>

      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2 className="modal-title">Confirm Delete</h2>
            <p className="modal-message">Are you sure you want to delete this blog post?</p>
            <div className="modal-actions">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="confirm-btn"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
