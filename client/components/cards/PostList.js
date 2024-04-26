import React from 'react';

const PostList = ({ posts }) => {
  return (
    <>
      {posts && posts.map((post) => (
        <div key={post._id} className="card mb-5">
          <div className="card-header">
            {/* Header content */}
          </div>
          <div className="card-body">
            {/* Post content */}
          </div>
          <div className="card-footer">
            Like / unlike 3 Likes 2 comments
          </div>
        </div>
      ))}
    </>
  );
};

export default PostList;
