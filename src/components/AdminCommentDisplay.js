import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import _ from 'underscore';
function AdminCommentDisplay(){
    const dispatch = useDispatch();
    const {proyectId} = useParams();
    const comments = useSelector((state = {}) => state.commentsSlice, _.isEqual);
    const commentDisplay = comments.map(({comment, dateCreated}) => {
        const commentItem = 
            <div className="comment-item">
                <div className="comment-date">
                    <h6>
                        {dateCreated}
                    </h6>
                </div>
                <div className="comment-body">
                    {comment}
                </div>
            </div>
        ;
        return commentItem;
    });
    useEffect(() => {
        dispatch(getComments(proyectId))
    }, []); 
    return(
        <div className="comment-container">
            {commentDisplay}
        </div>
    );
}
export default AdminCommentDisplay;