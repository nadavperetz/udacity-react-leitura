import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createNewComment, editComment} from '../../actions/comments'
import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import {v4} from 'node-uuid'

function FieldGroup({id, label, help, ...props}) {
  return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
  );
}

class CommentModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newComment: true,
      body: '',
      author: '',
    }
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  static propTypes = {
    showCommentModal: PropTypes.bool.isRequired,
    closeCommentModal: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    comment: PropTypes.object
  };

  handleAuthorChange = (event) => {
    this.setState({author: event.target.value});

  }

  handleCommentChange = (event) => {
    this.setState({body: event.target.value});
  }

  onEntered = ()  => {
    if (this.props.comment !== null && this.props.comment !== undefined) {
      this.setState({
        newComment: false,
        author: this.props.comment.author,
        body: this.props.comment.body,
      })
    }

  }

  postComment = (event) => {
    event.preventDefault();
    if (this.state.newComment) {
      this.props.createNewComment({
        id: v4(),
        parentId: this.props.post.id,
        timestamp: Date.now(),
        body: this.state.body,
        author: this.state.author,
        voteScore: this.props.post.voteScore,
        deleted: false,
        parentDeleted: this.props.post.deleted
      })
    }
    else{
      this.props.editComment({
        body: this.state.body,
        author: this.state.author
      })
    }
    this.props.closeCommentModal()
    this.setState({
      body: '',
      author: '',
    })
  }

  render() {
    return (
        <Modal show={this.props.showCommentModal} onHide={() => this.props.closeCommentModal()}
               onEntered={this.onEntered}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FieldGroup
                  id="formAuthor"
                  type="text"
                  label="Author"
                  placeholder="Insert author name"
                  value={this.state.author}
                  onChange={this.handleAuthorChange}
              />
              <FieldGroup
                  id="formComment"
                  type="text"
                  label="Comment"
                  placeholder="Insert comment"
                  value={this.state.body}
                  onChange={this.handleCommentChange}
              />

              <Button type="submit" onClick={this.postComment}>
                Submit
              </Button>
            </form>
          </Modal.Body>
        </Modal>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    createNewComment: bindActionCreators(createNewComment, dispatch),
    editComment: bindActionCreators(editComment, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)
