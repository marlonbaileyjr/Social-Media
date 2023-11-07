import React, { useState } from 'react';
import { usePosts } from '../hooks/postHooks';
import { Users } from '../hooks/userHooks';
import '../css/uploadpage.css';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
    const navigate = useNavigate()
    const [caption, setCaption] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const { userID } = Users();
    const {uploadPostPicture, createPostMutation}=usePosts()

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
    
    const handleUpload = () => {
        setIsUploading(true);
    
        // This triggers the mutation and specifies callbacks for success or failure
        createPostMutation.mutate(
            { caption: caption, userId: Number(userID) },
            {
                onSuccess: async (response) => {
                    console.log('Response:', response);
                    const postID = response.postId;
    
                    // Now that we have the postID, we can upload the images
                    try {
                        const uploadPromises = imageUrls.map((image, index) =>
                            uploadPostPicture({
                                postId: postID,
                                order: index + 1,
                                mediaFile: image,
                            })
                        );
        
                        // Wait for all images to finish uploading
                        await Promise.all(uploadPromises);
                        alert('Post and images uploaded successfully!');
                    } catch (uploadError) {
                        console.error('Failed to upload images:', uploadError);
                        alert('There was an error uploading your images.');
                    }
                    
                    setIsUploading(false);
                    navigate('/')
                },
                onError: (error) => {
                    // Handle the error case
                    console.error('Failed to create post:', error);
                    alert('There was an error creating your post.');
                    setIsUploading(false);
                },
            }
        );
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
