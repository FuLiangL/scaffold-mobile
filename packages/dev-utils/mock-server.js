const path = require('path')
const { mock } = require('mockjs')
const { pathToRegexp } = require('path-to-regexp')
const glob = require('glob')
const findUp = require('find-up')
const chokidar = require('chokidar')

const isFunction = (fn) => typeof fn === 'function'

const rootPath = path.dirname(findUp.sync('lerna.json'))
const mockPatterns = path.join(rootPath, './mock/**/*.js')
const MATCH_REGEXP = /^(\w+)\s+(\S+)$/

const apis = glob
  .sync(mockPatterns)
  .filter((v) => /\/[^_][^/]+?\.js$/.test(v))
  .map((v) => () => require(v))

const watcher = chokidar.watch(mockPatterns)
watcher.on('change', (filepath) => {
  delete require.cache[path.resolve(filepath)]
})

/**
 * 配置接口 Mock 服务
 * @param {Application} app Express App instance 
 */
module.exports = function setupMockServer (app) {
  app.use((req, res, next) => {
    let isMatch
    for (let k = 0; k < apis.length; k += 1) {
      const rule = apis[k]()
      isMatch = Object.entries(rule)
        .some(([ key, value ]) => {
          // method 为 null 时, 允许所有请求方式
          const [ , method, api ] = key.match(MATCH_REGEXP) || [ null, null, key ]
          if (
            (req.method === (method || '').toUpperCase() || method === null)
            && pathToRegexp(api).test(req.url)
          ) {
            res.json(mock(isFunction(value) ? value(req, res) : value))
            return true
          }
          return false
        })

      if (isMatch) {
        break
      }
    }
    if (!isMatch) {
      next()
    }
  })
}
