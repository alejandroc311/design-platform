import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComments, selectComments } from "../store/commentsSlice";
import _ from 'underscore';
function AdminCommentDisplay(){
    const dispatch = useDispatch();
    const {proyectId} = useParams();
    const comments = useSelector(selectComments, shallowEqual);
    const commentDisplay = comments.map(({comment, dateCreated}) => {
        const commentItem = 
            <div className="comment-item" key={dateCreated}>
                <div className="comment-date">
                    <h6>
                        {dateCreated}
                    </h6>
                </div>
                <div className="comment-body">
                    <p>{comment}</p>
                </div>
            </div>
        ;
        return commentItem;
    });
    useEffect(() => {
        dispatch(getComments(proyectId));
    }, [proyectId]); 
    return(
        <div className="comment-container">
            <h1>User's Comments</h1>
            {commentDisplay}
        </div>
    );
}
export default AdminCommentDisplay;