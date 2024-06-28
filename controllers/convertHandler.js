// Input number and unit spliter with regular expression
function numberStringSplitter(input){
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], string];
}
// Validate if number has division
function checkDiv(possibleFraction){
  let nums = possibleFraction.split("/");
  if (nums.length > 2){
    return false;
  }
  return nums;
}

// Imperial-Metric Convertion Algorithm
function ConvertHandler() {
  
  // Convert number into single value if has division
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);
    if (!nums){
      return undefined;
    }
    let num1 = nums[0];
    let num2 = nums[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);
    if(isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    return result;
  };
  
  // Get unit from input
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1].toLowerCase();
    switch(result){
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };
  
  // Unit Converter (Imperial - Metric)
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();

    switch(unit){
      case "km":
        return "mi";
      case "mi":
        return "km";
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  // Spell Unit for printout respond
  this.spellOutUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    switch(unit){
      case "km":
        return "kilometers";
      case "mi":
        return "miles";
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return "don't know";
    }
  };
  
  // Imperial-Metric Convertion Algotithm
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;
    
    switch(unit){
      case "km":
        result = initNum / miToKm;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }

    // parse result into decimal with 5 digits precision
    return parseFloat(result.toFixed(5));
  };
  
  // return value after convertion process
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

// Export module to global
module.exports = ConvertHandler;
