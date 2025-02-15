import PropTypes from "prop-types";
import UserIcon from "../icons/UserIcon";
import { useContext, useEffect, useState } from "react";
import {  BaseURL, postContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Comments from "./comments/Comments";
import CommentCreate from "./comments/CommentCreate";


const Post = ({ post }) => {
    const { contacts } = useContext(postContext);
    const nav = useNavigate();
    let owner = contacts.find((c) => c.id === post.contactId);
    if (owner === undefined)
        owner = {
            id: -1,
            firstName: "Unknown",
            lastName: "User",
        };

    const [commentData, setCommentData] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editedPost, setEditedPost] = useState(post);

    const getCommentData = async () => {
        const response = await fetch(
            BaseURL +"/post/" +
                post.id +
                "/comment"
        );
        const data = await response.json();
        console.log(data);
        setCommentData([...data]);
    };

    useEffect(() => {
        getCommentData();
    }, [owner]);

    const goToProfile = () => {
        nav("/profile/" + owner.id);
    };

    const deletePost = () => {
        fetch( BaseURL + "/post/" + post.id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          
      };
    
      const edit = () => {
        setEditing(true);
        setEditedPost(post);
      };
    
      const save = () => {
        setEditing(false);
        fetch(
         BaseURL + "/post/" + editedPost.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedPost),
          }
        )
          .then((response) => {
            return response.json();
          })
         
      };
    
    
    return (
        <li className="list-item">
            <div className="post-owner">
                <UserIcon
                    color={owner.favouriteColour}
                    firstName={owner.firstName}
                    lastName={owner.lastName}
                    onClick={goToProfile}
                />
                <div className="owner-info">
                    <h2>{owner.firstName + " " + owner.lastName}</h2>
                    <p
                        onClick={() => {
                            nav("/detail/" + post.id);
                        }}
                    >
                        {post.title}
                    </p>
                    
            {editing && (
              <input
                type="text"
                id="post"
                name="post"
                onChange={(event) =>
                  setEditedPost({
                    ...editedPost,
                    title: event.target.value,
                  })
                }
                value={editedPost.title}
              />
            )}
                </div>
            </div>
            <p>{post.content}</p>
            
            <div>

            {editing && (
            <div>
              <button onClick={save}>Save</button>
            </div>
          )}
          {!editing && (
            <div>
              <button onClick={edit}>Edit</button>
              <button onClick={deletePost}>Delete</button>
            </div>
          )}
            </div>
            <hr />
            <Comments comments={commentData} />
            <CommentCreate
                postId={post.id}
                commentData={commentData}
                setCommentData={setCommentData}
            />
        </li>
    );
};

export default Post;
Post.propTypes = {
    post: PropTypes.object.isRequired,
};