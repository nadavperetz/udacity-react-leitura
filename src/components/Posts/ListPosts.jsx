import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Button, Col, Grid, Row} from 'react-bootstrap'
import sortBy from 'sort-by'

import {getCategories} from '../../actions/categories'
import {editPost, getPosts, votePost} from '../../actions/posts'

import Header from '../Layout/Header'
import CategoriesSideBar from '../Categories/SideBarView'
import PostListConst from './PostListConst'
import FilterPosts from "../Layout/FilterPosts"
import PostModal from "./PostModal";

class ListPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '-voteScore',
      activeCategory: '',
      showPostModal: false,
      editablePost: null
    }
  }

  componentWillMount() {
    this.props.getCategories();
    this.props.getPosts(this.props.match.params.category);
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

  openPostModal() {
    this.setState({showPostModal: true});
  }

  closePostModal() {
    this.setState({
      showPostModal: false,
      editablePost: null
    });
  }

  editPost = (post) => {
    this.setState({
      showPostModal: true,
      editablePost: post
    });
  }

  deletePost = (postId) => {
    this.props.editPost({
      id: postId,
      deleted: true
    }, this.props.match.params.category)

  }


  render() {
    const posts = this.props.posts.sort(sortBy(this.state.filter));
    const activeCategory = this.props.match.params.category;
    const filterOptions = ['voteScore', 'timestamp', 'id', 'title', 'body', 'author', 'category']
    return (
        <div>
          <Header/>
          <Grid>
            <Row>
              <Col md={2}>
                <Button bsStyle="info" onClick={() => this.openPostModal()}>New post</Button>
              </Col>
              <Col md={7}>
                <FilterPosts title="Filter" options={filterOptions} changeFilter={this.changeFilter}/>
              </Col>
              <Col md={3}>
              </Col>
            </Row>
            <br/>

            <Col md={9}>
              <PostListConst posts={posts} votePost={this.props.votePost} editPost={this.editPost}
                             deletePost={this.deletePost}/>
            </Col>
            <Col md={2}>
              <CategoriesSideBar categories={this.props.categories} activeCategory={activeCategory}/>
            </Col>
            <Col md={1}>
            </Col>
            <PostModal showPostModal={this.state.showPostModal}
                       post={this.state.editablePost}
                       activeCategory={activeCategory}
                       closePostModal={() => this.closePostModal()}
            />
          </Grid>
        </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.CategoryStore.categories,
    posts: state.PostStore.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: bindActionCreators(getCategories, dispatch),
    getPosts: bindActionCreators(getPosts, dispatch),
    editPost: bindActionCreators(editPost, dispatch),
    votePost: bindActionCreators(votePost, dispatch),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
