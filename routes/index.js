const express = require('express');
const router = express.Router();

// const authRoutes = require('./auth.router');
const userRoutes = require('./user.router');
const projectRoutes = require('./project.router');
const businessIdeaRoutes = require('./businessIdea.router');
// const testingRWWRoutes = require('./testingRWW.router');
// const productPlanRoutes = require('./productPlan.router');
// const leanCanvasRoutes = require('./leanCanvas.router');
// const mvpRoutes = require('./mvp.router');
// const betaTestingRoutes = require('./betaTesting.router');
// const launchProductRoutes = require('./launchProduct.router');      


// router.use('/auth', authRoutes);
router.use('/', userRoutes);
router.use('/project', projectRoutes);
router.use('/business-idea', businessIdeaRoutes);
// router.use('/testingRWW', testingRWWRoutes);
// router.use('/productPlan', productPlanRoutes);
// router.use('/leanCanvas', leanCanvasRoutes);
// router.use('/mvp', mvpRoutes);
// router.use('/betaTesting', betaTestingRoutes);
// router.use('/launchProduct', launchProductRoutes);



module.exports = router;


