const express = require('express');
const router = express.Router();
const Projects = require('./projects-model'); // Replace with the correct path to your projects model

// [GET] /api/projects
router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching projects', error: err.message });
    }
});

// [GET] /api/projects/:id
router.get('/:id', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching project', error: err.message });
    }
});

// [POST] /api/projects
router.post('/', async (req, res) => {
    try {
        const projectData = req.body;
        if (!projectData.name || !projectData.description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newProject = await Projects.insert(projectData);
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ message: 'Error adding project', error: err.message });
    }
});

// [PUT] /api/projects/:id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const project = await Projects.get(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (!changes.name || !changes.description || changes.completed === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updatedProject = await Projects.update(id, changes);
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(500).json({ message: 'Error updating project', error: err.message });
    }
});

// [DELETE] /api/projects/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Projects.remove(id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting project', error: err.message });
    }
});

// [GET] /api/projects/:id/actions
router.get('/:id/actions', async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Projects.get(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const actions = await Projects.getProjectActions(id);
        res.json(actions);
    } catch (err) {
        res.status(500).json({ message: 'Error getting actions for project', error: err.message });
    }
});

module.exports = router;
