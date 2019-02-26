const express = require('express')
const saleManage = require('../controllers/saleManage')
const saleAnalysis = require('../controllers/saleAnalysis')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/getSaleTableInfo', saleManage.getSaleTableInfo)
router.post('/addSaleTableInfo', saleManage.addSaleTableInfo)
router.post('/updateSaleTableInfo', saleManage.updateSaleTableInfo)
router.post('/deleteSaleTableInfo', saleManage.deleteSaleTableInfo)

router.get('/getSaleAnalysisCard', saleAnalysis.getSaleAnalysisCard)
router.get('/getSaleAnalysisBar', saleAnalysis.getSaleAnalysisBar)
router.get('/getSaleAnalysisPie', saleAnalysis.getSaleAnalysisPie)

module.exports = router
