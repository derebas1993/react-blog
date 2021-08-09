import { Component } from "react";
import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";
import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm";

export class BlogContent extends Component {
  state = {
    showAddPostForm: false,
    blogArr: JSON.parse(localStorage.getItem("blogPosts")) || posts,
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
    this.handleHideAddPostForm()
  }

  // =======CLOSE FORM ON PUSH ESCAPE==========
  handleEscape = (e) => {
    if (e.key === "Escape" && this.state.showAddPostForm)
      this.handleHideAddPostForm();
  };

  componentDidMount() {
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

    return (
      <>
        {this.state.showAddPostForm ? (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewPost={this.addNewPost}
            handleHideAddPostForm={this.handleHideAddPostForm}
          />
        ) : null}
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
