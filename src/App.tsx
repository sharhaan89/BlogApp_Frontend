import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.tsx';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import AddBlog from './components/AddBlog.tsx';
import BlogList from './components/BlogList.tsx';
import BlogDetail from './components/BlogDetail.tsx';
import EditBlog from "./components/EditBlog.tsx";

const App = () => {
  console.log("server rendered");
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/blog/create/" element={<AddBlog />} />
          <Route path="/blog/viewall" element={<BlogList />} />
          <Route path="/blog/view/:id" element={<BlogDetail />} />
          <Route path="/blog/update/:id" element={<EditBlog />} />
        </Routes>
      </Router>
    </div>
  );
};


export default App;
