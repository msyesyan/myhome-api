// const ThingsController = require('../controllers/things_controller');

// module.exports = (app) => {
  // eval(require("pryjs").it);
  // app.on('request', (req, res) => {
  //   eval(require("pryjs").it);
  // })
  // app.request({
  //   method: 'get',
  //   path: '/things'
  // }, ThingsController.index);
  // app.request({
  //   method: 'post',
  //   path: '/things'
  // }, ThingsController.create);
  // app.request({
  //   method: 'patch',
  //   path: '/things/:id'
  // }, ThingsController.update);
  // app.request({
  //   method: 'post',
  //   path: '/things'
  // }, ThingsController.create);
  // app.request({
  //   method: 'delete',
  //   path: 'things/:id'
  // }, ThingsController.destroy);
// };

const Routes = (req, res) => {
  const reqUrl = req.url;
  // const method = req.method;
  // eval(require("pryjs").it)

  switch (reqUrl) {
  case /things/.test(reqUrl) :
    console.log('true');
    res.end('things');
    break;
  default:
    console.log('default');
    res.end('welcome');
  }
};

module.exports = Routes;
