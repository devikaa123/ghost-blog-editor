import React, { useState, useEffect } from 'react';

const BookmarkComponent = ({ node, updateAttributes, editor }) => {
  const [isEditing, setIsEditing] = useState(!node.attrs.url);
  const [urlInput, setUrlInput] = useState(node.attrs.url || '');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch metadata when URL is set and not loaded yet
  useEffect(() => {
    if (node.attrs.url && !node.attrs.title && !node.attrs.loading && !isEditing) {
      fetchBookmarkMetadata(node.attrs.url);
    }
  }, [node.attrs.url, isEditing]);

  const fetchBookmarkMetadata = async (url) => {
    setIsLoading(true);
    updateAttributes({ loading: true, error: false });
    
    try {
      // Mock API call - in real implementation, use my-json-server.typicode.com
      const metadata = await mockFetchBookmarkMetadata(url);
      
      updateAttributes({
        ...metadata,
        loading: false,
        error: false
      });
    } catch (error) {
      updateAttributes({
        loading: false,
        error: true,
        title: 'Failed to fetch metadata',
        description: 'Could not retrieve website information',
        siteName: new URL(url).hostname
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    // Basic URL validation
    let finalUrl = urlInput.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    updateAttributes({ url: finalUrl });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setUrlInput(node.attrs.url);
  };

  const handleRemove = () => {
    // Remove the bookmark node from editor
    if (editor) {
      editor.commands.deleteNode('bookmark');
    }
  };

  // Mock API function
  const mockFetchBookmarkMetadata = async (url) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock responses for different domains
    const mockData = {
      'github.com': {
        title: 'GitHub: Where the world builds software',
        description: 'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and features, power your CI/CD and DevOps workflows, and secure code before you commit it.',
        image: 'https://picsum.photos/400/200?random=github',
        siteName: 'GitHub'
      },
      'twitter.com': {
        title: 'Twitter - It\'s what\'s happening',
        description: 'From breaking news and entertainment to sports and politics, get the full story with all the live commentary.',
        image: 'https://picsum.photos/400/200?random=twitter',
        siteName: 'Twitter'
      },
      'youtube.com': {
        title: 'YouTube',
        description: 'Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.',
        image: 'https://picsum.photos/400/200?random=youtube',
        siteName: 'YouTube'
      },
      'default': {
        title: 'Example Website',
        description: 'This is an example website description fetched from the URL.',
        image: `https://picsum.photos/400/200?random=${Date.now()}`,
        siteName: new URL(url).hostname
      }
    };

    const domain = new URL(url).hostname;
    const data = mockData[domain] || mockData.default;
    
    return data;
  };

  // Editing mode - URL input form
  if (isEditing) {
    return (
      <div style={{
        border: '2px dashed #D1D5DB',
        borderRadius: '12px',
        padding: '24px',
        backgroundColor: '#F9FAFB',
        margin: '16px 0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <span style={{ fontSize: '20px' }}>🔖</span>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111827' }}>
            Add bookmark
          </h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste URL to add bookmark..."
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '16px'
            }}
            autoFocus
          />
          
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleRemove}
              style={{
                padding: '8px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px',
                backgroundColor: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!urlInput.trim()}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: '#3B82F6',
                color: 'white',
                cursor: urlInput.trim() ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                opacity: urlInput.trim() ? 1 : 0.5
              }}
            >
              Add bookmark
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Loading state
  if (isLoading || node.attrs.loading) {
    return (
      <div style={{
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        padding: '20px',
        backgroundColor: 'white',
        margin: '16px 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid #E5E7EB',
            borderTop: '2px solid #3B82F6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span style={{ fontSize: '14px', color: '#6B7280' }}>Fetching website information...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (node.attrs.error) {
    return (
      <div style={{
        border: '1px solid #FECACA',
        borderRadius: '12px',
        padding: '20px',
        backgroundColor: '#FEF2F2',
        margin: '16px 0',
        cursor: 'pointer'
      }}
      onClick={handleEdit}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#DC2626', marginBottom: '4px' }}>
              {node.attrs.title}
            </div>
            <div style={{ fontSize: '14px', color: '#EF4444' }}>
              {node.attrs.description}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#6B7280',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '4px'
            }}
          >
            Edit
          </button>
        </div>
        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
          {node.attrs.url}
        </div>
      </div>
    );
  }

  // Display bookmark card
  return (
    <div 
      style={{
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: 'white',
        margin: '16px 0',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onClick={() => window.open(node.attrs.url, '_blank')}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#3B82F6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#E5E7EB';
      }}
    >
      {node.attrs.image && (
        <img 
          src={node.attrs.image} 
          alt={node.attrs.title}
          style={{
            width: '100%',
            height: '160px',
            objectFit: 'cover'
          }}
        />
      )}
      
      <div style={{ padding: '20px', position: 'relative' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12px',
            color: '#374151',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)'
          }}
        >
          Edit
        </button>
        
        <div style={{ marginBottom: '8px' }}>
          <div style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#111827',
            marginBottom: '4px',
            lineHeight: '1.4'
          }}>
            {node.attrs.title}
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: '#6B7280',
            lineHeight: '1.5',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {node.attrs.description}
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
          <div style={{
            width: '16px',
            height: '16px',
            backgroundColor: '#E5E7EB',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px'
          }}>
            🌐
          </div>
          <span style={{ fontSize: '12px', color: '#6B7280' }}>
            {node.attrs.siteName || new URL(node.attrs.url).hostname}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookmarkComponent;