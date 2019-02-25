const express = require('express')
const sale = require('../controllers/sale')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/getSaleAnalysis', (req, res, next) => {
  res.send({ error: 0, msg: '', data: {} })
})

router.get('/getSaleTableInfo', sale.getSaleTableInfo)
router.post('/addSaleTableInfo', sale.addSaleTableInfo)
router.post('/updateSaleTableInfo', sale.updateSaleTableInfo)
router.post('/deleteSaleTableInfo', sale.deleteSaleTableInfo)

module.exports = router
