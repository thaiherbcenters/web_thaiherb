const axios = require('axios');

async function check() {
  try {
    const pageId = '100065439464838';
    const token = 'EAAXxbIz1oLIBRJY7UUJfv8Vuoxdrtqn85ZCmZAJf5oUEvfy4cv1rMlRRZAsmsFWnutB6tH8p6DB3Jzy0EItgMZAtFb0izHRi75fYEtMfMgrFviZByggXJ8I6TPle38DGrWlD0pn0d4AO3ggesjvBYWcQaTFkFFYY2lgxS7NMsZCeqlFYYVvjzHe1E4ZAeO6oMoramuKEzszw3TMdmOhoa37kBvXqW3aQ8OrUZALZC6nWvzgZDZD';
    const url = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=id,message,created_time,full_picture,permalink_url&access_token=${token}`;
    
    console.log('Fetching...');
    const res = await axios.get(url);
    console.log('SUCCESS! Data length:', res.data.data.length);
    if(res.data.data.length > 0) {
      console.log('First item:', res.data.data[0]);
    }
  } catch (err) {
    if (err.response) {
      console.log('API Error:', JSON.stringify(err.response.data, null, 2));
    } else {
      console.log('Error:', err.message);
    }
  }
}
check();
