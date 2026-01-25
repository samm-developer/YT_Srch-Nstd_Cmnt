import React, { useState } from "react";

// Helper function to generate unique IDs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const initialComments = [
  {
    id: generateId(),
    name: "Raj",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    id: generateId(),
    name: "Raj",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [
      {
        id: generateId(),
        name: "Raj",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [],
      },
      {
        id: generateId(),
        name: "Raj",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [
          {
            id: generateId(),
            name: "Raj",
            text: "Lorem ipsum dolor sit amet, consectetur adip",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: generateId(),
    name: "Raj",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
];

const Comment = ({ data, onReply, depth = 0 }) => {
  const { id, name, text, replies } = data;
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onReply(id, replyText.trim());
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  return (
    <div>
      <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
        <img
          className="w-12 h-12 rounded-full"
          alt="user"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
        <div className="px-3 flex-1">
          <p className="font-bold">{name}</p>
          <p>{text}</p>
          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold"
          >
            {showReplyInput ? "Cancel" : "Reply"}
          </button>
        </div>
      </div>

      {showReplyInput && (
        <div className="ml-14 mb-2">
          <form onSubmit={handleReplySubmit} className="flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Add a reply..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Reply
            </button>
          </form>
        </div>
      )}

      {replies.length > 0 && (
        <div className="pl-5 border-l-2 border-gray-300 ml-5">
          <CommentsList comments={replies} onReply={onReply} depth={depth + 1} />
        </div>
      )}
    </div>
  );
};

const CommentsList = ({ comments, onReply, depth = 0 }) => {
  return comments.map((comment) => (
    <Comment
      key={comment.id}
      data={comment}
      onReply={onReply}
      depth={depth}
    />
  ));
};

const CommentsContainer = () => {
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");

  // Recursive function to find and add reply to a comment by ID
  const addReplyToComment = (commentsArray, parentId, replyText) => {
    return commentsArray.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: generateId(),
              name: "You",
              text: replyText,
              replies: [],
            },
          ],
        };
      }
      return {
        ...comment,
        replies: addReplyToComment(comment.replies, parentId, replyText),
      };
    });
  };

  const handleReply = (parentId, replyText) => {
    setComments((prevComments) =>
      addReplyToComment(prevComments, parentId, replyText)
    );
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: generateId(),
          name: "You",
          text: commentText.trim(),
          replies: [],
        },
      ]);
      setCommentText("");
    }
  };

  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold mb-4">Comments ({comments.length})</h1>
      
      {/* Add Comment Form */}
      <div className="mb-6">
        <form onSubmit={handleAddComment} className="flex gap-2 items-start">
          <img
            className="w-10 h-10 rounded-full"
            alt="user"
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          />
          <div className="flex-1">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a public comment..."
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setCommentText("")}
                className="px-4 py-1 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div>
        <CommentsList comments={comments} onReply={handleReply} />
      </div>
    </div>
  );
};

export default CommentsContainer;
