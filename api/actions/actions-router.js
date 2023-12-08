const express = require('express');
const router = express.Router();
const Actions = require('./actions-model'); 
// [GET] /api/actions
router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.json(actions);
    } catch (err) {
        res.status(500).json({
            message: 'Error getting actions',
            error: err.message
        });
    }
});

// [GET] /api/actions/:id
router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            res.json(action);
        } else {
            return res.status(404).json({
                message: "The action with the specified ID does not exist"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error getting action',
            error: err.message
        });
    }
});

// [POST] /api/actions
router.post('/', async (req, res) => {
    const actionData = req.body;
    if (!actionData.notes || !actionData.description || !actionData.project_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const newAction = await Actions.insert(actionData);
        res.status(201).json(newAction);
    } catch (err) {
        res.status(500).json({
            message: 'Error creating action',
            error: err.message
        });
    }
});

// [PUT] /api/actions/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (!changes.notes || !changes.description || changes.completed === undefined || !changes.project_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const updatedAction = await Actions.update(id, changes);
        if (updatedAction) {
            res.status(200).json(updatedAction);
        } else {
            return res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error updating action',
            error: err.message
        });
    }
});

// [DELETE] /api/actions/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Actions.remove(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting action',
            error: err.message
        });
    }
});

module.exports = router;
