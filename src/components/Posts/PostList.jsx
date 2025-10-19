import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostsList = () => {
  const navigate = useNavigate();
  
  const posts = [
    {
      id: 1,
      title: "Future Projections",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      status: "5 minutes ago",
      views: "499"
    },
    {
      id: 2,
      title: "User Feedback Collection",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      status: "10 minutes ago",
      views: "499"
    },
    {
      id: 3,
      title: "Trends & Cost Reduction",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      status: "20 minutes ago",
      views: "499"
    },
    {
      id: 4,
      title: "Market Expansion Strategies",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      status: "Published",
      date: "18 Feb 2025"
    },
    {
      id: 5,
      title: "Innovative Product Development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      status: "Published",
      date: "18 Mar 2025"
    }
  ];

  const handleNewPost = () => {
    navigate('/editor');
  };

  return (
    <div style={{
      position: 'absolute',
      width: '1176px',
      height: '941px',
      opacity: 1,
      top: '113px',
      left: '159px',
      padding: '40px',
      background: '#FFFFFF',
      boxShadow: '0px 1px 2px 0px #0000000D'
    }}>
      <div style={{
        width: '1096px',
        height: '582px',
        maxWidth: '1152px',
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
        
        <div style={{
          width: '1096px',
          height: '84px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: 1
        }}>
          <div>
            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700',
              fontSize: '30px',
              lineHeight: '36px',
              color: '#000',
              margin: '0 0 8px 0'
            }}>
              Posts
            </h1>
            <div style={{
              width: '419px',
              height: '36px',
              opacity: 1,
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}>
              {/* Search Input */}
              <div style={{
                position: 'relative',
                flex: 1,
                height: '36px'
              }}>
                <input
                  type="text"
                  placeholder="Search posts..."
                  style={{
                    width: '100%',
                    height: '50%',
                    padding: '8px 12px 8px 36px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#374151',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3B82F6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#D1D5DB';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      fillRule="evenodd" 
                      clipRule="evenodd" 
                      d="M9.96501 11.026C8.94973 11.7739 7.68935 12.1106 6.43634 11.9686C5.18334 11.8266 4.03027 11.2164 3.20814 10.2602C2.38601 9.30402 1.95553 8.0725 2.00296 6.81237C2.05039 5.55224 2.57221 4.35656 3.46389 3.46488C4.35557 2.5732 5.55124 2.05138 6.81138 2.00395C8.07151 1.95653 9.30302 2.387 10.2592 3.20913C11.2154 4.03126 11.8256 5.18433 11.9676 6.43734C12.1096 7.69034 11.7729 8.95073 11.025 9.966L13.78 12.72C13.8537 12.7887 13.9128 12.8715 13.9538 12.9635C13.9948 13.0555 14.0168 13.1548 14.0186 13.2555C14.0204 13.3562 14.0019 13.4562 13.9641 13.5496C13.9264 13.643 13.8703 13.7278 13.799 13.799C13.7278 13.8703 13.643 13.9264 13.5496 13.9641C13.4562 14.0018 13.3562 14.0204 13.2555 14.0186C13.1548 14.0168 13.0555 13.9948 12.9635 13.9538C12.8715 13.9128 12.7887 13.8537 12.72 13.78L9.96501 11.026ZM10.5 7C10.5 7.92826 10.1313 8.81849 9.47488 9.47487C8.8185 10.1312 7.92826 10.5 7.00001 10.5C6.07175 10.5 5.18151 10.1312 4.52513 9.47487C3.86876 8.81849 3.50001 7.92826 3.50001 7C3.50001 6.07174 3.86876 5.1815 4.52513 4.52512C5.18151 3.86875 6.07175 3.5 7.00001 3.5C7.92826 3.5 8.8185 3.86875 9.47488 4.52512C10.1313 5.1815 10.5 6.07174 10.5 7Z" 
                      fill="#71717B"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* New Post Button - moved to right side */}
          <button 
            onClick={handleNewPost}
            style={{
              width: '89px',
              height: '36px',
              borderRadius: '8px',
              padding: '6px 12px',
              background: '#09090BE5',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
              fontSize: '14px',
              lineHeight: '24px',
              color: '#ffffff',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#000000';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#09090BE5';
            }}
          >
            New post
          </button>
        </div>

        <div style={{
          width: '1096px',
          height: '466px',
          opacity: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {posts.map((post) => (
            <div key={post.id} style={{
              width: '1096px',
              height: '93px',
              opacity: 1,
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#3B82F6';
              e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600',
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#000',
                  margin: '0 0 4px 0'
                }}>
                  {post.title}
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#666',
                  margin: '0 0 8px 0'
                }}>
                  {post.description}
                </p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: post.status === 'Published' ? '600' : '400',
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: post.status === 'Published' ? '#059669' : '#666'
                  }}>
                    {post.status}
                  </span>
                  {post.date && (
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400', fontSize: '12px', lineHeight: '16px', color: '#666' }}>
                      {post.date}
                    </span>
                  )}
                  {post.views && (
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400', fontSize: '12px', lineHeight: '16px', color: '#666' }}>
                      {post.views} views
                    </span>
                  )}
                </div>
              </div>

              <div style={{
                width: '92px',
                height: '40px',
                opacity: 1,
                display: 'flex',
                gap: '16px',
                alignItems: 'center'
              }}>
                <button 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    padding: '4px',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F3F4F6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.0517 13.7392L25.4575 12.3325C25.7506 12.0394 26.148 11.8748 26.5625 11.8748C26.977 11.8748 27.3744 12.0394 27.6675 12.3325C27.9606 12.6256 28.1252 13.023 28.1252 13.4375C28.1252 13.8519 27.9606 14.2494 27.6675 14.5425L15.6933 26.5167C15.2528 26.957 14.7095 27.2806 14.1125 27.4583L11.875 28.125L12.5417 25.8875C12.7194 25.2905 13.043 24.7472 13.4833 24.3067L24.0525 13.7392H24.0517ZM24.0517 13.7392L26.25 15.9375" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <button 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    padding: '4px',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FEF2F2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.666 14.6664H23.3327" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.6674 17.333V21.333" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.3334 17.333V21.333" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.334 14.667L14.0007 22.667C14.0007 23.4034 14.5976 24.0003 15.334 24.0003H20.6673C21.4037 24.0003 22.0007 23.4034 22.0007 22.667L22.6673 14.667" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 14.6667V12.6667C16 12.2985 16.2985 12 16.6667 12H19.3333C19.7015 12 20 12.2985 20 12.6667V14.6667" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsList;