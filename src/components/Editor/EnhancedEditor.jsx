import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import PlusMenu from './PlusMenu';
import ImageModal from './ImageModal';

const EnhancedEditor = () => {
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showFormattingToolbar, setShowFormattingToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Begin writing your post...',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
    ],
    content: `<p></p>`,
    onUpdate: ({ editor }) => {
      const isEmpty = editor.getText().trim().length === 0;
      setIsEditorEmpty(isEmpty);
      
      if (!isEmpty && showPlusMenu) {
        setShowPlusMenu(false);
      }
    },
    onFocus: () => {
      if (isEditorEmpty) {
        setShowPlusMenu(true);
      }
    },
    onBlur: () => {
      setTimeout(() => {
        setShowPlusMenu(false);
        setShowFormattingToolbar(false);
      }, 200);
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      
      // Show toolbar only when text is selected
      if (from !== to && editor.view) {
        try {
          const { view } = editor;
          const start = view.coordsAtPos(from);
          const end = view.coordsAtPos(to);
          
          // Position toolbar above the selection
          const top = start.top - 50;
          const left = (start.left + end.left) / 2 - 106; // Center the toolbar
          
          setToolbarPosition({ top, left });
          setShowFormattingToolbar(true);
        } catch (error) {
          console.log('Error positioning toolbar:', error);
        }
      } else {
        setShowFormattingToolbar(false);
      }
    },
  });

  const handleEditorClick = (event) => {
    if (editor && isEditorEmpty) {
      setShowPlusMenu(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editorRef.current && !editorRef.current.contains(event.target)) {
        setShowPlusMenu(false);
        setShowFormattingToolbar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Formatting functions
  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
    setShowFormattingToolbar(false);
  };

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
    setShowFormattingToolbar(false);
  };

  const toggleHeading2 = () => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
    setShowFormattingToolbar(false);
  };

  const toggleHeading3 = () => {
    editor.chain().focus().toggleHeading({ level: 3 }).run();
    setShowFormattingToolbar(false);
  };


  const toggleBlockquote = () => {
    editor.chain().focus().toggleBlockquote().run();
    setShowFormattingToolbar(false);
  };



  const setLink = () => {
    if (showLinkInput) {
      setShowLinkInput(false);
      setLinkUrl('');
      return;
    }
    
    const previousUrl = editor.getAttributes('link').href;
    setLinkUrl(previousUrl || '');
    setShowLinkInput(true);
  };

  const submitLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setShowLinkInput(false);
    setLinkUrl('');
    setShowFormattingToolbar(false);
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
    setShowLinkInput(false);
    setLinkUrl('');
  };

  const handleImageSelect = useCallback((imageUrl) => {
    if (!editor) return;
    editor.commands.clearContent();
    editor.commands.insertContent(`
      <div style="margin: 24px 0;">
        <img 
          src="${"https://picsum.photos/200/300"}" 
          alt="Selected from Picsum" 
          style="width: 100%; height: auto; border-radius: 8px;"
        />
      </div>
    `);
    setShowPlusMenu(false);
    setIsEditorEmpty(false);
  }, [editor]);

  // Mock API function to fetch URL metadata
  const fetchUrlMetadata = async (url) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockData = {
      'youtube.com': {
        title: 'YouTube - Amazing Tech Review',
        description: 'Check out this incredible tech review covering the latest gadgets and innovations in the industry.',
        image: 'https://picsum.photos/400/225?random=1',
        siteName: 'YouTube',
      },
      'twitter.com': {
        title: 'Twitter - Tech News',
        description: 'Breaking: Major tech announcement happening right now! Stay tuned for updates.',
        image: 'https://picsum.photos/400/225?random=2',
        siteName: 'Twitter',
      },
      'github.com': {
        title: 'GitHub - Awesome Project',
        description: 'An open-source project that revolutionizes web development workflows.',
        image: 'https://picsum.photos/400/225?random=3',
        siteName: 'GitHub',
      },
      'default': {
        title: 'Interesting Website',
        description: 'Discover amazing content on this website that will expand your knowledge.',
        image: 'https://picsum.photos/400/225?random=4',
        siteName: 'Website',
      }
    };

    const domain = Object.keys(mockData).find(domain => url.includes(domain));
    return mockData[domain] || mockData.default;
  };

  const handleBookmarkUrl = useCallback(async (url) => {
    if (!editor) return;
    
    try {
      const loadingId = 'bookmark-loading';
      editor.commands.insertContent(`
        <div id="${loadingId}" style="border: 2px dashed #D1D5DB; border-radius: 12px; padding: 24px; background: #F9FAFB; margin: 16px 0; text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px;">
            <span style="font-size: 20px;">⏳</span>
            <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">Loading bookmark...</h3>
          </div>
        </div>
      `);

      const metadata = await fetchUrlMetadata(url);
      
      const bookmarkHtml = `
        <div style="border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; margin: 16px 0; background: white; cursor: pointer; transition: all 0.2s ease;">
          <div style="display: flex; flex-direction: column; sm:flex-row;">
            <div style="flex: 1; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                  <span style="font-size: 16px;">${metadata.favicon}</span>
                  <span style="font-size: 14px; color: #6B7280; font-weight: 500;">${metadata.siteName}</span>
                </div>
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #111827; line-height: 1.4;">${metadata.title}</h3>
                <p style="margin: 0; font-size: 14px; color: #6B7280; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${metadata.description}</p>
              </div>
              <div style="margin-top: 16px;">
                <span style="font-size: 14px; color: #727273ff;">${url}</span>
              </div>
            </div>
            <div style="width: 100%; sm:width: 200px; height: 150px; sm:height: auto;">
              <img 
                src="${metadata.image}" 
                alt="${metadata.title}"
                style="width: 100%; height: 100%; object-fit: cover;"
              />
            </div>
          </div>
        </div>
      `;

      const currentContent = editor.getHTML();
      const updatedContent = currentContent.replace(
        `<div id="${loadingId}"`,
        bookmarkHtml
      );
      
      editor.commands.setContent(updatedContent);
      
    } catch (error) {
      console.error('Error creating bookmark:', error);
      editor.commands.insertContent(`
        <div style="border: 2px dashed #797676ff; border-radius: 12px; padding: 24px; background: #FEF2F2; margin: 16px 0; text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px;">
            <span style="font-size: 20px;">❌</span>
            <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #DC2626;">Failed to load bookmark</h3>
          </div>
          <p style="margin: 0; color: #343232ff; font-size: 14px;">Please check the URL and try again.</p>
        </div>
      `);
    }
  }, [editor]);

  const onAddBlock = useCallback((blockType) => {
    if (!editor) return;

    editor.commands.clearContent();

    switch (blockType) {
      case 'Photo':
        setShowImageModal(true);
        return;

      case 'HTML':
        editor.commands.setCodeBlock();
        editor.commands.insertContent('<!-- Add your HTML code here -->');
        break;

      case 'Divider':
        editor.commands.setHorizontalRule();
        break;

      case 'Bookmark':
        editor.commands.insertContent(`
          <div style="border: 2px dashed #D1D5DB; border-radius: 12px; padding: 24px; background: #F9FAFB; margin: 16px 0;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
              <span style="font-size: 20px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21L12 17.5L5 21V5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
              <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">Add bookmark</h3>
            </div>
            <div style="display: flex; gap: 8px;">
              <input 
                type="url" 
                id="bookmark-url-input"
                placeholder="Paste URL to add bookmark..." 
                style="flex: 1; padding: 12px 16px; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 14px; outline: none;"
                onblur="this.style.borderColor='#D1D5DB'"
                onfocus="this.style.borderColor='#656567ff'"
              />
              <button 
                onclick="
                  const input = document.getElementById('bookmark-url-input');
                  const url = input.value.trim();
                  if (url) {
                    input.disabled = true;
                    const event = new CustomEvent('bookmarkUrlSubmit', { detail: url });
                    document.dispatchEvent(event);
                  }
                "
                style="padding: 12px 20px; background: #6a6a6bff; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;"
              >
                Add
              </button>
            </div>
          </div>
        `);
        
        const handleBookmarkSubmit = (event) => {
          handleBookmarkUrl(event.detail);
          document.removeEventListener('bookmarkUrlSubmit', handleBookmarkSubmit);
        };
        document.addEventListener('bookmarkUrlSubmit', handleBookmarkSubmit);
        break;

      case 'Youtube':
        editor.commands.insertContent(`
          <div style="border: 1px solid #E5E7EB; border-radius: 12px; padding: 24px; background: #F9FAFB; margin: 16px 0;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
              <span style="font-size: 20px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.752 11.1681L11.555 9.03607C11.4043 8.9355 11.229 8.87778 11.048 8.86907C10.867 8.86037 10.687 8.90102 10.5274 8.98667C10.3677 9.07232 10.2342 9.19975 10.1414 9.35535C10.0485 9.51095 9.99961 9.68886 10 9.87007V14.1331C9.99998 14.3141 10.0491 14.4918 10.1421 14.6471C10.2352 14.8024 10.3686 14.9295 10.5282 15.0149C10.6879 15.1004 10.8677 15.1408 11.0485 15.132C11.2293 15.1233 11.4044 15.0656 11.555 14.9651L14.752 12.8331C14.889 12.7417 15.0013 12.618 15.0789 12.4729C15.1566 12.3278 15.1972 12.1657 15.1972 12.0011C15.1972 11.8365 15.1566 11.6744 15.0789 11.5293C15.0013 11.3841 14.889 11.2594 14.752 11.1681Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
              <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">Embed YouTube Video</h3>
            </div>
            <div style="display: flex; gap: 8px;">
              <input 
                type="url" 
                id="youtube-url-input"
                placeholder="Paste YouTube URL..." 
                style="flex: 1; padding: 12px 16px; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 14px; outline: none;"
                onblur="this.style.borderColor='#D1D5DB'"
                onfocus="this.style.borderColor='#696a6aff'"
              />
              <button 
                onclick="
                  const input = document.getElementById('youtube-url-input');
                  const url = input.value.trim();
                  if (url) {
                    input.disabled = true;
                    const event = new CustomEvent('youtubeUrlSubmit', { detail: url });
                    document.dispatchEvent(event);
                  }
                "
                style="padding: 12px 20px; background: #6d6d6eff; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;"
              >
                Embed
              </button>
            </div>
          </div>
        `);
        
        const handleYoutubeSubmit = (event) => {
          const videoId = event.detail.split('v=')[1]?.split('&')[0] || 'dQw4w9WgXcQ';
          const embedHtml = `
            <div style="margin: 24px 0;">
              <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px;">
                <iframe 
                  src="https://www.youtube.com/embed/${videoId}" 
                  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          `;
          
          const currentContent = editor.getHTML();
          const updatedContent = currentContent.replace(
            /<div[^>]*id="youtube-url-input"[^>]*>[\s\S]*?<\/div>/,
            embedHtml
          );
          editor.commands.setContent(updatedContent);
          document.removeEventListener('youtubeUrlSubmit', handleYoutubeSubmit);
        };
        document.addEventListener('youtubeUrlSubmit', handleYoutubeSubmit);
        break;

      case 'Twitter':
        editor.commands.insertContent(`
          <div style="border: 1px solid #E5E7EB; border-radius: 12px; padding: 24px; background: #F9FAFB; margin: 16px 0;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
              <span style="font-size: 20px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 11C19 12.8565 18.2625 14.637 16.9497 15.9497C15.637 17.2625 13.8565 18 12 18M12 18C10.1435 18 8.36301 17.2625 7.05025 15.9497C5.7375 14.637 5 12.8565 5 11M12 18V22M12 22H8M12 22H16M12 14C11.2044 14 10.4413 13.6839 9.87868 13.1213C9.31607 12.5587 9 11.7956 9 11V5C9 4.20435 9.31607 3.44129 9.87868 2.87868C10.4413 2.31607 11.2044 2 12 2C12.7956 2 13.5587 2.31607 14.1213 2.87868C14.6839 3.44129 15 4.20435 15 5V11C15 11.7956 14.6839 12.5587 14.1213 13.1213C13.5587 13.6839 12.7956 14 12 14Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
              <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">Embed Tweet</h3>
            </div>
            <div style="display: flex; gap: 8px;">
              <input 
                type="url" 
                id="twitter-url-input"
                placeholder="Paste Twitter URL..." 
                style="flex: 1; padding: 12px 16px; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 14px; outline: none;"
                onblur="this.style.borderColor='#D1D5DB'"
                onfocus="this.style.borderColor='#6d6d6eff'"
              />
              <button 
                onclick="
                  const input = document.getElementById('twitter-url-input');
                  const url = input.value.trim();
                  if (url) {
                    input.disabled = true;
                    const event = new CustomEvent('twitterUrlSubmit', { detail: url });
                    document.dispatchEvent(event);
                  }
                "
                style="padding: 12px 20px; background: #89898bff; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;"
              >
                Embed
              </button>
            </div>
          </div>
        `);
        
        const handleTwitterSubmit = (event) => {
          const tweetId = event.detail.split('/status/')[1]?.split('?')[0] || '123456789';
          const embedHtml = `
            <div style="margin: 24px 0; background: white; border: 1px solid #E1E8ED; border-radius: 12px; padding: 16px; max-width: 500px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: #1DA1F2; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">T</div>
                <div>
                  <div style="font-weight: bold; color: #14171A;">Twitter User</div>
                  <div style="color: #657786; font-size: 14px;">@twitteruser</div>
                </div>
              </div>
              <div style="color: #14171A; line-height: 1.5; margin-bottom: 12px;">
                This is a mock Twitter embed. In a real application, this would show the actual tweet content from the provided URL.
              </div>
              <div style="color: #657786; font-size: 14px;">10:30 AM · Oct 18, 2024</div>
            </div>
          `;
          
          const currentContent = editor.getHTML();
          const updatedContent = currentContent.replace(
            /<div[^>]*id="twitter-url-input"[^>]*>[\s\S]*?<\/div>/,
            embedHtml
          );
          editor.commands.setContent(updatedContent);
          document.removeEventListener('twitterUrlSubmit', handleTwitterSubmit);
        };
        document.addEventListener('twitterUrlSubmit', handleTwitterSubmit);
        break;

      case 'Unsplash':
        setShowImageModal(true);
        return;

      default:
        break;
    }
    
    setShowPlusMenu(false);
    setIsEditorEmpty(false);
  }, [editor, handleBookmarkUrl]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div ref={editorRef} style={{ position: 'relative' }}>
      {/* Floating Formatting Toolbar */}
      {showFormattingToolbar && (
        <div
          ref={toolbarRef}
          style={{
            position: 'absolute',
            top: `${toolbarPosition.top}px`,
            left: `${toolbarPosition.left}px`,
            width: '212px',
            height: '40px',
            minWidth: '128px',
            opacity: 1,
            borderRadius: '6px',
            border: '1px solid #D1D5DC',
            background: '#FFFFFF',
            boxShadow: '0px 2px 4px -2px #0000001A, 0px 4px 6px -1px #0000001A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
            zIndex: 1000,
          }}
        >
          {/* Bold */}
          <FormatButton 
            active={editor.isActive('bold')}
            onClick={toggleBold}
            title="Bold"
            isFloating={true}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path 
                d="M15.625 5.625V4.375H7.5V5.625H10.7125L7.98125 14.375H4.375V15.625H12.5V14.375H9.2875L12.0187 5.625H15.625Z" 
                fill={editor.isActive('bold') ? '#101111ff' : '#212529'}
              />
            </svg>
          </FormatButton>

          {/* Italic */}
          <FormatButton 
            active={editor.isActive('italic')}
            onClick={toggleItalic}
            title="Italic"
            isFloating={true}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path 
                d="M4.49902 16.2618V3.37439H6.44346V8.97488H12.8683V3.37439H14.819V16.2618H12.8683V10.6424H6.44346V16.2618H4.49902Z" 
                fill={editor.isActive('italic') ? '#3B82F6' : '#212529'}
              />
            </svg>
          </FormatButton>

          
          

          {/* Link */}
          <FormatButton 
            active={editor.isActive('link')}
            onClick={setLink}
            title="Link"
            isFloating={true}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path 
                d="M8.5 11.5C8.91421 12.3284 9.57164 13 10.4142 13C11.5198 13 12.4142 12.1056 12.4142 11C12.4142 9.89443 11.5198 9 10.4142 9C9.57164 9 8.91421 9.67157 8.5 10.5M6.5 13.5C5.67157 12.9142 5 12.0716 5 11C5 9.34315 6.34315 8 8 8C9.65685 8 11 9.34315 11 11C11 12.0716 10.3284 12.9142 9.5 13.5M14.5 8.5C15.3284 9.08579 16 9.92836 16 11C16 12.6569 14.6569 14 13 14C11.3431 14 10 12.6569 10 11C10 9.92836 10.6716 9.08579 11.5 8.5" 
                stroke={editor.isActive('link') ? '#3B82F6' : '#212529'}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </FormatButton>
        </div>
      )}

      {/* More Options Button - appears next to the main toolbar */}
      {showFormattingToolbar && (
        <div
          style={{
            position: 'absolute',
            top: `${toolbarPosition.top}px`,
            left: `${toolbarPosition.left + 212}px`,
            marginLeft: '4px',
          }}
        >
          <button
            onClick={() => {
              // This would open a dropdown with more formatting options
              console.log('More options clicked');
            }}
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #D1D5DC',
              borderRadius: '6px',
              background: '#364153',
              cursor: 'pointer',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
            title="More formatting options"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path 
                d="M4 6L8 10L12 6" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Editor */}
      <div 
        style={{
          width: '740px',
          maxWidth: '740px',
          minHeight: '400px',
          borderRadius: '8px',
          padding: '0',
          backgroundColor: '#ffffff',
          position: 'relative',
          cursor: 'text'
        }}
        onClick={handleEditorClick}
      >
        {showPlusMenu && isEditorEmpty && (
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 1000
          }}>
            <PlusMenu onAddBlock={onAddBlock} />
          </div>
        )}

        <div style={{ 
          minHeight: '400px', 
          padding: '20px',
          position: 'relative',
          zIndex: 1
        }}>
          <EditorContent 
            editor={editor} 
            style={{
              minHeight: '400px',
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              lineHeight: '1.6',
              outline: 'none',
              backgroundColor: 'transparent',
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      </div>

      <ImageModal 
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onSelectImage={handleImageSelect}
      />
    </div>
  );
};

// Updated Format Button Component
const FormatButton = ({ active, onClick, title, children, isFloating = false }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      width: isFloating ? '32px' : '32px',
      height: isFloating ? '32px' : '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: active ? (isFloating ? '#E5E7EB' : '#3B82F6') : 'transparent',
      color: active ? (isFloating ? '#2a2c2eff' : 'white') : '#374151',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.target.style.backgroundColor = isFloating ? '#F3F4F6' : '#F3F4F6';
        if (isFloating) {
          e.target.style.color = '#374151';
        }
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.target.style.backgroundColor = 'transparent';
        if (isFloating) {
          e.target.style.color = '#374151';
        }
      }
    }}
  >
    {children}
  </button>
);

export default EnhancedEditor;