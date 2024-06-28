'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  // Conversion API
  app.route('/api/convert').get((req, res) => {
    // query input
    let input = req.query.input;
    // assign num value 
    let initNum = convertHandler.getNum(input);
    // assign unit value
    let initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) {
      res.json("invalid number and unit");
      return;
    } else if (!initNum) {
      res.json("invalid number");
      return;
    } else if (!initUnit) {
      res.json("invalid unit");
      return; 
    } else {
      // convert value based on unit
      let returnNum = convertHandler.convert(initNum, initUnit);
      // convert unit
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      // print out respond
      let toString = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      // return value
      res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
    }

  });
};
