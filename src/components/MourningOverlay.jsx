import React, { useState, useEffect } from 'react';
import './MourningOverlay.css';

const MourningOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [imageExists, setImageExists] = useState(true); // เช็คว่ามีรูป PC หรือไม่
  const [mobileImageExists, setMobileImageExists] = useState(true); // เช็คว่ามีรูปมือถือหรือไม่
  const [isChecking, setIsChecking] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  // ใช้ วันที่ เป็น cacheBuster เพื่อให้แคชได้ใน 1 วัน (โหลดเร็วขึ้นสำหรับคนที่เข้าซ้ำ)
  const cacheBuster = React.useMemo(() => new Date().toISOString().split('T')[0], []);

  // Check Expiration Date
  useEffect(() => {
    fetch('/images/popup/config.json?t=' + new Date().getTime())
      .then(res => res.ok ? res.json() : {})
      .then(data => {
        if (data.endDate) {
          const end = new Date(data.endDate);
          if (new Date() > end) {
            setIsVisible(false);
          }
        }
      })
      .catch(() => {})
      .finally(() => setIsChecking(false));
  }, []);

  // Prevent scrolling when overlay is active
  useEffect(() => {
    if (isVisible && imageExists && !isChecking) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible, imageExists, isChecking]);

  // ไม่ return null เพื่อให้เบราว์เซอร์เจาะ DOM และเริ่มโหลดรูปได้ทันที (Parallel loading)
  // แต่ซ่อนไว้ด้วย CSS จนกว่าจะเช็คเสร็จและรูปโหลดเสร็จ

  const handleClose = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1000); // รอให้ fade out เสร็จค่อยซ่อน (1 วินาที)
  };

  return (
    <div 
      className={`mourning-overlay ${isFadingOut ? 'fade-out' : ''}`} 
      onClick={handleClose}
      onWheel={handleClose}
      onTouchMove={handleClose}
    >
      <img 
        src={`/images/popup/popup-ad.webp?t=${cacheBuster}`} 
        alt="โฆษณา / แอด PC" 
        className={`mourning-bg-image ${mobileImageExists ? 'desktop-ad-only' : ''}`} 
        fetchpriority="high"
        onError={(e) => {
          setImageExists(false);
        }}
      />
      {mobileImageExists && (
        <img 
          src={`/images/popup/popup-ad-mobile.webp?t=${cacheBuster}`} 
          alt="โฆษณา / แอด มือถือ" 
          className={`mourning-bg-image mobile-ad-only`} 
          fetchpriority="high"
          onError={(e) => {
            setMobileImageExists(false);
          }}
        />
      )}
    </div>
  );
};

export default MourningOverlay;
