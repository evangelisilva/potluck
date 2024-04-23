const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Import the Item model

// Controller function to get item list grouped by category, and filtered by event ID
router.get('/:eventId', async (req, res) => {
    const { eventId } = req.params;
    
    try {
        // Fetch items from the database for the specified event ID
        const items = await Item.find({ event: eventId }).populate('signups');

        // Group items by category using Array.reduce()
        const groupedItems = items.reduce((acc, item) => {
            const { category, ...rest } = item.toObject();
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(rest);
            return acc;
        }, {});
        res.status(200).json(groupedItems);
    } catch (error) {
        console.error('Error getting grouped items by event ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const { name, category, slot_count, quantity, notes } = req.body;
    
    try {
        // Fetch items from the database for the specified event ID
        const item = await Item.create({ 
            event: eventId, 
            name: name,
            category: category, 
            slot_count: slot_count, 
            quantity: quantity, 
            notes: notes 
        });
        
        res.status(200).json(item);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:itemId/signup', async (req, res) => {
// async function addUserIdToSignups(itemId, userId) {
    const {itemId} = req.params;
    const {userId} = req.body;

    try {
        // Find the item by ID and update the signups array
        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            { $push: { signups: userId } }, // Using $push to add the user ID, allowing duplicates
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            throw new Error('Item not found');
        }

        return updatedItem;
    } catch (error) {
        console.error('Error adding user ID to signups:', error);
        throw error;
    }
})

module.exports = router;
