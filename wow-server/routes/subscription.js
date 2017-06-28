let express = require('express');
let router = express.Router();
let verifyAuth = require('../shared/verifyAuth');
let path = require('path');
let sendpulse = require('sendpulse-api');
const TOKEN_STORAGE = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSnEVkbgnaiA2aCpYnkS+k5GFxo4JRMy1X7xHodicwy1Oc19s99QoEJ0HcxWhNucC521TQn5KXDefsVm9F3wnzAFMFiEaFndCq9yxhYVUpO2cOBtt0G+Koru6cJFtpGjEK5JzkErpr9GjzpI7C33RWza0DPHqubDyYY+i8M8YnHwIDAQAB";
sendpulse.init(
  'f75291e801a7937857421bd30a2b443d',
  'db393a2defd76701ff1473b3cea3f552',
  TOKEN_STORAGE
);


router.post('/subscription', verifyAuth, function (req, res, next) {
  let userInfo = req.body;
  sendpulse.smtpSendMail((data) => {
    console.log(data);
  }, {
      "html": `
    <span>${userInfo.path ? 'Подписка на: <a href="' + userInfo.path + '" target="_blank">' + userInfo.title + '</a></span><br />' : ''}
    <span>Имя: ${userInfo.name}</span><br />
    <span>E-Mail: ${userInfo.email}</span><br />
    <span>Телефон: ${userInfo.phone}</span><br />
    <span>${userInfo.type.indexOf('Подписка') > -1 ? '' : 'Сообщение: ' + userInfo.message}</span>
    `,
      "text": "",
      "subject": `${userInfo.type}`,
      "from": {
        "name": "WOW Service School",
        "email": "inerono@gmail.com"
      },
      "to": [{
        "email": "inerono@hotmail.com"
      }]
    });
  res.send(req.body);
});
module.exports = router;