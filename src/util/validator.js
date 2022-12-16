const mongoose = require('mongoose')

//request body validation
const isValidRequest = (value) => Object.keys(value).length > 0;

//Object Id Validation
const isValidObjectId = function(value){
  return mongoose.isValidObjectId(value)
}

//Name Validation
const isValidName = function(value){
  if (!value) return false;
  if (typeof value !== "string") return false;
  if (value.length > 64) return false;
  const regEx = /^[a-zA-Z]+\s?[a-zA-Z]+\s?[a-zA-Z]{1,50}$/;
  if (!regEx.test(value)) return false;
  return true;
}

//Address Validation
const isValidAddress = function(value){
  if (!value) return false;
  if (typeof value !== "string") return false;
  const regEx = /^[a-zA-Z0-9]/;
  if (!regEx.test(value)) return false;
  return true;
}

//Email validation
const isValidEmail = function(value){
    if (!value) return false;
    if (typeof value !== "string") return false;
    const regEx =  /^[a-zA-Z]{1}[A-Za-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;
    if (!regEx.test(value)) return false;
    if (value.length > 64) return false;
    return true;
}

//Password Validation
const isValidPassword =function(value){
  if (!value) return false;
  if (typeof value !== "string") return false;
  if (value.length<8 || value.length>15) return false;
  return true;
}

//Phone validation
const isValidPhone = function(value){
  //if (!value) return false;
  if (typeof value !== "string") return false;
  const regEx = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
  if (!regEx.test(value)) return false;
  return true;
}

//Photo validation
const isValidPhoto = function(value){
  if (value === undefined || value === null || value.length === 0) return false; 
  const name = value[0].originalname;
  const regEx = /\.(apng|avif|gif|jpg|jpeg|jfif|pjpeg|pjp|png|svg|webp)$/;
  const checkImage = name.toLowerCase().match(regEx);
  if (checkImage === null) return false;
  return true;
}



module.exports = {isValidRequest, isValidObjectId, isValidName,  isValidAddress,isValidEmail, isValidPassword, isValidPhone, isValidPhoto}