import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState('Draft - Saved');

  useEffect(() => {
    const checkSaveStatus = () => {
      const statusElement = document.getElementById('save-status');
      if (statusElement) {
        setSaveStatus(statusElement.textContent);
      }
    };

    checkSaveStatus();
    const interval = setInterval(checkSaveStatus, 500);
    return () => clearInterval(interval);
  }, []);

  const handleBackToPosts = () => {
    navigate('/');
  };

  return (
    <div className="header" style={{
      width: '1238px', // Keep original width
      height: '36px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      opacity: 1
    }}>
      {/* Left Section */}
      <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Arrow Button */}
        <button 
          onClick={handleBackToPosts}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_561)">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.0023 4.74725C11.1603 4.90545 11.2491 5.1199 11.2491 5.3435C11.2491 5.56709 11.1603 5.78154 11.0023 5.93975L7.94233 8.99975L11.0023 12.0597C11.0852 12.137 11.1517 12.2301 11.1978 12.3336C11.2439 12.4371 11.2687 12.5489 11.2707 12.6622C11.2727 12.7754 11.2519 12.888 11.2095 12.993C11.167 13.0981 11.1039 13.1935 11.0237 13.2737C10.9436 13.3538 10.8482 13.4169 10.7431 13.4594C10.6381 13.5018 10.5255 13.5227 10.4122 13.5207C10.2989 13.5187 10.1872 13.4939 10.0837 13.4478C9.98022 13.4016 9.88707 13.3351 9.80983 13.2522L6.15358 9.596C5.99557 9.43779 5.90682 9.22334 5.90682 8.99975C5.90682 8.77615 5.99557 8.5617 6.15358 8.4035L9.80983 4.74725C9.96803 4.58924 10.1825 4.50049 10.4061 4.50049C10.6297 4.50049 10.8441 4.58924 11.0023 4.74725Z" fill="#71717B"/>
            </g>
            <defs>
              <clipPath id="clip0_1_561">
                <rect width="18" height="18" fill="white" transform="translate(18) rotate(90)"/>
              </clipPath>
            </defs>
          </svg>
        </button>

        <span style={{
          width: '43px',
          height: '24px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '24px',
          color: '#000'
        }}>
          Posts
        </span>

        {/* Dynamic Save Status */}
        <span style={{
          width: 'auto',
          height: '20px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '400',
          fontSize: '14px',
          lineHeight: '20px',
          color: saveStatus === 'Saving...' ? '#666' : '#666'
        }}>
          {saveStatus}
        </span>
      </div>

      {/* Right Section */}
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Menu Button */}
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_568)">
              <path d="M12.6666 14C12.6666 13.6463 12.8071 13.3072 13.0572 13.0572C13.3072 12.8071 13.6463 12.6666 14 12.6666H22C22.3536 12.6666 22.6927 12.8071 22.9428 13.0572C23.1928 13.3072 23.3333 13.6463 23.3333 14V22C23.3333 22.3536 23.1928 22.6927 22.9428 22.9428C22.6927 23.1928 22.3536 23.3333 22 23.3333H14C13.6463 23.3333 13.3072 23.1928 13.0572 22.9428C12.8071 22.6927 12.6666 22.3536 12.6666 22V14Z" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 12.6666V23.3333" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_1_568">
                <rect width="16" height="16" fill="white" transform="translate(10 10)"/>
              </clipPath>
            </defs>
          </svg>
        </button>

        <button style={{
          width: '79px',
          height: '36px',
          padding: '6px 12px',
          borderRadius: '8px',
          background: '#09090BE5',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: '24px',
          color: '#ffffff'
        }}>
          Preview
        </button>

        <button style={{
          width: '74px',
          height: '36px',
          padding: '6px 12px',
          borderRadius: '8px',
          background: '#00A63E',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: '24px',
          color: '#ffffff',
          boxShadow: '0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A'
        }}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default Header;