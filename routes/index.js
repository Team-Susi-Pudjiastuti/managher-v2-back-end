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
// const mvpRoutes = require('./mvp.router');
// const betaTestingRoutes = require('./betaTesting.router');
// const launchProductRoutes = require('./launchProduct.router');      


// router.use('/auth', authRoutes);
router.use('/api/user', userRoutes);
router.use('/api/project', projectRoutes);
router.use('/api/business-idea', businessIdeaRoutes);
router.use('/api/rww-testing', rwwTestingRoutes);
router.use('/api/product-concept', productConceptRoutes);
router.use('/api/brand-identity', brandIdentityRoutes);
router.use('/api/lean-canvas', leanCanvasRoutes);
// router.use('/mvp', mvpRoutes);
// router.use('/betaTesting', betaTestingRoutes);
// router.use('/launchProduct', launchProductRoutes);



module.exports = router;


