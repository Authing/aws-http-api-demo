var express = require('express');
var router = express.Router();
const axios = require('axios');
const qs = require('querystring');
/* GET home page. */
router.get('/api/callback', async function (req, res, next) {
  const code = req.query.code;
  const { data: tokenSet } = await axios.post('https://你的应用域名.authing.cn/oidc/token', qs.stringify({
    client_id: '你的应用 ID',
    client_secret: '你的应用 Secret',
    redirect_uri: 'http://localhost:3000/api/callback',
    code,
    grant_type: 'authorization_code'
  }))
  const idToken = tokenSet.id_token
  const result = await axios.get('你的 AWS HTTP API 地址', { headers: { authorization: 'Bearer ' + idToken } });
  res.render('index', { data: JSON.stringify(result.data, null, 4) });
});

module.exports = router;
