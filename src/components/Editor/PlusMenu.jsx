import React, { useState, useRef, useEffect } from 'react';

const PlusMenu = ({ onAddBlock }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const menuItems = [
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 13L5.586 8.414C5.96106 8.03906 6.46967 7.82843 7 7.82843C7.53033 7.82843 8.03894 8.03906 8.414 8.414L13 13M11 11L12.586 9.414C12.9611 9.03906 13.4697 8.82843 14 8.82843C14.5303 8.82843 15.0389 9.03906 15.414 9.414L17 11M11 5H11.01M3 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15V3C17 2.46957 16.7893 1.96086 16.4142 1.58579C16.0391 1.21071 15.5304 1 15 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      label: 'Photo' 
    },
    { 
      icon: (
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17L13 1M17 5L21 9L17 13M5 13L1 9L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      label: 'HTML' 
    },
    { 
      icon: (
        <svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 1H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      label: 'Divider' 
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21L12 17.5L5 21V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      label: 'Bookmark' 
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.752 11.1681L11.555 9.03607C11.4043 8.9355 11.229 8.87778 11.048 8.86907C10.867 8.86037 10.687 8.90102 10.5274 8.98667C10.3677 9.07232 10.2342 9.19975 10.1414 9.35535C10.0485 9.51095 9.99961 9.68886 10 9.87007V14.1331C9.99998 14.3141 10.0491 14.4918 10.1421 14.6471C10.2352 14.8024 10.3686 14.9295 10.5282 15.0149C10.6879 15.1004 10.8677 15.1408 11.0485 15.132C11.2293 15.1233 11.4044 15.0656 11.555 14.9651L14.752 12.8331C14.889 12.7417 15.0013 12.618 15.0789 12.4729C15.1566 12.3278 15.1972 12.1657 15.1972 12.0011C15.1972 11.8365 15.1566 11.6744 15.0789 11.5293C15.0013 11.3841 14.889 11.2594 14.752 11.1681Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ), 
      label: 'Youtube' 
    },
    { 
      icon: (
        <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 10C15 11.8565 14.2625 13.637 12.9497 14.9497C11.637 16.2625 9.85652 17 8 17M8 17C6.14348 17 4.36301 16.2625 3.05025 14.9497C1.7375 13.637 1 11.8565 1 10M8 17V21M8 21H4M8 21H12M8 13C7.20435 13 6.44129 12.6839 5.87868 12.1213C5.31607 11.5587 5 10.7956 5 10V4C5 3.20435 5.31607 2.44129 5.87868 1.87868C6.44129 1.31607 7.20435 1 8 1C8.79565 1 9.55871 1.31607 10.1213 1.87868C10.6839 2.44129 11 3.20435 11 4V10C11 10.7956 10.6839 11.5587 10.1213 12.1213C9.55871 12.6839 8.79565 13 8 13Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


      ), 
      label: 'Twitter' 
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4391 10.6168V17.3084H7.56089V10.6168H0V24H24V10.6168H16.4391ZM7.56089 0H16.4411V6.69161H7.56089V0Z" fill="black"/>
</svg>

      ), 
      label: 'Unsplash' 
    }
  ];

  // Auto-open the dropdown when PlusMenu mounts
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Safe function to handle block addition
  const handleAddBlock = (blockType) => {
    console.log('handleAddBlock called with:', blockType);
    if (typeof onAddBlock === 'function') {
      onAddBlock(blockType);
    } else {
      console.error('onAddBlock is not a function:', onAddBlock);
    }
    setIsOpen(false);
  };

  return (
    <div 
      ref={menuRef}
      style={{ 
        position: 'relative',
        zIndex: 1000
      }}
    >
      {/* Plus Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid #D1D5DB',
          backgroundColor: isOpen ? '#484848ff' : '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          color: isOpen ? '#fff' : '#6B7280',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          transition: 'all 0.2s ease'
        }}
      >
        +
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '44px',
          left: '0',
          backgroundColor: '#fff',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          minWidth: '220px',
          padding: '6px 0'
        }}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleAddBlock(item.label)}
              style={{
                width: '100%',
                padding: '10px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                color: '#374151',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4e4f50ff';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#374151';
              }}
            >
              <span style={{ 
                width: '24px', 
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'inherit'
              }}>
                {item.icon}
              </span>
              <span style={{ fontWeight: '500', fontSize: '14px' }}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlusMenu;