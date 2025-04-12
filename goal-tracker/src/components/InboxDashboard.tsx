import React, { useState } from 'react';
import { FiSearch, FiStar, FiFilter, FiMessageSquare, FiPaperclip, FiMail } from 'react-icons/fi';

// Mock data for messages
const mockMessages = [
  {
    id: 'm1',
    sender: 'Emily Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    subject: 'Q3 Marketing Campaign Ideas',
    preview: 'Hey team! I wanted to share some early thoughts on our Q3 campaign strategy...',
    date: '10:24 AM',
    isRead: false,
    isStarred: true,
    hasAttachment: true,
    tags: ['marketing', 'important']
  },
  {
    id: 'm2',
    sender: 'David Chen',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    subject: 'Product roadmap feedback',
    preview: "I've reviewed the roadmap and have a few suggestions for our upcoming features...",
    date: 'Yesterday',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    tags: ['product']
  },
  {
    id: 'm3',
    sender: 'Sarah Williams',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    subject: 'Website redesign update',
    preview: 'The design team has completed the first round of mockups for the website...',
    date: 'Feb 17',
    isRead: true,
    isStarred: false,
    hasAttachment: true,
    tags: ['design']
  },
  {
    id: 'm4',
    sender: 'Michael Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    subject: 'Budget approval needed',
    preview: 'Can you review and approve the Q2 budget proposal before Friday meeting?',
    date: 'Feb 16',
    isRead: false,
    isStarred: true,
    hasAttachment: false,
    tags: ['finance', 'urgent']
  },
  {
    id: 'm5',
    sender: 'Amanda Lee',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    subject: 'Team offsite planning',
    preview: "I'd like to start planning our team offsite for next quarter. Do you have any...",
    date: 'Feb 15',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    tags: ['team']
  },
  {
    id: 'm6',
    sender: 'Project System',
    avatar: '',
    subject: '[Task] New task assigned: Update documentation',
    preview: 'You have been assigned a new task by Alex Thompson. Due date: March 5',
    date: 'Feb 14',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    tags: ['system', 'task']
  }
];

// Filter options
const filters = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'starred', label: 'Starred' },
  { id: 'with-attachments', label: 'With attachments' }
];

const InboxDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter messages based on active filter and search query
  const filteredMessages = mockMessages.filter(message => {
    // Apply filter
    if (activeFilter === 'unread' && message.isRead) return false;
    if (activeFilter === 'starred' && !message.isStarred) return false;
    if (activeFilter === 'with-attachments' && !message.hasAttachment) return false;
    
    // Apply search if there's a query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        message.sender.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.preview.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: 'var(--background-color)',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Inbox Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 30px',
        borderBottom: '1px solid #eee'
      }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: '500',
          color: 'var(--text-color)' 
        }}>
          Inbox
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '8px 16px',
            width: '240px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
          }}>
            <FiSearch size={16} color="#777" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Search inbox..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-color)',
                outline: 'none',
                width: '100%',
                fontSize: '14px'
              }}
            />
          </div>
          
          <button style={{
            backgroundColor: 'white',
            border: '1px solid #eee',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <FiFilter size={16} color="#777" />
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div style={{
        display: 'flex',
        padding: '15px 30px',
        gap: '10px',
        borderBottom: '1px solid #eee'
      }}>
        {filters.map(filter => (
          <button 
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            style={{
              backgroundColor: activeFilter === filter.id ? 'var(--primary-color)' : 'white',
              color: activeFilter === filter.id ? 'white' : 'var(--text-color)',
              border: '1px solid ' + (activeFilter === filter.id ? 'var(--primary-color)' : '#eee'),
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Messages */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '10px 20px'
      }}>
        {filteredMessages.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'var(--light-text)'
          }}>
            <FiMail size={40} style={{ marginBottom: '15px', opacity: 0.5 }} />
            <p>No messages match your criteria</p>
          </div>
        ) : (
          filteredMessages.map(message => (
            <MessageItem key={message.id} message={message} />
          ))
        )}
      </div>
      
      {/* Compose Button */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        right: '30px'
      }}>
        <button style={{
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer'
        }}>
          <FiMessageSquare size={24} />
        </button>
      </div>
    </div>
  );
};

interface MessageItemProps {
  message: {
    id: string;
    sender: string;
    avatar: string;
    subject: string;
    preview: string;
    date: string;
    isRead: boolean;
    isStarred: boolean;
    hasAttachment: boolean;
    tags: string[];
  };
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 15px',
      borderBottom: '1px solid #eee',
      backgroundColor: message.isRead ? 'white' : 'rgba(86, 100, 210, 0.05)',
      borderLeft: message.isRead ? '3px solid transparent' : '3px solid var(--primary-color)',
      borderRadius: '8px',
      marginBottom: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      position: 'relative'
    }}>
      {/* Avatar */}
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '15px',
        backgroundColor: message.avatar ? 'transparent' : '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#777',
        fontWeight: '500',
        fontSize: '16px',
        overflow: 'hidden'
      }}>
        {message.avatar ? (
          <img src={message.avatar} alt={message.sender} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          message.sender.charAt(0)
        )}
      </div>
      
      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ 
            fontSize: '14px',
            fontWeight: message.isRead ? '400' : '600',
            margin: 0,
            color: 'var(--text-color)'
          }}>
            {message.sender}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontSize: '12px',
              color: message.isRead ? 'var(--light-text)' : 'var(--primary-color)',
              fontWeight: message.isRead ? '400' : '500'
            }}>
              {message.date}
            </span>
            {message.isStarred && (
              <FiStar 
                size={16} 
                color="var(--warning-color)" 
                fill="var(--warning-color)" 
              />
            )}
          </div>
        </div>
        
        <h4 style={{ 
          fontSize: '14px',
          fontWeight: message.isRead ? '400' : '600',
          margin: '4px 0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: 'var(--text-color)'
        }}>
          {message.subject}
        </h4>
        
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <p style={{ 
            fontSize: '13px',
            color: 'var(--light-text)',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1
          }}>
            {message.preview}
          </p>
          
          {message.hasAttachment && (
            <FiPaperclip size={14} color="var(--light-text)" />
          )}
          
          {message.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '5px' }}>
              {message.tags.slice(0, 2).map(tag => (
                <span key={tag} style={{
                  fontSize: '11px',
                  padding: '2px 6px',
                  backgroundColor: tagColors[tag] || '#f0f0f0',
                  color: getTextColorForTag(tag),
                  borderRadius: '4px',
                  whiteSpace: 'nowrap'
                }}>
                  {tag}
                </span>
              ))}
              {message.tags.length > 2 && (
                <span style={{
                  fontSize: '11px',
                  color: 'var(--light-text)'
                }}>
                  +{message.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Tag colors for different categories
const tagColors: Record<string, string> = {
  'important': '#ffebee',
  'urgent': '#fff3e0',
  'marketing': '#e8f5e9',
  'product': '#e3f2fd',
  'design': '#f3e5f5',
  'finance': '#e0f7fa',
  'team': '#f1f8e9',
  'system': '#f5f5f5',
  'task': '#ede7f6'
};

// Function to determine text color based on background
const getTextColorForTag = (tag: string): string => {
  switch (tag) {
    case 'important':
      return '#c62828';
    case 'urgent':
      return '#ef6c00';
    case 'marketing':
      return '#2e7d32';
    case 'product':
      return '#1565c0';
    case 'design':
      return '#7b1fa2';
    case 'finance':
      return '#00838f';
    case 'team':
      return '#558b2f';
    case 'system':
    case 'task':
      return '#616161';
    default:
      return '#757575';
  }
};

export default InboxDashboard; 