import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {editPost} from '../../actions/posts'
import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import {v4} from 'node-uuid'
import {getCategories} from "../../actions/categories";

function FieldGroup({id, label, help, ...props}) {
  return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
  );
}

class PostModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author: '',
      category: ''
    }
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  static propTypes = {
    post: PropTypes.object
  };

  componentWillMount() {
    this.props.getCategories();
  }

  componentWillReceiveProps(){
    if (this.props.post !== undefined){
      this.setState({
        title: this.props.post.title,
        body: this.props.post.body,
        author: this.props.post.author,
        category: this.props.post.category
      })

    }
  }
  handleAuthorChange = (event) =>{
    this.setState({author: event.target.value});

  }

  handleCommentChange = (event) =>{
    this.setState({body: event.target.value});
  }

  handleTitleChange = (event) =>{
    this.setState({body: event.target.value});
  }

  handleCategoryChange = (event) =>{
    this.setState({body: event.target.value});
  }

  postComment = (event) => {
    event.preventDefault();
    this.props.createNewComment({
      id: v4(),
      parentId:  this.props.post.id,
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      voteScore:  this.props.post.voteScore,
      deleted: false,
      parentDeleted: this.props.post.deleted
    })
    this.props.closeCommentModal()
    this.setState({
      body: '',
      author: '',
    })
  }

  render() {
    return (
        <Modal show={this.props.showPostModal} onHide={() => this.props.closePostModal()}>
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

function mapStateToProps(state) {
  return {
    post: state.PostStore.uniquePost,
    categories: state.CategoryStore.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: bindActionCreators(editPost, dispatch),
    getCategories: bindActionCreators(getCategories, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)
