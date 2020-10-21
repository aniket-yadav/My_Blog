const express = require('express');
const blogController = require('../controllers/blogController');
const { requireAuth } = require('../middleware/authMiddle');
const router = express.Router();

router.get('/create', requireAuth,blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.post('/', requireAuth ,blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id',requireAuth,blogController.blog_delete);

module.exports = router;