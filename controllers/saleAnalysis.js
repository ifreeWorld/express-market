const pool = require('../mysql')

const getSaleAnalysisCard = (req, res, next) => {
  const sql = `
    SELECT
      IFNULL(SUM(total),0) AS total,
      IFNULL(AVG(total),0) AS average
    FROM
      tbl_sale_table_info
  `
  pool.getConnection((error, connection) => {
    if (error) {
      throw error
    }
    connection.query(sql, (err, rows) => {
      // 关闭连接
      connection.release()
      // 抛出错误
      if (err) {
        res.status(500).send(err)
        throw err
      } else {
        res.send({ error: 0, msg: '', data: rows[0] })
      }
    })
  })
}

const getSaleAnalysisBar = (req, res, next) => {
  const data = req.query || {}
  const { startMonth = '2019-01', endMonth = '2019-12' } = data
  const sql = `
    SELECT
      DATE_FORMAT(date, '%Y-%m') AS x,
      sum(total) AS y
    FROM
      tbl_sale_table_info
    WHERE
      DATE_FORMAT(date, '%Y-%m') BETWEEN '${startMonth}' AND '${endMonth}'
    GROUP BY
      x
    ORDER BY
      x asc
  `
  pool.getConnection((error, connection) => {
    if (error) {
      throw error
    }
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

const getSaleAnalysisPie = (req, res, next) => {
  const data = req.query || {}
  const { selectYear = '2019' } = data
  const sql = `
    SELECT
      CONVERT(DATE_FORMAT(date, '%Y'), SIGNED) AS year,
      sum(total) AS total,
      sum(collector) AS collector,
      sum(cash) AS cash,
      sum(wechat) AS wechat,
      sum(alipay) AS alipay
    FROM
      tbl_sale_table_info
    WHERE
      DATE_FORMAT(date, '%Y') = '${selectYear}'
    GROUP BY
      year
  `
  pool.getConnection((error, connection) => {
    if (error) {
      throw error
    }
    connection.query(sql, (err, rows) => {
      // 关闭连接
      connection.release()
      // 抛出错误
      if (err) {
        res.status(500).send(err)
        throw err
      } else {
        res.send({ error: 0, msg: '', data: rows[0] })
      }
    })
  })
}
module.exports = {
  getSaleAnalysisCard,
  getSaleAnalysisBar,
  getSaleAnalysisPie
}
