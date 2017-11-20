import React from 'react';
import {Button, Col, Panel, Row} from 'react-bootstrap'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import PanelHeaderPost from "./PanelHeaderPost";

const postDetailConst = (props) => (
    <div>
      <Panel header={PanelHeaderPost(props.post, props.editPost, props.deletePost)} key={0}>
        <Row>
          <Col md={12}>
            {props.post.body}
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md={2}>
            <div>
              <strong>Author: </strong>{props.post.author}
            </div>
          </Col>
          <Col md={4}>
            <div>
              <strong>Date: </strong>{new Date(props.post.timestamp).toLocaleString()}
            </div>
          </Col>
          <Col md={2}>
            <div>
              <strong>Comments: </strong>{props.post.commentCount}
            </div>
          </Col>
          <Col md={2}>
            <strong>Score: </strong>{props.post.voteScore}
          </Col>
          <Col md={2}>
            <Button onClick={() => props.votePost(props.post.id, "upVote")}>
              <FaThumbsOUp/>
            </Button>
            <Button onClick={() => props.votePost(props.post.id, "downVote")}>
              <FaThumbsODown/>
            </Button>
          </Col>
        </Row>
      </Panel>
    </div>
);

export default postDetailConst;
