import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const CreatePostForm = ({ content, setContent, postSubmit }) => {
    return (
        <div className="card">
            <div className="card-body pb-3">
                <form className="form-group">

                    <ReactQuill 
                        theme="snow" 
                        value={content}
                        onChange={setContent} // ReactQuill уже предоставляет чистый HTML, поэтому нет необходимости использовать e.target.value
                        placeholder="Write something..."
                    />
                </form>
            </div>

            <div className="card-footer">
                <button 
                    disabled={!content}
                    onClick={postSubmit} 
                    className="btn btn-primary btn-sm mt-1">Post</button>
            </div>
        </div>
    );
};

export default CreatePostForm;
