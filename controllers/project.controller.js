const Project = require('../models/Project');
const Phase = require('../models/Phase');
const Level = require('../models/Level');

module.exports = {
    createProject: async (req, res) => {
        const { title } = req.body;
        try {
            const newProject = await Project.create({ title });

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

//     getAllProjects: async (req, res) => {
//         try {
//             const projects = await ProjectModel.find();
//             res.status(200).json(projects);
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     },

//     getProjectById: async (req, res) => {
//         try {
//             const project = await ProjectModel.findById(req.params.id);
//             if (!project) {
//                 return res.status(404).json({ message: 'Project not found' });
//             }
//             res.status(200).json(project);
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     },

//     updateProject: async (req, res) => {
//         try {
//             const project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//             if (!project) {
//                 return res.status(404).json({ message: 'Project not found' });
//             }
//             res.status(200).json(project);
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     },

//     deleteProject: async (req, res) => {
//         try {
//             const project = await ProjectModel.findByIdAndDelete(req.params.id);
//             if (!project) {
//                 return res.status(404).json({ message: 'Project not found' });
//             }
//             res.status(200).json({ message: 'Project deleted' });
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     },
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
const levels = [
    {
        name: 'business_idea',
        order: 1,
        description: 'Business Idea',
        entity_type: 'business_idea',
        status: 'in_progress',
    },
    {
        name: 'rww_testing',
        order: 2,
        description: 'RWW Testing',
        entity_type: 'rww_testing',
    },
    {
        name: 'product_concept',
        order: 3,
        description: 'Product Concept',
        entity_type: 'product_concept',
    },
    {
        name: 'brand_identity',
        order: 3,
        description: 'Brand Identity',
        entity_type: 'brand_identity',
    },
    {
        name: 'lean_canvas',
        order: 4,
        description: 'Lean Canvas',
        entity_type: 'lean_canvas',
    },
    {
        name: 'beta_testing',
        order: 5,
        description: 'Beta Testing',
        entity_type: 'beta_testing',
    },
    {
        name: 'mvp_image',
        order: 6,
        description: 'MVP Image',
        entity_type: 'mvp_image',
    },
    {
        name: 'launch_preparation',
        order: 7,
        description: 'Launch Preparation',
        entity_type: 'launch_preparation',
    },
].map(level => ({ ...level, phase: planPhase._id }));

await Level.insertMany(levels);
return planPhase;
}