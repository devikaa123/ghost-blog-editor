import React, { useState, useEffect } from 'react';

const ImageModal = ({ isOpen, onClose, onSelectImage }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async (search = '') => {
    setLoading(true);
    try {
      let url = 'https://picsum.photos/v2/list?page=1&limit=20';
      
      const response = await fetch(url);
      const data = await response.json();
      
      // Format the images with proper URLs
      const formattedImages = data.map(img => ({
        ...img,
        download_url: img.download_url.replace('/id/', '/id/600/400/')
      }));
      
      setImages(formattedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
      // Fallback to default images if API fails
      setImages(Array.from({ length: 12 }, (_, i) => ({
        id: i,
        download_url: `https://picsum.photos/600/400?random=${i}`,
        author: `Photographer ${i + 1}`
      })));
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = images.filter(image =>
    image.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
            Select an Image
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6B7280'
            }}
          >
            ×
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3B82F6';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D1D5DB';
            }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div>Loading images...</div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {filteredImages.map((image) => (
              <div
                key={image.id}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => onSelectImage(image.download_url.replace('/600/400/', '/1200/800/'))}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3B82F6';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={image.download_url}
                  alt={`By ${image.author}`}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = `https://picsum.photos/300/200?random=${image.id}`;
                  }}
                />
                <div style={{
                  padding: '8px',
                  fontSize: '12px',
                  color: '#6B7280',
                  background: '#F9FAFB'
                }}>
                  By {image.author}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredImages.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
            No images found. Try a different search term.
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;