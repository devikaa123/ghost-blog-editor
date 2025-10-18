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
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '24px',
              color: '#666',
              margin: '0'
            }}>
              Search Posts
            </h2>
          </div>

          <div style={{
            width: '419px',
            height: '36px',
            opacity: 1,
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}></div>
            
            {/* Updated New Post Button */}
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
                color: '#ffffff'
              }}
            >
              New post
            </button>
          </div>
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
              alignItems: 'center'
            }}>
              
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
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.0517 13.7392L25.4575 12.3325C25.7506 12.0394 26.148 11.8748 26.5625 11.8748C26.977 11.8748 27.3744 12.0394 27.6675 12.3325C27.9606 12.6256 28.1252 13.023 28.1252 13.4375C28.1252 13.8519 27.9606 14.2494 27.6675 14.5425L15.6933 26.5167C15.2528 26.957 14.7095 27.2806 14.1125 27.4583L11.875 28.125L12.5417 25.8875C12.7194 25.2905 13.043 24.7472 13.4833 24.3067L24.0525 13.7392H24.0517ZM24.0517 13.7392L26.25 15.9375" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
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