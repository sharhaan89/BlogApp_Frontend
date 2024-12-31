import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogList.css';

const apiUrl = process.env.REACT_APP_API_URL;

interface Blog {
    id: string;
    title: string;
    authorId: string;
    authorName: string;  // Added authorName
    createdAt: string;
}

const BlogList = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${apiUrl}/blog/viewall`);
                setBlogs(response.data);
            } catch (err) {
                setError('Failed to fetch blogs.');
            }
        };

        fetchBlogs();
    }, []);

    const handleCardClick = (id: string) => {
        navigate(`/blog/view/${id}`);
    };

    return (
        <div className="blog-list-container">
            <h2 className="blog-list-title">All Blogs</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="blog-cards-container">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="blog-card"
                        onClick={() => handleCardClick(blog.id)}
                    >
                        <h3 className="blog-card-title">{blog.title}</h3>
                        <p className="blog-card-author">Author: {blog.authorName}</p>
                        <p className="blog-card-date">Created At: {new Date(blog.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;