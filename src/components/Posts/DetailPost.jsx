import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Grid, Col, Row, Button} from 'react-bootstrap'

import {getPostById, votePost} from '../../actions/posts'

import Header from '../Layout/Header'
import PostDetailConst from './PostDetailConst'
import CommentModal from "../Comments/CommentModal";
import {getAllPostComments, voteComment} from '../../actions/comments'
import CommentListConst from "../Comments/CommentListConst";

import sortBy from 'sort-by'
import FilterPosts from "../Layout/FilterPosts";

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

  componentWillMount() {
    this.props.getPostById(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }


  openCommentModal() {
    this.setState({showCommentModal: true});
  }

  closeCommentModal() {
    this.setState({showCommentModal: false});
  }

  openPostModal() {
    this.setState({showEditModal: true});
  }

  closePostModal() {
    this.setState({showEditModal: false});
  }

  changeFilter = (newFilter) => {
    let filter = this.state.filter
    let signal = filter.slice(0)
    let is_negative = (signal === '-')
    if (is_negative)
      filter = filter.slice(1, )
    if ((newFilter === filter) && !is_negative){
      this.setState({
        filter: "-" + newFilter
      })
    }
    else{
      this.setState({
        filter: newFilter
      })
    }
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
                                 votePost={this.props.votePost}/>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <Button  bsStyle="info" onClick={() => this.openCommentModal()}>New comment</Button>
              </Col>
              <Col md={7}>
                <FilterPosts title="Filter" options={filterOptions} changeFilter={this.changeFilter}/>
              </Col>
            </Row>
            <br/>
            <Col md={9}>
              <CommentListConst comments={comments} vote={(commentId, voteType) => this.props.voteComment(commentId, voteType)}/>
            </Col>
          </Grid>
          <CommentModal showCommentModal={this.state.showCommentModal}
                        closeCommentModal={() => this.closeCommentModal()}
                        post={this.props.post}
          />
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
    votePost: bindActionCreators(votePost, dispatch),
    getComments: bindActionCreators(getAllPostComments, dispatch),
    voteComment: bindActionCreators(voteComment, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
