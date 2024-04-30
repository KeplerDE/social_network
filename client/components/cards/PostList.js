import React from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { FaUserCircle } from 'react-icons/fa';



const PostList = ({ posts }) => {
  return (
    <>
      {posts && posts.map((post) => (
        <div key={post._id} className="card mb-5">
          <div className="card-header">
            {post.postedBy && post.postedBy.name ? (
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'gray', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1rem' }}>
                {post.postedBy.name[0]}
              </div>
            ) : (
              <FaUserCircle size={40} className="mb-2" /> 
            )}
            <span className="pt-2 ml-3">{post.postedBy ? post.postedBy.name : 'Аноним'}{' '}</span>
            <span className="pt-2 ml-3">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="card-body">{renderHTML(post.content)}</div>
          <div className="card-footer">
            {post.image && post.image.url && (
              <img
                src={post.image.url}
                alt={post.postedBy ? post.postedBy.name : 'Аноним'}
                className="img-fluid"
              />
            )}
            <div className="pt-3">Like / unlike 3 Likes 2 comments</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostList;

