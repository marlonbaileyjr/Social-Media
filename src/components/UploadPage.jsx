import React, { useState } from 'react';
import '../css/uploadpage.css';

function UploadPage() {
    const [caption, setCaption] = useState('');
    const [imageUrls, setImageUrls] = useState([]);

    

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 3 - imageUrls.length); // Limiting to 3 minus whatever's already been uploaded
    
        const updatedImageUrls = [...imageUrls];
    
        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                updatedImageUrls.push(reader.result);
                setImageUrls(updatedImageUrls);
            };
        });

        if (e.target.files.length + imageUrls.length > 3) {
            alert('You can only upload up to 3 images.');
            return;
        }
    };
    


    return (
        <div className="upload-page">
            <h2>Upload Images</h2>
            <input type="file" accept="image/*" multiple max="3" onChange={handleImageChange} />
            <div className='upload-image'>
                
                <div className="image-preview-container">
                    {imageUrls.map((url, index) => (
                        <img 
                            key={index}
                            src={url} 
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
            <button>
                <i className="fa fa-upload"></i> Upload
            </button>
            </div>
        </div>
    );
    
}

export default UploadPage;
