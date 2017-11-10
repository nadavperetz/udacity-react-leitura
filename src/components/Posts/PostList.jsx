import React from 'react';
import {Panel, Row, Col, Button} from 'react-bootstrap'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import {Link} from "react-router-dom";

const PostList = (props) => (
    <div>
      {props.posts && props.posts.map((post, index) => {
          return (<Row key={index}>
                <Panel header={<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>} key={index}>
              <Col md={4}>
                <div>
                  <strong>Author: </strong>{post.author}
                </div>
              </Col>
                  <Col md={4}>
                <div>
                  <strong>Nº comments: </strong>{post.commentCount}
                </div>
              </Col>
              <Col md={2}>
                <strong>Score: </strong>{post.voteScore}
              </Col>
              <Col md={1}>
                <Button onClick={() => props.upVote(post.id)}>
                  <FaThumbsOUp/>
                </Button>
              </Col>
              <Col md={1}>
                <Button onClick={() => props.downVote(post.id)}>
                  <FaThumbsODown/>
                </Button>
              </Col>
            </Panel>
          </Row>
          )}
      )}
    </div>
);

export default PostList;
