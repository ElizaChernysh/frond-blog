import React, {useEffect} from 'react';
import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { MainPage } from './pages/MainPage';
import { MyPostsPage } from './pages/MyPostsPage';
import { PostPage } from './pages/PostPage';
import { AddPostPage } from './pages/AddPostPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { EditPostPage } from './pages/EditPostPage';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/features/auth/authSlice';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='posts' element={<MyPostsPage/>} />
        <Route path=':id' element={<PostPage/>} />
        <Route path=':id/edit' element={<EditPostPage/>} />
        <Route path='new' element={<AddPostPage/>} />
        <Route path='register' element={<RegisterPage/>} />
        <Route path='login' element={<LoginPage/>} />
      </Routes>

      <ToastContainer position='botton-right'/>
    </Layout>
  );
}

export default App;
