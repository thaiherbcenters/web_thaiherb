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
    const { t, language } = useTranslation();

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
                <p className="news-subtitle">
                    {language === 'th' ? 'เกาะติดทุกความเคลื่อนไหว และอัปเดตข่าวสารล่าสุดจาก Thai Herb Centers'
                        : language === 'en' ? 'Stay tuned for all the latest updates and news from Thai Herb Centers'
                            : '随时了解泰国草药中心的最新动态和新闻'}
                </p>
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
                    <h3>{language === 'th' ? 'ไม่สามารถโหลดข่าวสารได้ในขณะนี้' : language === 'en' ? 'Unable to load news at this time' : '目前无法加载新闻'}</h3>
                    <p>{error}</p>
                </div>
            ) : posts.length === 0 ? (
                <div className="empty-container">
                    <h3>{language === 'th' ? 'ยังไม่มีข่าวสารใหม่' : language === 'en' ? 'No new news yet' : '暂无最新新闻'}</h3>
                    <p>{language === 'th' ? 'ติดตามเพจของเราเพื่อรับข่าวสารล่าสุด' : language === 'en' ? 'Follow our page for the latest updates' : '关注我们的主页获取最新动态'}</p>
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
                        {t('navbar.news')} {language === 'th' ? 'ทั้งหมด' : language === 'en' ? 'All' : '全部'}
                    </button>
                    <button className={`news-tab-btn ${filter === 'video' ? 'active' : ''}`} onClick={() => setFilter('video')}>
                        {language === 'th' ? 'วิดีโอคลิป' : language === 'en' ? 'Video Clips' : '视频'}
                    </button>
                    <button className={`news-tab-btn ${filter === 'photo' ? 'active' : ''}`} onClick={() => setFilter('photo')}>
                        {language === 'th' ? 'รูปภาพ/บทความ' : language === 'en' ? 'Photos & Articles' : '照片/文章'}
                    </button>
                </div>

                {filteredPosts.length === 0 ? (
                    <div className="empty-container">
                        <h3>{language === 'th' ? 'ไม่พบโพสต์ในหมวดหมู่นี้' : language === 'en' ? 'No posts found in this category' : '未找到该类别的帖子'}</h3>
                        <p>{language === 'th' ? 'ลองเปลี่ยนหมวดหมู่เพื่อดูข่าวสารเพิ่มเติมครับ' : language === 'en' ? 'Try changing categories to see more news' : '尝试更改类别以查看更多新闻'}</p>
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
                            {!filteredPosts[0].isVideo && <div className="news-badge">{language === 'th' ? 'ข่าวล่าสุด' : language === 'en' ? 'Latest' : '最新'}</div>}
                        </div>
                        <div className="featured-content">
                            <div className="news-meta">
                                <span className="news-date">{formatDate(filteredPosts[0].created_time)}</span>
                                <span className="facebook-source">
                                    <svg className="fb-icon-small" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    {language === 'th' ? 'โพสต์จากเพจ' : language === 'en' ? 'Facebook Post' : 'Facebook 帖子'}
                                </span>
                            </div>
                            <h2 className="featured-message">
                                {filteredPosts[0].message ? (filteredPosts[0].message.length > 120 ? filteredPosts[0].message.substring(0, 120) + '...' : filteredPosts[0].message) : (language === 'th' ? 'อัปเดตกิจกรรมและข่าวสารจากหน้าเพจอย่างเป็นทางการ' : language === 'en' ? 'Official news and updates from our page' : '来自官方页面的活动的更新')}
                            </h2>
                            <p className="featured-excerpt">
                                {filteredPosts[0].message && filteredPosts[0].message.length > 120 ? filteredPosts[0].message.substring(120, 280) + '...' : ''}
                            </p>
                            <a href={filteredPosts[0].permalink_url} target="_blank" rel="noopener noreferrer" className="read-more-btn" style={{ textDecoration: 'none' }}>
                                {language === 'th' ? 'ดูต้นฉบับบน Facebook' : language === 'en' ? 'View on Facebook' : '在 Facebook 上查看'} <span className="arrow">→</span>
                            </a>
                        </div>
                    </div>

                    {filteredPosts.length > 1 && (
                        <>
                            <div className="news-section-title">
                                <h3>{language === 'th' ? 'ข่าวสารอื่นๆ' : language === 'en' ? 'Other News' : '其他新闻'}</h3>
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
                                                        <span>{language === 'th' ? 'ดูรูปภาพ' : language === 'en' ? 'View Image' : '查看图片'}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid-content">
                                            <div className="news-meta">
                                                <span className="news-date">{formatDate(post.created_time)}</span>
                                            </div>
                                            <p className="grid-message">
                                                {post.message ? (post.message.length > 130 ? post.message.substring(0, 130) + '...' : post.message) : (language === 'th' ? 'ไม่มีข้อความ...' : language === 'en' ? 'No text...' : '没有文字...')}
                                            </p>
                                            <a href={post.permalink_url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', paddingTop: '15px', color: '#10b981', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                {language === 'th' ? 'ดูต้นฉบับ' : language === 'en' ? 'View Original' : '查看原贴'} <span style={{ fontSize: '1.2rem' }}>→</span>
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
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
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
                                        {language === 'th' ? 'ไม่มีรูปภาพ หรือวิดีโอ' : language === 'en' ? 'No images or videos' : '没有图片或视频'}
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
                                    {activePost.message || (language === 'th' ? 'ติดตามเรื่องราวและความเคลื่อนไหวล่าสุดจากเพจ Thai Herb Centers ได้ที่นี่' : language === 'en' ? 'Follow the latest stories and updates from the Thai Herb Centers page here' : '在此处关注泰国草药中心主页的最新故事和动态')}
                                </div>
                                <a href={activePost.permalink_url} target="_blank" rel="noopener noreferrer" className="modal-fb-btn">
                                    {language === 'th' ? 'เปิดใน Facebook' : language === 'en' ? 'Open in Facebook' : '在 Facebook 打开'}
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
