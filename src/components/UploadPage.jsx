import React, { useState } from 'react';
import { usePosts } from '../hooks/postHooks';
import { Users } from '../hooks/userHooks';
import '../css/uploadpage.css';

function UploadPage() {
    const [caption, setCaption] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const { userID } = Users();
    const {uploadPostPicture, createPost}=usePosts()

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 3 - imageUrls.length); // Limiting to 3 minus whatever's already been uploaded
    
        const updatedImageUrls = [...imageUrls];
    
        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                updatedImageUrls.push(file);
                setImageUrls(updatedImageUrls);
            };
        });

        if (e.target.files.length + imageUrls.length > 3) {
            alert('You can only upload up to 3 images.');
            return;
        }
    };
    
    const handleUpload = async () => {
        setIsUploading(true); // Assuming setIsUploading sets a state indicating the upload is in progress
        try {
            //Create the post and get the post ID
            const Response = createPost({caption: caption, userId:userID});
            console.log('reponse',Response)
            const postID = Response.data.postId; // Adjusted according to the correct response structure

            console.log('Post created with ID:', postID);
    
            // Upload each image with the correct order, assuming uploadPostPicture is defined elsewhere
            const uploadPromises = imageUrls.map((image, index) =>
            uploadPostPicture({postId:postID, order: index + 1, mediaFile: image})
            );
    
            // Wait for all images to finish uploading
            await Promise.all(uploadPromises);
            alert('Post and images uploaded successfully!');
        } catch (error) {
            console.error('Failed to upload post or images:', error);
            alert('There was an error uploading your post.');
        } finally {
            setIsUploading(false); // Reset the uploading state regardless of the outcome
        }
    };


    return (
        <div className="upload-page">
            <h2>Upload Images</h2>
            <input type="file" accept="image/*" multiple max="3" onChange={handleImageChange} />
            <div className='upload-image'>
                
            <div className="image-preview-container">
                {imageUrls.map((file, index) => (
                    <img 
                        key={index}
                        src={URL.createObjectURL(file)} 
                        alt={`Uploaded Preview ${index}`} 
                        style={{ width: '200px', marginTop: '10px', marginRight: '10px' }} 
                    />
                ))}
            </div>
            </div>
            <div>
                <label htmlFor="caption">Caption:</label>
                <input
                    type="text"
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    required
                />
            </div>
            <div>
            <button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? 'Uploading...' : <i className="fa fa-upload"></i>} Upload
            </button>
            </div>
        </div>
    );
    
}

export default UploadPage;
