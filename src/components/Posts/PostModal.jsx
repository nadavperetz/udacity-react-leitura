import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {editPost} from '../../actions/posts'
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from 'react-bootstrap'
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

  static propTypes = {
    post: PropTypes.object,
    showPostModal: PropTypes.bool.isRequired,
    closePostModal: PropTypes.func.isRequired,
    activeCategory: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      newPost: true,
      title: '',
      body: '',
      author: '',
      category: ''
    }
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }


  componentWillMount() {
    this.props.getCategories();
  }

  onEntered(){
    if (this.props.post !== null) {
      this.setState({
        newPost: false,
        title: this.props.post.title,
        body: this.props.post.body,
        author: this.props.post.author,
        category: this.props.post.category
      })
    }

  }


  handleAuthorChange = (event) => {
    this.setState({author: event.target.value});

  }

  handleBodyChange = (event) => {
    this.setState({body: event.target.value});
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleCategoryChange = (event) => {
    console.log("event")
    console.log(event.target.value)
    this.setState({category: event.target.value});
  }

  postComment = (event) => {
    event.preventDefault();
    if (this.state.newPost) {
      this.props.editPost({
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.category,
      }, this.props.activeCategory)
    }
    else {
      this.props.editPost({
        id: this.props.post.id,
        timestamp: Date.now(),
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.category,
      }, this.props.activeCategory)
    }
    this.props.closePostModal()
    this.setState({
      newPost: true,
      title: '',
      body: '',
      author: '',
      category: ''
    })
  }

  render() {
    console.log(this.state)
    console.log(this.state.category)
    return (
        <Modal show={this.props.showPostModal} onHide={() => this.props.closePostModal()}
               onEntered={() => this.onEntered()}>
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
                  label="title"
                  placeholder="Insert title"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
              />
              <FieldGroup
                id="formComment"
                type="text"
                label="body"
                placeholder="Insert body"
                value={this.state.body}
                onChange={this.handleBodyChange}/>
              <FormGroup controlId="formComment">
                <ControlLabel>Category</ControlLabel>
                <FormControl componentClass="select" placeholder="select"
                             value={this.state.category}
                             onChange={this.handleCategoryChange}>
                  <option value="..." key={0} disabled={true} >...</option>
                  {this.props.categories.map((category) => <option key={category.name}
                                                                   value={category.name}>{category.name}</option>)}

                </FormControl>
              </FormGroup>

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
