import "./AddPostForm.css";
import CancelIcon from '@material-ui/icons/Cancel';
import { Component } from "react";

export class AddPostForm extends Component {

    state = {
        postTitle: '',
        postDescription: ''
    }

    handlePostTitleChenge = e => {
        this.setState({
            postTitle: e.target.value
        })
    }
    
    handlePostDescriptionChenge = e => {
        this.setState({
            postDescription: e.target.value
        })
    }

    //==========================CREATE A NEW POST========
    createPost = (e) => {
        e.preventDefault();
        const post = {
            title: this.state.postTitle,
            description: this.state.postDescription,
            liked: false
        }
        this.props.addNewPost(post)
        this.props.handleHideAddPostForm()
    }


    // componentDidMount() {
    //     console.log('component form reder');
    // }

    // componentDidUpdate() {
    //     console.log('component form update');
    // }

    // componentWillUnmount() {
    //     console.log('component form close');
    // }

    render() {
        const handleHideAddPostForm = this.props.handleHideAddPostForm;
        return (
            <>
                <form className="add__post-form" onSubmit={this.createPost}>
                    <button className='form__close-btn' onClick={handleHideAddPostForm}><CancelIcon/></button>
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
                            required
                        />
                    </div>
                    <div>
                        <button 
                            className="form__btn"
                            type="submit">Add post
                        </button>
                    </div>
                </form>
                <div className="overlay" onClick={handleHideAddPostForm}></div>
            </>
          );
    }
};
