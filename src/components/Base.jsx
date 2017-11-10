import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import {Grid, Col} from 'react-bootstrap'


import { getCategories } from '../actions/categories'

import Header from '../components/Layout/Header'
import CategoriesSideBar from '../components/Categories/SideBarView'
import PostList from '../components/Posts/PostList'

class Base extends Component {

  componentWillMount() {
    this.props.getCategories();
  }


  render() {
    const posts = [
      {id : "1",
        timestamp: Date.now(),
        title: 'Oi',
        body: 'Tudo bem?',
        author: 'Nadav Peretz',
        category: 'Games',
        voteScore: 3,
        deleted: false
      },
      {id : "2",
        timestamp: Date.now(),
        title: 'Oi2',
        body: 'Tudo bem2?',
        author: 'Nadav Mals',
        category: 'Movies',
        voteScore: 1,
        deleted: false
      }];

    return (
        <div>
          <Header/>
          <Grid>
            <Col md={9}>
              <PostList posts={posts} />
            </Col>
            <Col md={3}>
              <CategoriesSideBar categories={this.props.categories}/>
            </Col>
          </Grid>
        </div>

    );
  }
}

function mapStateToProps (state) {
  return {
    categories: state.CategoryStore.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories:  bindActionCreators(getCategories, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)
