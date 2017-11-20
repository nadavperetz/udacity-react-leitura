import React from 'react';
import {Panel, Row, Col, Button} from 'react-bootstrap'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import PanelHeaderPost from "./PanelHeaderPost";


const PostListConst = (props) => (
    <div>
      {props.posts && props.posts.map((post, index) => {
            return (<Row key={index}>
                  <Panel header={PanelHeaderPost(post, props.editPost, props.deletePost)} key={index}>
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
                      <Button onClick={() => props.votePost(post.id, "upVote")}>
                        <FaThumbsOUp/>
                      </Button>
                    </Col>
                    <Col md={1}>
                      <Button onClick={() => props.votePost(post.id, "downVote")}>
                        <FaThumbsODown/>
                      </Button>
                    </Col>
                  </Panel>
                </Row>
            )
          }
      )}
    </div>
);

export default PostListConst;
