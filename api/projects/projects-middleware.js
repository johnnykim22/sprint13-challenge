// add middlewares here related to projects

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}]: ${req.method} ${req.url}`);
    next();
}


function validateProject(req, res, next) {
    const project = req.body;
    if (!project.name || !project.description) {
        return res.status(400).json({ message: "Missing required name and description fields" });
    }
    next();
}

module.exports = {
    logger,
    validateProject
};
