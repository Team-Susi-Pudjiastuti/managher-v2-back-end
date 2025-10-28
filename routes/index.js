const express = require('express');
const router = express.Router();

// const authRoutes = require('./auth.router');
const userRoutes = require('./user.router');
const projectRoutes = require('./project.router');
const businessIdeaRoutes = require('./businessIdea.router');
const rwwTestingRoutes = require('./rwwTesting.router');
const productConceptRoutes = require('./productConcept.router');
const brandIdentityRoutes = require('./brandIdentity.router');
const leanCanvasRoutes = require('./leanCanvas.router');
const prototypeRoutes = require('./prototype.router');
const betaTestingRoutes = require('./betaTesting.router');
const launchProductRoutes = require('./launchProduct.router');      


// router.use('/auth', authRoutes);
router.use('/api/user', userRoutes);
router.use('/api/project', projectRoutes);
router.use('/api/business-idea', businessIdeaRoutes);
router.use('/api/rww-testing', rwwTestingRoutes);
router.use('/api/product-concept', productConceptRoutes);
router.use('/api/brand-identity', brandIdentityRoutes);
router.use('/api/lean-canvas', leanCanvasRoutes);
router.use('/api/prototype', prototypeRoutes);
router.use('/api/beta-testing', betaTestingRoutes);
router.use('/api/launch-product', launchProductRoutes);



module.exports = router;


