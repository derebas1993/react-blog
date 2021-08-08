import './BlogCard.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const BlogCard = ({title, description, liked, likePost, deletePost}) => {

  const heartFill = liked ? 'red' : 'thistle'


  return (
    <div className="post">
      <div className='post__content'>
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        <button onClick={likePost}>
          <FavoriteIcon style={{fill: heartFill}} />
        </button>
      </div>
      </div>
      <button>
          <DeleteForeverIcon className='delete__btn' onClick={deletePost} />
        </button>
    </div>
  );
};
