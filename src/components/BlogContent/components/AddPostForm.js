import "./AddPostForm.css";
import CancelIcon from '@material-ui/icons/Cancel';

export const AddPostForm = ({handleHideAddPostForm}) => {
  return (
    <>
        <form className="add__post-form">
            <button className='form__close-btn' onClick={handleHideAddPostForm}><CancelIcon/></button>
            <div>
                <input className="form__input-title" placeholder="Title Post" type="text" name="postTitle" />
            </div>
            <div>
                <textarea className="form__textarea" placeholder="Description Post" name="postDescription" />
            </div>
            <div>
                <button className="form__btn" onClick={handleHideAddPostForm} type="button">Add post</button>
            </div>
        </form>
        <div className="overlay" onClick={handleHideAddPostForm}></div>
    </>
  );
};
