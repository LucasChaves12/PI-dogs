//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios = require('axios')
const server = require('./src/app.js');
const { conn, Temperament } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  let temp = new Set();
  //! IMPORTING TEMPERAMENTS FROM API AND SAVING TO DB
  axios.get('https://api.thedogapi.com/v1/breeds')
    .then(response => response.data)
    .then(json => {
      json && json.forEach(breed => {
        let temps = breed.temperament && breed.temperament.split(', ');
        temps && temps.forEach(t => temp.add(t));
      })
      let arrayTemp = Array.from(temp)
      Temperament.bulkCreate(arrayTemp.map(t => ({ name: t })))
    })
    .then(console.log('Temperaments (re)imported to DB'))
    .catch(err => console.error(err));
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
