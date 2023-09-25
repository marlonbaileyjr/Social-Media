import React, { useState } from 'react';
import '../css/uploadpage.css'

function UploadPage() {
    const [caption, setCaption] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
        }
    };

    return (
        <div className="upload-page">
            <h2>Upload Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageUrl && (
                <>
                    <img src={imageUrl} alt="Uploaded Preview" style={{ width: '300px', marginTop: '20px' }} />
                    <div>
                        <label htmlFor="caption">Caption:</label>
                        <input
                            type="text"
                            id="caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default UploadPage;
