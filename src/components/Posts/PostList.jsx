import React from 'react';
import {Panel} from 'react-bootstrap'


const PostList = (props) => (
    <div>
      {props.posts.map((post, index) =>
          <Panel key={index}>
            {post.title}
          </Panel>
      )}
    </div>
);

export default PostList;
