import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { FaCamera } from 'react-icons/fa';

const CreatePostForm = ({ content, setContent, postSubmit, handleImage, uploading, image }) => {
  
  const fileInput = React.useRef(null);

  
  const openFileDialog = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group">
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
          onClick={postSubmit} 
          className="btn btn-primary btn-sm mt-1"
        >
          Post
        </button>

        <div>
          {image && image.url ? (
            <img 
              alt="User avatar"
              src={image.url} 
              className="avatar img-fluid rounded-circle mt-1" 
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
            accept="images/*" 
            hidden 
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
