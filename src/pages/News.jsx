import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './News.css';

const News = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'video', 'photo'
    const [activePost, setActivePost] = useState(null); // stores the entire post object
    const [activeImageIndex, setActiveImageIndex] = useState(0); // index for photo gallery
    const { t } = useTranslation();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // If you host backend on different port or domain, you might need exact URL
                // e.g. /api/news during dev (Vite proxy handles it)
                const backendUrl = import.meta.env.VITE_API_URL || '';
                const response = await fetch(`${backendUrl}/api/news`);
                const data = await response.json();
                
                if (data.status === 'success') {
                    setPosts(data.data);
                } else {
                    throw new Error('Failed to load news');
                }
            } catch (err) {
                console.error("Error fetching news:", err);
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('th-TH', options);
    };

    return (
        <div className="news-page">
            <div className="news-header">
                <h1>{t('navbar.news')}</h1>
                <p className="news-subtitle">เกาะติดทุกความเคลื่อนไหว และอัปเดตข่าวสารล่าสุดจาก Thai Herb Centers</p>
                <div className="header-line"></div>
            </div>

            {loading ? (
                <div className="news-container">
                    <div className="skeleton-hero"></div>
                    <div className="news-grid">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="skeleton-card">
                                <div className="skeleton-img"></div>
                                <div className="skeleton-content">
                                    <div className="skeleton-text short"></div>
                                    <div className="skeleton-text"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : error ? (
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3>ไม่สามารถโหลดข่าวสารได้ในขณะนี้</h3>
                    <p>{error}</p>
                </div>
            ) : posts.length === 0 ? (
                <div className="empty-container">
                    <h3>ยังไม่มีข่าวสารใหม่</h3>
                    <p>ติดตามเพจของเราเพื่อรับข่าวสารล่าสุด</p>
                </div>
            ) : (() => {
                const filteredPosts = posts.filter(post => {
                    if (filter === 'video') return post.isVideo;
                    if (filter === 'photo') return !post.isVideo;
                    return true;
                });

                return (
                <>
                {/* Custom Tabs */}
                <div className="news-tabs">
                    <button className={`news-tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                        {t('navbar.news')} ทั้งหมด
                    </button>
                    <button className={`news-tab-btn ${filter === 'video' ? 'active' : ''}`} onClick={() => setFilter('video')}>
                        วิดีโอคลิป
                    </button>
                    <button className={`news-tab-btn ${filter === 'photo' ? 'active' : ''}`} onClick={() => setFilter('photo')}>
                        รูปภาพ/บทความ
                    </button>
                </div>

                {filteredPosts.length === 0 ? (
                    <div className="empty-container">
                        <h3>ไม่พบโพสต์ในหมวดหมู่นี้</h3>
                        <p>ลองเปลี่ยนหมวดหมู่เพื่อดูข่าวสารเพิ่มเติมครับ</p>
                    </div>
                ) : (
                <div className="news-container">
                    {/* Featured / Hero News */}
                    <div className="featured-news-card">
                        <div className="featured-image-wrapper" onClick={() => { setActivePost(filteredPosts[0]); setActiveImageIndex(0); }} style={{ cursor: 'pointer' }}>
                            {filteredPosts[0].full_picture ? (
                                <img src={filteredPosts[0].full_picture} alt="Featured News" className="featured-image" />
                            ) : (
                                <div className="featured-image placeholder">
                                    <span>THAI HERB CENTERS</span>
                                </div>
                            )}
                            {filteredPosts[0].isVideo && (
                                <div className="video-indicator-large">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            )}
                            {!filteredPosts[0].isVideo && <div className="news-badge">ข่าวล่าสุด</div>}
                        </div>
                        <div className="featured-content">
                            <div className="news-meta">
                                <span className="news-date">{formatDate(filteredPosts[0].created_time)}</span>
                                <span className="facebook-source">
                                    <svg className="fb-icon-small" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    โพสต์จากเพจ
                                </span>
                            </div>
                            <h2 className="featured-message">
                                {filteredPosts[0].message ? (filteredPosts[0].message.length > 120 ? filteredPosts[0].message.substring(0, 120) + '...' : filteredPosts[0].message) : 'อัปเดตกิจกรรมและข่าวสารจากหน้าเพจอย่างเป็นทางการ'}
                            </h2>
                            <p className="featured-excerpt">
                                {filteredPosts[0].message && filteredPosts[0].message.length > 120 ? filteredPosts[0].message.substring(120, 280) + '...' : ''}
                            </p>
                            <a href={filteredPosts[0].permalink_url} target="_blank" rel="noopener noreferrer" className="read-more-btn" style={{ textDecoration: 'none' }}>
                                ดูต้นฉบับบน Facebook <span className="arrow">→</span>
                            </a>
                        </div>
                    </div>

                    {filteredPosts.length > 1 && (
                        <>
                            <div className="news-section-title">
                                <h3>ข่าวสารอื่นๆ</h3>
                            </div>
                            <div className="news-grid">
                                {filteredPosts.slice(1).map((post) => (
                                    <div key={post.id} className="grid-news-card">
                                        <div className="grid-image-wrapper" onClick={() => { setActivePost(post); setActiveImageIndex(0); }} style={{ cursor: 'pointer' }}>
                                            {post.full_picture ? (
                                                <img src={post.full_picture} alt="News thumbnail" className="grid-image" loading="lazy" />
                                            ) : (
                                                <div className="grid-image placeholder">THAI HERB</div>
                                            )}
                                            {post.isVideo && (
                                                <div className="video-indicator-small">
                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {!post.isVideo && (
                                                <div className="hover-overlay-link" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                                                    <div className="hover-overlay">
                                                        <span>ดูรูปภาพ</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid-content">
                                            <div className="news-meta">
                                                <span className="news-date">{formatDate(post.created_time)}</span>
                                            </div>
                                            <p className="grid-message">
                                                {post.message ? (post.message.length > 130 ? post.message.substring(0, 130) + '...' : post.message) : 'ไม่มีข้อความ...'}
                                            </p>
                                            <a href={post.permalink_url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', paddingTop: '15px', color: '#10b981', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                ดูต้นฉบับ <span style={{ fontSize: '1.2rem' }}>→</span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                )}

                {/* Video / Photo Gallery Modal Split Layout */}
                {activePost && (
                    <div className="video-modal-overlay" onClick={() => setActivePost(null)}>
                        <div className="video-modal-content split-layout" onClick={(e) => e.stopPropagation()}>
                            <button className="video-modal-close" onClick={() => setActivePost(null)}>✕</button>
                            
                            <div className="modal-left-video">
                                {activePost.isVideo ? (
                                    <iframe 
                                        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(activePost.permalink_url)}&show_text=false`} 
                                        style={{ border: 'none', overflow: 'hidden', width: '100%', height: '100%' }} 
                                        scrolling="no" 
                                        frameBorder="0" 
                                        allowFullScreen={true} 
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen">
                                    </iframe>
                                ) : activePost.images && activePost.images.length > 0 ? (
                                    <div className="modal-gallery-container">
                                        <img key={activeImageIndex} src={activePost.images[activeImageIndex]} alt="Gallery view" className="modal-gallery-image" />
                                        
                                        {activePost.images.length > 1 && (
                                            <>
                                                <button className="gallery-nav-btn prev" onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => prev === 0 ? activePost.images.length - 1 : prev - 1); }}>
                                                    ❮
                                                </button>
                                                <button className="gallery-nav-btn next" onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => prev === activePost.images.length - 1 ? 0 : prev + 1); }}>
                                                    ❯
                                                </button>
                                                <div className="gallery-indicators">
                                                    {activePost.images.map((_, idx) => (
                                                        <span 
                                                            key={idx} 
                                                            className={`gallery-dot ${idx === activeImageIndex ? 'active' : ''}`} 
                                                            onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                                                        ></span>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                        ไม่มีรูปภาพ หรือวิดีโอ
                                    </div>
                                )}
                            </div>
                            
                            <div className="modal-right-caption">
                                <div className="modal-author-header">
                                    <div className="modal-author-avatar">
                                        <img src="/logo-icon.png" alt="Thai Herb Centers" />
                                    </div>
                                    <div className="modal-author-info">
                                        <h4>Thai Herb Centers</h4>
                                        <span>{formatDate(activePost.created_time)}</span>
                                    </div>
                                </div>
                                <div className="modal-caption-text">
                                    {activePost.message || 'ติดตามเรื่องราวและความเคลื่อนไหวล่าสุดจากเพจ Thai Herb Centers ได้ที่นี่'}
                                </div>
                                <a href={activePost.permalink_url} target="_blank" rel="noopener noreferrer" className="modal-fb-btn">
                                    เปิดใน Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                )}
                </>
                );
            })()}
        </div>
    );
};

export default News;
