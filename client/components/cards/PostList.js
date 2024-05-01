import React, { useContext } from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { FaUserCircle, FaThumbsUp, FaComment, FaEdit, FaTrashAlt } from 'react-icons/fa';
import PostImage from '../images/PostImage';
import { UserContext } from "../../context";
 
const PostList = ({ posts }) => {
  const { state } = useContext(UserContext);

  return (
    <>
      {posts && posts.map((post) => (
        <div key={post._id} className="card mb-5">
          <div className="card-header">
            {post.postedBy && post.postedBy.name ? (
              <div style={{ marginLeft: '1rem' }}>
                {post.postedBy.name[0]}
              </div>
            ) : (
              <FaUserCircle size={40} className="mb-2" />
            )}
            <span className="pt-2 ml-3">{post.postedBy ? post.postedBy.name : 'Аноним'}   </span>
            <span className="pt-2 ml-3">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="card-body">
            {renderHTML(post.content)}
          </div>
          <div className="card-footer">
            {post.image && <PostImage url={post.image.url} />}
            <div className="pt-3">
              <FaThumbsUp className="mr-2" />
              <span className="ml-2">Likes</span>
              <FaComment className="mx-2" />
              <span>2 comments </span>
            { state && state.user  && state.user._id === post.postedBy?._id && (
              <>
                <FaEdit className="text-success pt-7 h5 px-7"  style={{ cursor: 'pointer' }}/>
                <FaTrashAlt className="text-danger pt-7 h5 px-7 " style={{ cursor: 'pointer' }}/></>
            )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostList;
