import { Component } from "react";
import { BlogCard } from "./components/BlogCard";
import "./BlogPage.css";
import { AddPostForm } from "./components/AddPostForm";
import axios from "axios";
import {postsUrl} from '../../shared/projectData'
import CircularProgress from '@material-ui/core/CircularProgress';
import { EditPostForm } from "./components/EditPostForm";

let source;

export class BlogContent extends Component {
  state = {
    showAddPostForm: false,
    showEditPostForm: false,
    blogArr: [],
    isPending: false,
    selectedPost: {}
  };

  fetchPosts = () => {
    source = axios.CancelToken.source();
    axios.get(postsUrl, {cancelToken: source.token})
    .then((respons) => {
      this.setState({
        blogArr: respons.data,
        isPending: false
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.fetchPosts()
  }

  componentWillUnmount() {
    if(source) {
      source.cancel();
    }
  }


  likePost = (blogPost) => {

    const temp = {...blogPost};
    temp.liked = !temp.liked;

    axios.put(`${postsUrl}/${blogPost.id}`, temp)
      .then((response) => {
        this.fetchPosts()
      })
      .catch((err) => {
        console.log(err);
      })
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Do you want to delete this post ${blogPost.title} ?`)) {
      this.setState({
        isPending: true
      })
      axios.delete(`${postsUrl}/${blogPost.id}`)
        .then((respons) => {
          console.log(respons.data);
          this.fetchPosts()
        })
        .catch((err) => {
          console.log(err);
        })
    }
  };

  //==================ADD A NEW POST====================
    addNewPost = (blogPost) => {
      this.setState({
        isPending: true
      })
      axios.post(postsUrl, blogPost)
        .then((response) => {
          this.fetchPosts()
        })
        .catch((err) => {
          console.log(err);
        })
    }

    editBlogPost = (updatedBlogPost) => {
      this.setState({
        isPending: true
      })

      axios.put(`${postsUrl}/${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        this.fetchPosts()
      })
      .catch((err) => {
        console.log(err);
      })
    }
  
  //=========================================ADD POST==
  handleShowAddPostForm = () => {
    this.setState({
      showAddPostForm: true,
    });
  };

  handleHideAddPostForm = () => {
    this.setState({
      showAddPostForm: false,
    });
  };

  //===========================================EDIT POST==
  handleShowEditPostForm = () => {
    this.setState({
      showEditPostForm: true,
    });
  };

  handleHideEditPostForm = () => {
    this.setState({
      showEditPostForm: false,
    });
  };


  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost
    })
  }

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          handleShowEditPostForm={this.handleShowEditPostForm}
          handleSelectPost={() => this.handleSelectPost(item)}
        />
      );
    });

    if(this.state.blogArr.length === 0) return <h1>Load data...</h1>

    const postsOpacity = this.state.isPending ? 0.5 : 1

    return (
      <div className='blog__page'>
        {this.state.showAddPostForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewPost={this.addNewPost}
            handleHideAddPostForm={this.handleHideAddPostForm}
          />
        )}

        {
          this.state.showEditPostForm && (
            <EditPostForm 
              handleHideEditPostForm={this.handleHideEditPostForm}
              selectedPost={this.state.selectedPost}
              editBlogPost={this.editBlogPost}
            />
          )
        }

        <>
          <h1>Blog</h1>
          <button className="blackBtn" onClick={this.handleShowAddPostForm}>
            Create new post
          </button>
          <div className="posts" style={{opacity: postsOpacity}}>
            {blogPosts}
          </div>
          {
            this.state.isPending && <CircularProgress className='preloader' />
          }
        </>
      </div>
    );
  }
}
