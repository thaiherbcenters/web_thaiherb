const axios = require('axios');

// In-memory cache to prevent hitting API limits
let newsCache = {
    data: null,
    lastFetched: null
};

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Generate some mock posts for development
const generateMockPosts = () => {
    return [
        {
            id: 'mock_1',
            message: '🎉 โปรโมชั่นพิเศษต้อนรับเดือนใหม่! 🎉\nลดราคาพิเศษ 20% สำหรับสมุนไพรทั้งหมด วันนี้ถึงสิ้นเดือนเท่านั้น\nรีบจับจองกันเลยครับ \n\n#โปรโมชั่น #สมุนไพร',
            created_time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            full_picture: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            permalink_url: 'https://www.facebook.com/'
        },
        {
            id: 'mock_2',
            message: 'ความรู้เรื่องสมุนไพรน่ารู้ 🌿\nรู้หรือไม่ว่าฟ้าทะลายโจรมีสรรพคุณในการช่วยลดไข้และบรรเทาอาการเจ็บคอได้อย่างดีเยี่ยม \nใครมีอาการลองนำไปใช้ดูนะครับ',
            created_time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            full_picture: null,
            permalink_url: 'https://www.facebook.com/'
        },
        {
            id: 'mock_3',
            message: 'อัปเดตสต็อกสินค้าใหม่!\nตอนนี้สินค้ากลุ่มน้ำมันนวดสมุนไพรเข้ามาเต็มสต็อกแล้วครับ ลูกค้าที่พรีออเดอร์ไว้เรากำลังเร่งจัดส่งให้ครบทุกท่าน ขอบคุณที่ไว้วางใจเราครับ 🙏',
            created_time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            full_picture: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            permalink_url: 'https://www.facebook.com/'
        },
        {
            id: 'mock_4',
            message: 'รีวิวจริงจากลูกค้าที่น่ารัก 🥰\n"ใช้ดีมากค่ะ อาการปวดเมื่อยลดลงอย่างเห็นได้ชัด กลิ่นหอมทะลุกล่องเลย"\n-\nขอบคุณลูกค้าทุกท่านที่เป็นกำลังใจให้เราพัฒนาสินค้าต่อไป',
            created_time: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
            full_picture: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            permalink_url: 'https://www.facebook.com/'
        },
        {
            id: 'mock_5',
            message: 'แจ้งวันหยุดทำการ...\nทางร้านจะหยุดให้บริการในวันคล้ายวันสงกรานต์ 13-15 เมษายนนี้ \nขอให้ทุกท่านเดินทางกลับบ้านและพักผ่อนอย่างปลอดภัยครับ 💦',
            created_time: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
            full_picture: null,
            permalink_url: 'https://www.facebook.com/'
        }
    ];
};

const getFacebookFeeds = async () => {
    // Check if cache is valid
    if (newsCache.data && newsCache.lastFetched) {
        const timeElapsed = Date.now() - newsCache.lastFetched.getTime();
        if (timeElapsed < CACHE_TTL_MS) {
            console.log('Returning news feed from cache');
            return newsCache.data;
        }
    }

    // Try to get real API credentials from environment if available
    const pageId = process.env.FACEBOOK_PAGE_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!accessToken) {
        console.log('No Facebook credentials found. Returning MOCK data.');
        const mockData = generateMockPosts();
        newsCache.data = mockData;
        newsCache.lastFetched = new Date();
        return mockData;
    }

    try {
        console.log('Fetching live data from Facebook Graph API...');
        // Using /me/feed automatically maps to the Page if a Page Access Token is used!
        const response = await axios.get(`https://graph.facebook.com/v19.0/me/feed`, {
            params: {
                fields: 'id,message,created_time,full_picture,permalink_url,attachments',
                access_token: accessToken,
                limit: 20
            }
        });

        // Add an easy-to-read isVideo flag and images array based on attachments or URL
        const postsInfo = response.data.data.map(post => {
            let isVideo = false;
            let images = [];
            
            // Check attachments for video type and extract images
            if (post.attachments && post.attachments.data && post.attachments.data.length > 0) {
                const attachment = post.attachments.data[0];
                
                if (attachment.media_type === 'video') {
                    isVideo = true;
                }
                
                // Extract multiple photos if album
                if (attachment.subattachments && attachment.subattachments.data) {
                    images = attachment.subattachments.data
                        .map(sub => sub.media && sub.media.image ? sub.media.image.src : null)
                        .filter(src => src !== null);
                } 
                // Single photo
                else if (attachment.media && attachment.media.image && attachment.media.image.src) {
                    images = [attachment.media.image.src];
                }
            }
            
            // Fallback check on permalink
            if (post.permalink_url && (post.permalink_url.includes('/videos/') || post.permalink_url.includes('/reel/'))) {
                isVideo = true;
            }

            // Fallback to full_picture if images array is still empty and it's not a video
            if (images.length === 0 && post.full_picture && !isVideo) {
                images = [post.full_picture];
            }

            return {
                ...post,
                isVideo,
                images
            };
        });
        
        // Update Cache
        newsCache.data = postsInfo;
        newsCache.lastFetched = new Date();

        return postsInfo;
    } catch (error) {
        console.error('Error fetching Facebook Graph API:', error.response?.data || error.message);
        
        // If API fails, optionally return old cache if present, else empty array
        if (newsCache.data) {
            return newsCache.data;
        }
        return [];
    }
};

module.exports = {
    getFacebookFeeds
};
