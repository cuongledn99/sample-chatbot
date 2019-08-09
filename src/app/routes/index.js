var router = require("express").Router();

var verifyWebhook = require('./verify-webhook');
const messageWebhook = require('./message-webhook');

router.get('/',(req,res)=>{
  res.send('hi, i am chatbot')
})
router.get('/webhook', verifyWebhook);
router.post('/webhook',messageWebhook);

module.exports = router;


