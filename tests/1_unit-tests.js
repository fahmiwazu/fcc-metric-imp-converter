const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite("Function convertHandler.getNum(input)", function () {
    // convertHandler should correctly read a whole number input
    test("Whole number input", function (done) {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    // convertHandler should correctly read a decimal number input
    test("Decimal input", function (done) {
      let input = "32.2L";
      assert.equal(convertHandler.getNum(input), 32.2);
      done();
    });

    // convertHandler should correctly read a fractional input
    test("Fractional input", function (done) {
      let input = "32/3L";
      assert.equal(convertHandler.getNum(input), 32 / 3);
      done();
    });

    // convertHandler should correctly read a fractional input with a decimal
    test("Fractional input with Decimal", function (done) {
      let input = "9/3.3L";
      assert.equal(convertHandler.getNum(input), 9 / 3.3);
      done();
    });

    // convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test("Invalid Input (double fraction)", function (done) {
      let input = "3/2/3L";
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    // convertHandler should correctly default to a numerical input of 1 when no numerical input is provided
    test("No Numerical Input", function (done) {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });

  });

  suite("Function convertHandler.getUnit(input)", function () {
    // convertHandler should correctly read each valid input unit
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG",];
      let output = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg",];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getUnit(ele), output[index]);
      });
      done();
    });

    // convertHandler should correctly return an error for an invalid input unit
    test("Unknown Unit Input", function (done) {
      assert.equal(convertHandler.getUnit("34kilograms"), undefined);
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    // convertHandler should return the correct return unit for each valid input unit
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    // convertHandler should correctly return the spelled-out string unit for each valid input unit
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms",];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    // convertHandler should correctly convert gal to L
    test("Gal to L", function (done) {
      let input = [5, "gal"];
      let expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    // convertHandler should correctly convert L to gal
    test("L to Gal", function (done) {
      let input = [5, "l"];
      let expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    // convertHandler should correctly convert mi to km
    test("Mi to Km", function (done) {
      let input = [5, "mi"];
      let expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    // convertHandler should correctly convert km to mi
    test("Km to Mi", function (done) {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    // convertHandler should correctly convert lbs to kg
    test("Lbs to Kg", function (done) {
      let input = [5, "lbs"];
      let expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    // convertHandler should correctly convert kg to lbs
    test("Kg to Lbs", function (done) {
      let input = [5, "kg"];
      let expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
  });


});