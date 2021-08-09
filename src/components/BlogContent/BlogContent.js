import { Component } from "react";
import { BlogCard } from "./components/BlogCard";
import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm";
import axios from "axios";
import {postsUrl} from '../../shared/projectData'

export class BlogContent extends Component {
  state = {
    showAddPostForm: false,
    blogArr: [],
    isPending: false
  };

  fetchPosts = () => {
    this.setState({
      isPending: true
    })
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


  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp,
    });

    localStorage.setItem("blogPosts", JSON.stringify(temp));
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Do you want to delete this post ${blogPost.title} ?`)) {
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

  //==================ADD A NEW POST====================
  addNewPost = (blogPost) => {
    this.setState((state) => {
      const posts = [...state.blogArr];
      posts.push(blogPost)
      localStorage.setItem('blogPosts', JSON.stringify(posts))
      return {
        blogArr: posts
      }
    })
  }

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
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(item)}
        />
      );
    });

    if(this.state.blogArr.length === 0)
      return <h1>Load data...</h1>

    return (
      <>
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
          {
            this.state.isPending && <h2>Whait...</h2>
          }
          <div className="posts">{blogPosts}</div>
        </>
      </>
    );
  }
}
