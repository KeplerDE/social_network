import React, { useContext, useState } from 'react';
import UserRoute from '../../components/routes/UserRoute';
import { UserContext } from '../../context';
import CreatePostForm from '../../components/forms/CreatePostForm';
import { useRouter, UserRouter } from 'next/router'
import axios from 'axios';
import { toast } from 'react-toastify'

const Dashboard = () => {
  const state = useContext(UserContext);

  const [content, setContent] = useState("");
  const [ image, setImage ] = useState({});
  const [uploading, setUploading ] = useState(false);

  // route
  const router = useRouter();

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
        // Sending a POST request to create a post
        const { data } = await axios.post("/create-post", { content, image });
        console.log("Create post response => ", data);
        // Checking if there's an error in the response
        if (data.error) {
            // If there's an error, show error message
            toast.error(data.error);
        } else {
            // If no error, show success message and reset content
            toast.success("Post created...");
            setContent("");
        }
    } catch (err) {
        // If an error occurs during the request, log it
        console.log(err);
        // Show a generic error message to the user
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
  // console.log("uploaded image => ", data);
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

