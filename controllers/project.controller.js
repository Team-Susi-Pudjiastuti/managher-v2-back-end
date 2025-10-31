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
            const projects = await Project.find({ user: userId });
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
            const projectId = req.params.id;
            const project = await Project.findById(projectId)
            .populate('phases');

            if (!project) {
            return res.status(404).json({ message: 'Project not found' });
            }

            res.status(200).json({
                message: 'Project retrieved successfully',
                data: project
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    createProject: async (req, res) => {
        try {
            const { user, title } = req.body;
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
    }

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
    const sellPhase = phases.find(phase => phase.name === 'sell');
    const scaleUpPhase = phases.find(phase => phase.name === 'scale_up');

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

    const planLevels =  await Level.insertMany([
        {
            project: projectId,
            title: "Ide Generator", 
            phase: planPhase._id,
            icon: "Lightbulb",
            xp: 20,
            badge: "Percikan Kreatif",
            entities: [{
                entity_type: 'business_idea',
                entity_ref: businessIdea._id,
            }],
            path: 'level_1_idea',
        },
        {
            project: projectId, 
            title: "RWW Testing", 
            phase: planPhase._id,
            icon: "CheckCircle",
            xp: 20,
            badge: "Pengambil Keputusan",
            entities: [{
                entity_type: 'rww_testing',
                entity_ref: rww._id,
            }],
            path: 'level_2_rww',
        },
        {
            project: projectId,
            title: "Brand Identity", 
            phase: planPhase._id,
            icon: "Palette",
            xp: 20,
            badge: "Pencipta Gaya",
            entities: [{
                entity_type: 'brand_identity',
                entity_ref: brandIdentity._id,
            }],
            path: 'level_3_product_brand',
        },
        {
            project: projectId,
            title: "Lean Canvas", 
            phase: planPhase._id,
            icon: "FileText",
            xp: 30,
            badge: "Pemikir Strategis",
            entities: [{
                entity_type: 'lean_canvas',
                entity_ref: leanCanvas._id,
            }],
            path: 'level_4_lean_canvas',
        },
        {
            project: projectId,
            title: "Prototype", 
            phase: planPhase._id,
            icon: "Box",
            xp: 20,
            badge: "Ratu Prototipe",
            entities: [
            {
                entity_type: 'prototype',
                entity_ref: prototype._id,
            },
            { 
                entity_type: 'product_concept',
                entity_ref: productConcept._id,
            }],
            path: 'level_5_MVP',
        },
        {
            project: projectId,
            title: "Beta Testing", 
            phase: planPhase._id,
            icon: "Users",
            xp: 30,
            badge: "Penguji Kualitas",
            entities: [{
                entity_type: 'beta_testing',
                entity_ref: betaTesting._id,
            }],
            path: 'level_6_beta_testing',
        },
        {
            project: projectId,
            title: "Launch Product", 
            phase: planPhase._id,
            icon: "Rocket",
            xp: 30,
            badge: "Si Pemberani",
            entities: [{
                entity_type: 'launch_product',
                entity_ref: launchProduct._id,
            }],
            path: 'level_7_launch',
        },
    ]);

    await Phase.findByIdAndUpdate(planPhase._id, {
        $push: { levels: planLevels.map(l => l._id) }
    }, { new: true });

    // SELL PHASE
    const sellLevels = await Level.insertMany([
    {
        project: projectId,
        title: "Product",
        phase: sellPhase._id,
        icon: "Package",
        xp: 20,
        badge: "Ahli Produk",
    },
    {
        project: projectId,
        title: "Customer",
        phase: sellPhase._id,
        icon: "User",
        xp: 30,
        badge: "Penghubung Hebat",
    },
    {
        project: projectId,
        title: "Order",
        phase: sellPhase._id,
        icon: "ShoppingBag",
        xp: 40,
        badge: "Penjual Andal",
    },
    {
        project: projectId,
        title: "Laba Rugi",
        phase: sellPhase._id,
        icon: "BarChart3",
        xp: 40,
        badge: "Pengatur Keuangan",
    }
    ]);

    await Phase.findByIdAndUpdate(sellPhase._id, {
    $push: { levels: sellLevels.map(l => l._id) }
    });

    // SCALE UP PHASE
    const scaleUpLevels = await Level.insertMany([
    {
        project: projectId,
        title: "Scale Up",
        phase: scaleUpPhase._id,
        icon: "TrendingUp",
        xp: 50,
        badge: "Juara Pertumbuhan",
    }
    ]);

    await Phase.findByIdAndUpdate(scaleUpPhase._id, {
    $push: { levels: scaleUpLevels.map(l => l._id) }
    });

    return await Project.findById(projectId)
    .populate('phases');
}