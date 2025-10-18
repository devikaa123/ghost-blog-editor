import React from 'react';

const ImageUpload = () => {
  return (
    <div className="image-upload-frame" style={{
      width: '1238px',
      height: '300px',
      opacity: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <div className="image-upload" style={{
        width: '800px',
        maxWidth: '800px',
        height: '300px',
        border: '1px dashed #6A7282',
        borderStyle: 'dashed',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        cursor: 'pointer',
        padding: '10px',
        gap: '16px'
      }}>
        <div style={{ 
          width: '291px',
          height: '41px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          opacity: 1
        }}>
          <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_583)">
              <path d="M13 13.5H16C16.7956 13.5 17.5587 13.1839 18.1213 12.6213C18.6839 12.0587 19 11.2957 19 10.5C19 9.70436 18.6839 8.9413 18.1213 8.37869C17.5587 7.81608 16.7956 7.50001 16 7.50001H15.975C15.9908 7.3338 15.9992 7.16697 16 7.00001C15.9962 5.67336 15.5131 4.39279 14.6396 3.39429C13.7661 2.39579 12.5611 1.74667 11.2467 1.56656C9.93236 1.38645 8.59718 1.68749 7.48727 2.41419C6.37736 3.14089 5.56752 4.24428 5.207 5.52101C5.137 5.51701 5.071 5.50001 5 5.50001C3.93913 5.50001 2.92172 5.92144 2.17157 6.67158C1.42143 7.42173 1 8.43914 1 9.50001C1 10.5609 1.42143 11.5783 2.17157 12.3284C2.92172 13.0786 3.93913 13.5 5 13.5H7.167M10 15.5V6.50001M10 6.50001L8 8.50001M10 6.50001L12 8.50001" stroke="#6A7282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_1_583">
                <rect width="20" height="16" fill="white" transform="translate(0 0.5)"/>
              </clipPath>
            </defs>
          </svg>
          <p style={{ 
            fontSize: '16px', 
            color: '#374151', 
            margin: 0,
            textAlign: 'center'
          }}>
            Click to upload post cover or drag and drop
          </p>
          <p style={{ 
            fontSize: '12px', 
            color: '#6b7280',
            margin: 0,
            textAlign: 'center'
          }}>
            SVG, PNG, JPG or GIF (MAX. 800×400px)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;