const mongoose = require("mongoose");

const emptyBody = (value) => {
    return Object.keys(value).length === 0;
};

const validTrim = (value) => {
    return value.trim().toLowerCase();
};

const isNotProvided = (value) => {
    return value.trim() !== "";
};

const isValidWord = function (value) {
    return /^[a-zA-Z ]{2,20}$/.test(value);
};

const isValidEmail = (value) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
};

const isValidPhone = (value) => {
    return /^[6-9]\d{9}$/.test(value);
};

const isValidPwd = (value) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value);
};

const isValidPincode = (value) => {
    return /^[1-9][0-9]{5}$/.test(value);
};

const isValidImage = (value) => {
    return /^([/|\w|\s|+-.()])*\.((jpg)|(png)|(jpeg))$/.test(value);
};

const isValidObjectId = (value) => {
    return mongoose.Types.ObjectId.isValid(value);
};

const isValidString = function (value) {
    if (value && value == undefined) return false;
    if (typeof value == "string" && value.trim().length == 0 ) return false;
 
    return true;
};


const isValidUserName = (value) => {
    return /^[a-zA-Z0-9 ]{4,}$/.test(value);
};

const isValidStatus = (status) => {
    return ["pending", "completed", "cancelled"].indexOf(status) !== -1;
};

const isValidAdvertisementType = (value) => {
  return (
    [
      "top banner",
      "left side box",
      "right side box",
      "1st priority",
      "2nd priority",
      "3rd priority",
    ].indexOf(value) !== -1
  );
};

const isValidDate =(value)=>{
    if (typeof value !== 'number') return false;
    const date = new Date()
      return !isNaN(date.getTime( new Date(value)));
}


module.exports = {
    emptyBody,
    isNotProvided,
    validTrim,
    isValidWord,
    isValidEmail,
    isValidPhone,
    isValidPwd,
    isValidPincode,
    isValidImage,
    isValidObjectId,
    isValidString,
    isValidUserName,
    isValidStatus,
    isValidAdvertisementType,
    isValidDate
};
