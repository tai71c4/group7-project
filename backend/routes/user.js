const express = require('express');
const router = express.Router();

// Import controller
const userController = require('../controllers/userController');

// Định nghĩa các đường dẫn (endpoints)
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

// DÒNG NÀY RẤT QUAN TRỌNG!
// Nó xuất (export) cái router này ra để server.js có thể "require" và "use"
module.exports = router;