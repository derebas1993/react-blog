import { Component } from "react";
import { BlogCard } from "./components/BlogCard";
import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm";
import axios from "axios";

export class BlogContent extends Component {
  state = {
    showAddPostForm: false,
    blogArr: [],
  };

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp,
    });

    localStorage.setItem("blogPosts", JSON.stringify(temp));
  };

  deletePost = (pos) => {
    if (
      window.confirm(
        `Do you want to delete this post ${this.state.blogArr[pos].title} ?`
      )
    ) {
      const temp = [...this.state.blogArr];
      temp.splice(pos, 1);

      this.setState({
        blogArr: temp,
      });

      localStorage.setItem("blogPosts", JSON.stringify(temp));
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
    axios.get('https://5fb3db44b6601200168f7fba.mockapi.io/api/posts/')
      .then((respons) => {
        this.setState({
          blogArr: respons.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
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
          deletePost={() => this.deletePost(pos)}
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
          <div className="posts">{blogPosts}</div>
        </>
      </>
    );
  }
}
