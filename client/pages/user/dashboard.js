import React, { useContext, useState, useEffect } from 'react';
import UserRoute from '../../components/routes/UserRoute';
import { UserContext } from '../../context';
import CreatePostForm from '../../components/forms/CreatePostForm';
import { useRouter, UserRouter } from 'next/router'
import axios from 'axios';
import { toast } from 'react-toastify'
import PostList from '../../components/cards/PostList'


const Dashboard = () => {
  const state = useContext(UserContext);

  const [content, setContent] = useState("");
  const [ image, setImage ] = useState({});
  const [uploading, setUploading ] = useState(false);
  const [posts, setPosts ] = useState([]);
  
  // route
  const router = useRouter();

  //
  useEffect(() => {
    fetchUserPosts();
  }, []);
  
  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get("/user-posts");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };
  

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
        // Включаем информацию о пользователе в тело запроса
        const postData = {
            content: content,
            image: image,
            postedBy: state.state.user._id  // Отправляем ID пользователя
        };

        const { data } = await axios.post("/create-post", postData);
        console.log("Create post response => ", data);
        // Проверяем на наличие ошибок в ответе
        if (data.error) {
            toast.error(data.error);
        } else {
            fetchUserPosts();  // Обновляем список постов
            toast.success("Post created...");
            setContent("");
            setImage({});
        }
    } catch (err) {
        console.log(err);
        toast.error("Something went wrong. Please try again.");
    }
};



const handleImage = async (e) => {
  const file = e.target.files[0];
  let formData = new FormData();
  formData.append("image", file);
  setUploading(true);
  try {
  const { data } = await axios.post("/upload-image", formData);
  console.log("uploaded image => ", data);
  setImage({
    url: data.url,
    public_id: data.public_id,
  })
  setUploading(false);
  } catch (err) {
  console.log(err);
  setUploading(false);
  }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>News Feed</h1>
          </div>
        </div>

        <div className='row py-3'>
          <div className='col-md-8'>
            <CreatePostForm 
            content={content} 
            setContent={setContent} 
            postSubmit={postSubmit}
            handleImage={handleImage}
            uploading={uploading}
            image={image}
            />
            <PostList posts={posts}/>
          </div>

          

          <div className='col-md-4'> 
            Sidebar
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Dashboard;

