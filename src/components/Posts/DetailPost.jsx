import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Grid, Col, Row} from 'react-bootstrap'

import {getPostById, upVotePost, downVote} from '../../actions/posts'

import Header from '../Layout/Header'
import PostDetailConst from './PostDetailConst'

class ListPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '-voteScore',
      activeCategory: ''
    }
  }

  componentWillMount() {
    this.props.getPostById(this.props.match.params.id);
  }


  render() {
    return (
        <div>
          <Header/>
          <Grid>
            <Col md={9}>
              <PostDetailConst post={this.props.post}
                               upVote={this.props.upVotePost}
                               downVote={this.props.downVotePost}/>
            </Col>
          </Grid>
        </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    post: state.PostStore.uniquePost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostById: bindActionCreators(getPostById, dispatch),
    upVotePost: bindActionCreators(upVotePost, dispatch),
    downVotePost: bindActionCreators(downVote, dispatch),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
