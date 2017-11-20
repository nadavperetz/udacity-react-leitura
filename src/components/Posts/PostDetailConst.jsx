import React from 'react';
import {Panel, Row, Col, Button} from 'react-bootstrap'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'

const postDetailConst = (props) => (
    <div>
      <Panel header={props.post.title}>
        <Row>
          <Col md={12}>
            {props.post.body}
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md={4}>
            <div>
              <strong>Author: </strong>{props.post.author}
            </div>
          </Col>
          <Col md={4}>
            <div>
              <strong>Timestamp: </strong>{new Date(props.post.timestamp).toLocaleString()}
            </div>
          </Col>
          <Col md={2}>
            <strong>Score: </strong>{props.post.voteScore}
          </Col>
          <Col md={1}>
            <Button onClick={() => props.votePost(props.post.id, "upVote")}>
              <FaThumbsOUp/>
            </Button>
          </Col>
          <Col md={1}>
            <Button onClick={() => props.votePost(props.post.id, "downVote")}>
              <FaThumbsODown/>
            </Button>
          </Col>
        </Row>
      </Panel>
    </div>
);

export default postDetailConst;
