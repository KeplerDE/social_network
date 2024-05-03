import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import 'react-quill/dist/quill.snow.css'; 
import { FaCamera } from 'react-icons/fa';

// Импортируйте ReactQuill динамически и укажите, что его не следует рендерить на сервере
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

const CreatePostForm = ({ content, setContent, postSubmit, handleImage, uploading, image }) => {
  const fileInput = useRef(null);

  const openFileDialog = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postSubmit();
  };

  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group" onSubmit={handleSubmit}>
          <ReactQuill 
            theme="snow" 
            value={content}
            onChange={setContent}
            placeholder="Write something..."
          />
        </form>
      </div>

      <div className="card-footer d-flex justify-content-between text-muted">
        <button 
          disabled={!content}
          onClick={handleSubmit} 
          className="btn btn-primary btn-sm mt-1"
          type="submit"
        >
          Post
        </button>

        <div>
          {image && image.url ? (
            <img 
              alt="User avatar"
              src={image.url} 
              className="img-fluid rounded-circle mt-1" 
              style={{ width: '30px', height: '30px' }}
            />
          ) : uploading ? (
            <div className="spinner-border text-primary mt-2" role="status">
              <span className="visually-hidden">Uploading...</span>
            </div>
          ) : (
            <button 
              type="button" 
              className="btn btn-outline-secondary mt-2" 
              onClick={openFileDialog}
            >
              <FaCamera />
            </button>
          )}
          <input 
            ref={fileInput}
            onChange={handleImage} 
            type="file" 
            accept="image/*" 
            hidden 
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
