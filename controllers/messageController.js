// controllers/messageController.js
const axios = require('axios');
const config = require('../config/config');

async function sendPrivateReply(commentId, text) {
    const url = `https://graph.instagram.com/${config.IG_PRO_USER_ID}/messages`;
    const data = {
        recipient: { comment_id: commentId },
        message: { text: text },
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.INSTAGRAM_USER_ACCESS_TOKEN}`,
            },
        });
        console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Error sending message:', error.response.data);
    }
}

async function handleComment(commentData) {
    const commentId = commentData.id;
    const userId = commentData.from.id; // Get the user ID from the comment data
    const replyText = "Thank you for your comment!"; // Customize your reply

    await sendPrivateReply(commentId, replyText);
}

module.exports = { handleComment };