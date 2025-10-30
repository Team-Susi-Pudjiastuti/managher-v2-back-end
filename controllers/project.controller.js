const Project = require('../models/Project');
const Phase = require('../models/Phase');
const Level = require('../models/Level');
const BusinessIdea = require('../models/BusinessIdea');
const RWWTesting = require('../models/RWWTesting');
const ProductConcept = require('../models/ProductConcept');
const BrandIdentity = require('../models/BrandIdentity');
const LeanCanvas = require('../models/LeanCanvas');
const Prototype = require('../models/Prototype');
const BetaTesting = require('../models/BetaTesting');
const LaunchProduct = require('../models/LaunchProduct');

module.exports = {
    getAllProjects: async (req, res) => {
        try {
            const { userId } = req.params;
            const projects = await Project.find({ user: userId })
            .populate('user', 'name email');
            res.status(200).json({
                message: 'Projects retrieved successfully',
                data: projects
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getProjectById: async (req, res) => {
        try {
            const project = await Project.findById(req.params.id)
            .populate({
                path: 'phases',
                populate: {
                    path: 'levels',
                    model: 'Level',
                }
            });
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
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
    }


const createProjectPhase = async (projectId) => {
    const phases = await Phase.insertMany([
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
    
    const planPhase = phases.find(phase => phase.name === 'plan');

    await Project.findByIdAndUpdate(projectId, {
    $push: { phases: { $each: phases.map(p => p._id) }}
    });

    const [businessIdea, rww, productConcept, brandIdentity] = await Promise.all([
        BusinessIdea.create({ project: projectId }),
        RWWTesting.create({ project: projectId }),
        ProductConcept.create({ project: projectId }),
        BrandIdentity.create({ project: projectId }),
    ]);

    const [leanCanvas, prototype] = await Promise.all([
        LeanCanvas.create({ 
            project: projectId,
            problem: businessIdea._id, 
            customerSegment: businessIdea._id,     
            uniqueValuePropositionId: businessIdea._id,
            solution: productConcept._id,           
            unfairAdvantage: productConcept._id,
        }),
        Prototype.create({ 
            project: projectId,
            productConcept: productConcept._id,
        })
    ]);

    const [betaTesting, launchProduct] = await Promise.all([
        BetaTesting.create({ 
            project: projectId,
            prototypeId: prototype._id,
        }),
        LaunchProduct.create({ 
            project: projectId,
            productConcept: productConcept._id,
            brand_name: brandIdentity._id,
            brand_tagline: brandIdentity._id,
            launch_channel: brandIdentity._id,
        })
    ]);

    const levels = [
        {
            project: projectId,
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
            project: projectId, 
            name: 'rww_testing',
            order: 2,
            description: 'RWW Testing',
            entities: [{
                entity_type: 'rww_testing',
                entity_ref: rww._id,
            }],
        },
        {
            project: projectId,
            name: 'product_concept',
            order: 3,
            description: 'Product & Brand',
            entities: [{
                entity_type: 'product_concept',
                entity_ref: productConcept._id,
            }],
        },
        {
            project: projectId,
            name: 'brand_identity',
            order: 4,
            description: 'Brand Identity',
            entities: [{
                entity_type: 'brand_identity',
                entity_ref: brandIdentity._id,
            }],
        },
        {
            project: projectId,
            name: 'lean_canvas',
            order: 4,
            description: 'Lean Canvas',
            entities: [{
                entity_type: 'lean_canvas',
                entity_ref: leanCanvas._id,
            }],
        },
        {
            project: projectId,
            name: 'prototype',
            order: 6,
            description: 'Prototype',
            entities: [{
                entity_type: 'prototype',
                entity_ref: prototype._id,
            }],
        },
        {
            project: projectId,
            name: 'beta_testing',
            order: 5,
            description: 'Beta Testing',
            entities: [{
                entity_type: 'beta_testing',
                entity_ref: betaTesting._id,
            }],
        },
        {
            project: projectId,
            name: 'launch_product',
            order: 7,
            description: 'Launch Product',
            entities: [{
                entity_type: 'launch_product',
                entity_ref: launchProduct._id,
            }],
        },
    ].map(level => ({ ...level, phase: planPhase._id }));

    const planLevels = await Level.insertMany(levels);

    await Phase.findByIdAndUpdate(planPhase._id, {
        $push: { levels: planLevels.map(l => l._id) }
    }, { new: true });

    return await Project.findById(projectId)
    .populate('phases');
}