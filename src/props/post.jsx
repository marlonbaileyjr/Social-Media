import React, { useState } from 'react';
import '../css/post.css'

function Post({ postID }) {
    const [showModal, setShowModal] = useState(false);

    // Assuming the image URL is derived from the postID in some way. Modify as needed.
    const imageURL = `/path/to/images/${postID}.jpg`;

    return (
        <>
            <img
                src={imageURL}
                alt="Post Thumbnail"
                onClick={() => setShowModal(true)}
                style={{ cursor: 'pointer', width: '100%', height: '200px', objectFit: 'cover' }}
            />

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span onClick={() => setShowModal(false)}>&times;</span>
                        <img src={imageURL} alt="Post" />
                        {/* Add comment section here */}
                    </div>
                </div>
            )}
        </>
    );
}

export default Post;
