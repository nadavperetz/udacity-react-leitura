import React from 'react';
import {Panel, Row, Col, Button} from 'react-bootstrap'
// import {Link} from "react-router-dom";

import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'

const CommentListConst = (props) => (
    <div>
      {props.comments && props.comments.map((comment, index) => {
            return (<Row key={index}>
                  <Panel
                      // header={<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>}
                      key={index}>
                    <Row>
                      <Col md={9}>
                        {comment.body}
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col md={4}>
                        <div>
                          <strong>Author: </strong>{comment.author}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div>
                          <strong>Timestamp: </strong>{new Date(comment.timestamp).toLocaleString()}
                        </div>
                      </Col>
                        <Col md={2}>
                            <strong>Score: </strong>{comment.voteScore}
                        </Col>
                        <Col md={1}>
                            <Button onClick={() => props.vote(comment.id, "upVote")}>
                                <FaThumbsOUp/>
                            </Button>
                        </Col>
                        <Col md={1}>
                            <Button onClick={() => props.vote(comment.id, "downVote")}>
                                <FaThumbsODown/>
                            </Button>
                        </Col>
                    </Row>
                  </Panel>
                </Row>
            )
          }
      )}
    </div>
);

export default CommentListConst;