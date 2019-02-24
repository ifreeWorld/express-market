const pool = require('../mysql')

const getSaleTableInfo = (req, res, next) => {
  const data = req.query || {}
  const sql = `
    SELECT
    id AS 'key',
    DATE_FORMAT( date, '%Y-%m-%d' ) AS date,
    total,
    collector,
    cash,
    wechat,
    alipay 
    FROM
    tbl_sale_table_info 
  `
  pool.getConnection((err, connection) => {
    connection.query(sql, (err, rows) => {
      // 关闭连接
      connection.release()
      // 抛出错误
      if (err) {
        res.status(500).send(err)
        throw err
      } else {
        res.send({ error: 0, msg: '', data: rows })
      }
    })
  })
}

const addSaleTableInfo = (req, res, next) => {
  const data = req.body || {}
  if (data.date) {
    res.status(500).send({ msg: '插入失败，参数没有日期' })
    return
  }
  const sql = `
    INSERT INTO tbl_sale_table_info (date, total, collector, cash, wechat, alipay )
      VALUES
        ( STR_TO_DATE( ${data.date}, '%Y-%m-%d' ), ${data.total}, ${data.collector}, ${data.cash}, ${data.wechat}, ${data.alipay} )
  `
  pool.getConnection((err, connection) => {
    connection.query(sql, (err, rows) => {
      // 关闭连接
      connection.release()
      // 抛出错误
      if (err) {
        throw err
        res.status(500).send(err)
      } else {
        res.send({ error: 0, msg: '', data: {} })
      }
    })
  })
}

module.exports = {
  getSaleTableInfo,
  addSaleTableInfo
}
