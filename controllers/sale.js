const pool = require('../mysql')

const getSaleTableInfo = (req, res, next) => {
  const data = req.query || {}
  const { filterStartDate = '', filterEndDate = '' } = data
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
    ${filterStartDate !== '' && filterEndDate !== '' ? `where date between '${filterStartDate}' and '${filterEndDate}'` : ''}
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

const addSaleTableInfo = (req, res, next) => {
  const data = req.body || {}
  const {
    date = '',
    total = '',
    collector = '',
    cash = '',
    wechat = '',
    alipay = ''
  } = data
  if (date === '') {
    res.status(500).send({ error: -1, msg: '插入失败，参数没有日期' })
    return
  }
  const sql = `
    INSERT INTO tbl_sale_table_info (date, total, collector, cash, wechat, alipay )
      VALUES
        ( STR_TO_DATE( '${date}', '%Y-%m-%d' ), ${total}, ${collector}, ${cash}, ${wechat}, ${alipay} )
  `
  pool.getConnection((error, connection) => {
    if (error) {
      throw error
    }
    connection.query(sql, err => {
      // 关闭连接
      connection.release()
      // 抛出错误
      if (err) {
        res.status(500).send(err)
        throw err
      } else {
        res.send({ error: 0, msg: '', data: {} })
      }
    })
  })
}

const updateSaleTableInfo = (req, res, next) => {
  const data = req.body || {}
  const {
    date = '',
    total = '',
    collector = '',
    cash = '',
    wechat = '',
    alipay = '',
    key = ''
  } = data
  if (date === '') {
    res.status(500).send({ error: -1, msg: '更新失败，参数没有日期' })
    return
  }
  const sql = `
    update tbl_sale_table_info set total=${total}, collector=${collector}, cash=${cash}, wechat=${wechat}, alipay=${alipay} 
    where id=${key}
  `
  pool.getConnection((error, connection) => {
    if (error) {
      throw error
    }
    connection.query(sql, err => {
      // 关闭连接
      connection.release()
      // 抛出错误
      if (err) {
        res.status(500).send(err)
        throw err
      } else {
        res.send({ error: 0, msg: '', data: {} })
      }
    })
  })
}

const deleteSaleTableInfo = (req, res, next) => {
  const data = req.body || {}
  const {
    key = ''
  } = data
  if (key === '') {
    res.status(500).send({ error: -1, msg: '更新失败，参数没有主键' })
    return
  }
  const sql = `
    delete from tbl_sale_table_info where id=${key}
  `
  pool.getConnection((error, connection) => {
    if (error) {
      throw error
    }
    connection.query(sql, err => {
      // 关闭连接
      connection.release()
      // 抛出错误
      if (err) {
        res.status(500).send(err)
        throw err
      } else {
        res.send({ error: 0, msg: '', data: {} })
      }
    })
  })
}

module.exports = {
  getSaleTableInfo,
  addSaleTableInfo,
  updateSaleTableInfo,
  deleteSaleTableInfo
}
