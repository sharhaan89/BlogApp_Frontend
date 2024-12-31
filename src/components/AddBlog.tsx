import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddBlog.css';

const apiUrl = process.env.REACT_APP_API_URL;

const AddBlog = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleAddBlog = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            setError('Both title and content are required.');
            return;
        }

        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User not logged in.');
            return;
        }

        try {
            const response = await axios.post(
                `${apiUrl}/blog/create`,
                { title, content, userId }
            );

            navigate('/blog/viewall');
        } catch (err) {
            setError('Failed to add blog. Please try again.');
        }
    };

    return (
        <div className="add-blog-container">
            <h2 className="form-title">Add New Blog</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleAddBlog} className="blog-form">
                <div className="input-group">
                    <label className="label">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label className="label">Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="textarea-field"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Add Blog
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
