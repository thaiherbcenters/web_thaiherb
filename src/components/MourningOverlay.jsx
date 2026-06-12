import React, { useState, useEffect } from 'react';
import './MourningOverlay.css';

const MourningOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [imageExists, setImageExists] = useState(true); // เช็คว่ามีรูป PC หรือไม่
  const [mobileImageExists, setMobileImageExists] = useState(true); // เช็คว่ามีรูปมือถือหรือไม่
  const [isChecking, setIsChecking] = useState(true);
  const cacheBuster = React.useMemo(() => new Date().getTime(), []);

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

  // ถ้ากำลังเช็คเวลา, ไม่มีรูป, หรือหมดเวลาแล้ว ไม่ต้องแสดงอะไรเลย
  if (isChecking || !isVisible || !imageExists) return null;

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
        src={`/images/popup/popup-ad.png?t=${cacheBuster}`} 
        alt="โฆษณา / แอด PC" 
        className={`mourning-bg-image ${mobileImageExists ? 'desktop-ad-only' : ''}`} 
        onError={(e) => {
          setImageExists(false);
        }}
      />
      {mobileImageExists && (
        <img 
          src={`/images/popup/popup-ad-mobile.png?t=${cacheBuster}`} 
          alt="โฆษณา / แอด มือถือ" 
          className="mourning-bg-image mobile-ad-only" 
          onError={(e) => {
            setMobileImageExists(false);
          }}
        />
      )}
    </div>
  );
};

export default MourningOverlay;
