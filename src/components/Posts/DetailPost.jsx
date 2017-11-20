import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from "react-router-dom"
import {Button, Col, Grid, Row} from 'react-bootstrap'

import {editPost, getPostById, votePost} from '../../actions/posts'

import Header from '../Layout/Header'
import PostDetailConst from './PostDetailConst'
import CommentModal from "../Comments/CommentModal";
import {getAllPostComments, voteComment} from '../../actions/comments'
import CommentListConst from "../Comments/CommentListConst";

import sortBy from 'sort-by'
import FilterPosts from "../Layout/FilterPosts";
import PostModal from "./PostModal";


class ListPosts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: '-voteScore',
      activeCategory: '',
      showCommentModal: false,
      showEditModal: false
    }
  }

  redirect() {
    this.props.history.push('/');
  }

  componentWillMount() {
    this.props.getPostById(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }

  componentDidUpdate(){
    if (this.props.post.id === null) {
      console.log('epa')
      this.redirect()
    }
  }


  openCommentModal() {
    this.setState({showCommentModal: true});
  }

  closeCommentModal() {
    this.setState({showCommentModal: false});
  }

  closeEditModal() {
    this.setState({showEditModal: false});
  }

  openEditModal() {
    this.setState({showEditModal: true});
  }

  changeFilter = (newFilter) => {
    let filter = this.state.filter
    let signal = filter.slice(0)
    let is_negative = (signal === '-')
    if (is_negative)
      filter = filter.slice(1,)
    if ((newFilter === filter) && !is_negative) {
      this.setState({
        filter: "-" + newFilter
      })
    }
    else {
      this.setState({
        filter: newFilter
      })
    }
  }

  editPost = (post) => {
    this.setState({
      showEditModal: true,
      editablePost: post
    });
  }

  deletePost = (postId) => {
    this.props.editPost({
      id: postId,
      deleted: true
    }, this.props.match.params.category)
    this.redirect()
  }

  render() {
    const comments = this.props.comments.sort(sortBy(this.state.filter));
    const filterOptions = ['voteScore', 'timestamp', 'id', 'body', 'author']
    return (
        <div>
          <Header/>
          <Grid>
            <Row>
              <Col md={9}>
                <PostDetailConst post={this.props.post}
                                 editPost={this.editPost}
                                 deletePost={this.deletePost}
                                 showPostModal={this.openEditModal}
                                 votePost={this.props.votePost}/>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <Button bsStyle="info" onClick={() => this.openCommentModal()}>New comment</Button>
              </Col>
              <Col md={7}>
                <FilterPosts title="Filter" options={filterOptions} changeFilter={this.changeFilter}/>
              </Col>
            </Row>
            <br/>
            <Col md={9}>
              <CommentListConst comments={comments}
                                vote={(commentId, voteType) => this.props.voteComment(commentId, voteType)}/>
            </Col>
          </Grid>
          <CommentModal showCommentModal={this.state.showCommentModal}
                        closeCommentModal={() => this.closeCommentModal()}
                        post={this.props.post}
          />
          <PostModal showPostModal={this.state.showEditModal}
                     post={this.state.editablePost}
                     closePostModal={() => this.closeEditModal()}/>
        </div>


    )
  }
}

function mapStateToProps(state) {
  return {
    post: state.PostStore.uniquePost,
    comments: state.CommentStore.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostById: bindActionCreators(getPostById, dispatch),
    editPost: bindActionCreators(editPost, dispatch),
    votePost: bindActionCreators(votePost, dispatch),
    getComments: bindActionCreators(getAllPostComments, dispatch),
    voteComment: bindActionCreators(voteComment, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListPosts))
