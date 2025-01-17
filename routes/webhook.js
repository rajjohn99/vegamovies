// routes/webhook.js
const express = require('express');
const { handleComment } = require('../controllers/messageController');

const router = express.Router();

// Verify webhook callback URL
router.get('/', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
            console.log('Webhook verified');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// Handle incoming comments
// router.post('/', (req, res) => {
//     const data = req.body;

//     if (data.object === 'instagram') {
//         data.entry.forEach(entry => {
//             entry.changes.forEach(change => {
//                 if (change.field === 'comments') {
//                     handleComment(change.value);
//                 }
//             });
//         });
//         res.sendStatus(200); // Respond with 200 to avoid looping
//     } else {
//         res.sendStatus(404);
//     }
// });
// routes/webhook.js


// router.post('/', (req, res) => {
//     const data = req.body;
//     console.log('Received webhook data:', JSON.stringify(data, null, 2)); // Log the incoming data

//     if (data.object === 'instagram') {
//         if (data.entry && Array.isArray(data.entry)) {
//             data.entry.forEach(entry => {
//                 if (entry.changes && Array.isArray(entry.changes)) {
//                     entry.changes.forEach(change => {
//                         if (change.field === 'comments') {
//                             handleComment(change.value);
//                         }
//                     });
//                 } else {
//                     console.error('No changes found in entry:', entry);
//                 }
//             });
//         } else {
//             console.error('No entries found in data:', data);
//         }
//         res.sendStatus(200); // Respond with 200 to avoid looping
//     } else {
//         res.sendStatus(404);
//     }
// });

router.post('/', (req, res) => {
    const data = req.body;
    console.log('Received webhook data:', JSON.stringify(data, null, 2)); // Log the incoming data

    // Check if the object is 'instagram'
    if (data.object === 'instagram') {
        // Check if entry is an array
        if (Array.isArray(data.entry)) {
            data.entry.forEach(entry => {
                // Check if changes is an array
                if (Array.isArray(entry.changes)) {
                    entry.changes.forEach(change => {
                        // Check if the change is of type 'comments'
                        if (change.field === 'comments') {
                            console.log('Processing comment change:', change.value);
                            handleComment(change.value); // Process the comment
                        } else {
                            console.log('Ignoring non-comment change:', change);
                        }
                    });
                } else {
                    console.error('Entry changes is not an array or is undefined:', entry);
                }
            });
        } else {
            console.error('Data entry is not an array or is undefined:', data);
        }
        return res.sendStatus(200); // Respond with 200 to avoid looping
    } else {
        console.error('Received object is not instagram:', data);
        return res.sendStatus(404);
    }
});

// In your webhook.js
// const processedComments = new Set(); // Store processed comment IDs

// router.post('/', (req, res) => {
//     const data = req.body;
//     console.log('Received webhook data:', JSON.stringify(data, null, 2));

//     if (data.object === 'instagram') {
//         if (Array.isArray(data.entry)) {
//             data.entry.forEach(entry => {
//                 if (Array.isArray(entry.changes)) {
//                     entry.changes.forEach(change => {
//                         if (change.field === 'comments') {
//                             const commentId = change.value.comment_id; // Assuming this is the comment ID
//                             if (!processedComments.has(commentId)) {
//                                 console.log('Processing new comment change:', change.value);
//                                 handleComment(change.value);
//                                 processedComments.add(commentId); // Mark this comment as processed
//                             } else {
//                                 console.log('Ignoring duplicate comment:', commentId);
//                             }
//                         }
//                     });
//                 }
//             });
//         }
//         return res.sendStatus(200);
//     } else {
//         return res.sendStatus(404);
//     }
// });

module.exports = router;