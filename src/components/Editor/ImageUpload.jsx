import React, { useRef, useState } from 'react';

const ImageUpload = () => {
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (SVG, PNG, JPG, GIF)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Please select an image smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center', // Center horizontally
      width: '100%'
    }}>
      <div className="image-upload-frame" style={{
        width: '1238px',
        height: '300px',
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center the upload area within the frame
        gap: '10px'
      }}>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          style={{ display: 'none' }}
        />

        <div 
          className="image-upload"
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            width: '800px',
            maxWidth: '800px',
            height: '300px',
            border: isDragging ? '2px solid #3B82F6' : '1px dashed #6A7282',
            borderStyle: 'dashed',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDragging ? '#EFF6FF' : '#f9fafb',
            cursor: 'pointer',
            padding: '10px',
            gap: '16px',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {uploadedImage ? (
            // Show uploaded image preview
            <>
              <img 
                src={uploadedImage} 
                alt="Uploaded preview" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '6px'
                }}
              />
              {/* Remove button */}
              <button
                onClick={handleRemoveImage}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                ×
              </button>
              {/* Change image text */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                Click to change image
              </div>
            </>
          ) : (
            // Show upload interface
            <div style={{ 
              width: '291px',
              height: '41px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',
              opacity: 1
            }}>
              {/* SVG Icon */}
              <div style={{ marginBottom: '8px' }}>
                <svg width="40" height="34" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1_583)">
                    <path d="M13 13.5H16C16.7956 13.5 17.5587 13.1839 18.1213 12.6213C18.6839 12.0587 19 11.2957 19 10.5C19 9.70436 18.6839 8.9413 18.1213 8.37869C17.5587 7.81608 16.7956 7.50001 16 7.50001H15.975C15.9908 7.3338 15.9992 7.16697 16 7.00001C15.9962 5.67336 15.5131 4.39279 14.6396 3.39429C13.7661 2.39579 12.5611 1.74667 11.2467 1.56656C9.93236 1.38645 8.59718 1.68749 7.48727 2.41419C6.37736 3.14089 5.56752 4.24428 5.207 5.52101C5.137 5.51701 5.071 5.50001 5 5.50001C3.93913 5.50001 2.92172 5.92144 2.17157 6.67158C1.42143 7.42173 1 8.43914 1 9.50001C1 10.5609 1.42143 11.5783 2.17157 12.3284C2.92172 13.0786 3.93913 13.5 5 13.5H7.167M10 15.5V6.50001M10 6.50001L8 8.50001M10 6.50001L12 8.50001" 
                        stroke={isDragging ? "#3B82F6" : "#6A7282"} 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1_583">
                      <rect width="20" height="16" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              
              <p style={{ 
                fontSize: '16px', 
                color: isDragging ? '#3B82F6' : '#374151', 
                margin: 0,
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {isDragging ? 'Drop image here' : 'Click to upload post cover or drag and drop'}
              </p>
              <p style={{ 
                fontSize: '12px', 
                color: isDragging ? '#3B82F6' : '#6b7280',
                margin: 0,
                textAlign: 'center'
              }}>
                SVG, PNG, JPG or GIF (MAX. 800×400px)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;