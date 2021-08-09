import "./EditPostForm.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { Component } from "react";

export class EditPostForm extends Component {
  state = {
    postTitle: this.props.selectedPost.title,
    postDescription: this.props.selectedPost.description,
  };

  handlePostTitleChenge = (e) => {
    this.setState({
      postTitle: e.target.value,
    });
  };

  handlePostDescriptionChenge = (e) => {
    this.setState({
      postDescription: e.target.value,
    });
  };

  //=============================================CREATE A NEW POST========
  savePost = (e) => {
    e.preventDefault();
    const post = {
      id: this.props.selectedPost.id,
      title: this.state.postTitle,
      description: this.state.postDescription,
      liked: this.props.selectedPost.liked,
    };
    this.props.editBlogPost(post);
    this.props.handleHideEditPostForm();
  };

  // =====================================CLOSE FORM ON PUSH ESCAPE==========
  handleEscape = (e) => {
    if (e.key === "Escape") this.props.handleHideEditPostForm();
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }

  //=======================================================RENDER======
  render() {
    const handleHideEditPostForm = this.props.handleHideEditPostForm;
    return (
      <>
        <form className="edit__post-form" onSubmit={this.savePost}>
          <button className="form__close-btn" onClick={handleHideEditPostForm}>
            <CancelIcon />
          </button>
          <div>
            <input
              className="form__input-title"
              onChange={this.handlePostTitleChenge}
              value={this.state.postTitle}
              placeholder="Title Post"
              type="text"
              name="postTitle"
            />
          </div>
          <div>
            <textarea
              className="form__textarea"
              value={this.state.postDescription}
              placeholder="Description Post"
              name="postDescription"
              onChange={this.handlePostDescriptionChenge}
              rows={8}
            />
          </div>
          <div>
            <button className="form__btn" type="submit">
              Save post
            </button>
          </div>
        </form>
        <div className="overlay" onClick={handleHideEditPostForm}></div>
      </>
    );
  }
}
