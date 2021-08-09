import { Component } from "react";
import { BlogCard } from "./components/BlogCard";
import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm";
import axios from "axios";
import {postsUrl} from '../../shared/projectData'
import CircularProgress from '@material-ui/core/CircularProgress';

export class BlogContent extends Component {
  state = {
    showAddPostForm: false,
    blogArr: [],
    isPending: false
  };

  fetchPosts = () => {
    axios.get(postsUrl)
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

  // =======CLOSE FORM ON PUSH ESCAPE==========
  handleEscape = (e) => {
    if (e.key === "Escape" && this.state.showAddPostForm)
      this.handleHideAddPostForm();
  };


  componentDidMount() {
    this.fetchPosts()
    window.addEventListener("keyup", this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
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
