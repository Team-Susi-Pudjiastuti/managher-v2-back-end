const Project = require('../models/Project');
const Phase = require('../models/Phase');
const Level = require('../models/Level');
const BusinessIdea = require('../models/BusinessIdea');
const RWWTesting = require('../models/RWWTesting');

module.exports = {
    createProject: async (req, res) => {
        const { user, title } = req.body;
        try {
            const newProject = await Project.create({ user, title });

            await createProjectPhase(newProject._id);

            res.status(201).json(
                {
                    message: 'Project created successfully',
                    project: newProject
                });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getProjectById: async (req, res) => {
        try {
            const project = await Project.findById(req.params.id)
            .populate({
                path: 'phase',
                populate: {
                path: 'levels',
                populate: {
                    path: 'entities.entity_ref'
                }
                }
            })
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}

const createProjectPhase = async (projectId) => {
    const phase = await Phase.insertMany([
        {
            project: projectId,
            name: 'plan',
            order: 1,
            description: 'Plan the project',
            status: 'in_progress',
        },
        {
            project: projectId,
            name: 'sell',
            order: 2,
            description: 'Sell the product',
        },
        {
            project: projectId,
            name: 'scale_up',
            order: 3,
            description: 'Scale up the business',
        },
    ]);

const planPhase = phase.find(phase => phase.name === 'plan');

const businessIdea = await BusinessIdea.create({ project: projectId });
const rww = await RWWTesting.create({ project: projectId });

const levels = [
    {
        name: 'business_idea',
        order: 1,
        description: 'Business Idea',
        entities: [{
            entity_type: 'business_idea',
            entity_ref: businessIdea._id,
        }],
        status: 'in_progress',
    },
    {
        name: 'rww_testing',
        order: 2,
        description: 'RWW Testing',
        entities: [{
            entity_type: 'rww_testing',
            entity_ref: rww._id,
        }],
    },
    {
        name: 'product_concept',
        order: 3,
        description: 'Product & Brand',
        entities: [{
            entity_type: 'product_concept',
        },
        {
            entity_type: 'brand_identity',
        }],
    },
    {
        name: 'lean_canvas',
        order: 4,
        description: 'Lean Canvas',
        entities: [{
            entity_type: 'lean_canvas',
        }],
    },
    {
        name: 'beta_testing',
        order: 5,
        description: 'Beta Testing',
        entities: [{
            entity_type: 'beta_testing',
        }],
    },
    {
        name: 'mvp_image',
        order: 6,
        description: 'MVP Image',
        entities: [{
            entity_type: 'mvp_image',
        }],
    },
    {
        name: 'launch_preparation',
        order: 7,
        description: 'Launch Preparation',
        entities: [{
            entity_type: 'launch_preparation',
        }],
    },
].map(level => ({ ...level, phase: planPhase._id }));

await Level.insertMany(levels);
return planPhase;
}