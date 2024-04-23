import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { FaCamera } from 'react-icons/fa'

const CreatePostForm = ({ content, setContent, postSubmit, handleImage }) => {
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
                    <label>
                        <FaCamera className="mt-3" />
                        <input onChange={handleImage} type='file' accept='images/*' hidden/>
                    </label>
            </div>
        </div>
    );
};

export default CreatePostForm;
