const express = require('express');
const router = express.Router();
const facebookService = require('../services/facebook');

// GET /api/news
router.get('/', async (req, res) => {
    try {
        const posts = await facebookService.getFacebookFeeds();
        res.json({
            status: 'success',
            data: posts
        });
    } catch (error) {
        console.error('Error in GET /api/news:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch news feed'
        });
    }
});

module.exports = router;
