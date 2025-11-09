const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

// const authRoutes = require('./auth.router');
const userRoutes = require('./user.router');
const projectRoutes = require('./project.router');
const phaseRoutes = require('./phase.router');
const levelRoutes = require('./level.router');

const businessIdeaRoutes = require('./businessIdea.router');
const rwwTestingRoutes = require('./rwwTesting.router');
const productConceptRoutes = require('./productConcept.router');
const brandIdentityRoutes = require('./brandIdentity.router');
const leanCanvasRoutes = require('./leanCanvas.router');
const prototypeRoutes = require('./prototype.router');
const betaTestingRoutes = require('./betaTesting.router');
const launchProductRoutes = require('./launchProduct.router');      


// router.use('/auth', authRoutes);
router.use('/api/', userRoutes);
router.use('/api/project', verifyToken, projectRoutes);
router.use('/api/phase', verifyToken, phaseRoutes);
router.use('/api/level', verifyToken, levelRoutes);

router.use('/api/business-idea', verifyToken, businessIdeaRoutes);
router.use('/api/rww-testing', verifyToken, rwwTestingRoutes);
router.use('/api/product-concept', verifyToken, productConceptRoutes);
router.use('/api/brand-identity', verifyToken, brandIdentityRoutes);
router.use('/api/lean-canvas', verifyToken, leanCanvasRoutes);
router.use('/api/prototype', verifyToken, prototypeRoutes);
router.use('/api/beta-testing', verifyToken, betaTestingRoutes);
router.use('/api/launch', verifyToken, launchProductRoutes);



module.exports = router;


