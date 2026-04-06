require('dotenv').config();
const axios = require('axios');

async function testFB() {
    const pageId = process.env.FACEBOOK_PAGE_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    
    console.log('ID:', pageId ? 'Loaded' : 'Missing', pageId);
    console.log('Token:', accessToken ? 'Loaded' : 'Missing', accessToken ? accessToken.substring(0, 15) + '...' : '');

    if (!pageId || !accessToken) {
        console.log('Missing credentials in .env');
        return;
    }

    try {
        console.log('Fetching graph.facebook.com...');
        const response = await axios.get(`https://graph.facebook.com/v19.0/${pageId}/posts`, {
            params: {
                fields: 'id,message,created_time,full_picture,permalink_url',
                access_token: accessToken,
                limit: 5
            }
        });
        console.log('SUCCESS! Got data:', response.data.data.length, 'posts');
        if (response.data.data.length > 0) {
            console.log('First post:', response.data.data[0]);
        } else {
            console.log('Zero posts returned. Maybe page is empty or posts are not public?');
        }
    } catch (error) {
        console.error('ERROR from Facebook:', JSON.stringify(error.response?.data || error.message, null, 2));
    }
}

testFB();
