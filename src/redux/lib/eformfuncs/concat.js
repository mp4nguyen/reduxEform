

import * as util from '../utilities'

/*
  this function is used to set value for radio button and textfield/areafield from database through apptInfo object
*/



export default function(field,preCal,apptInfo){

  if(util.getPrefixField(preCal,'CONCAT') > -1){

      // console.log("concat.js: preCal = ",preCal);
      if(preCal !== ''){
          var preCalRes = util.getArrayPrecal(7, preCal);
          var value = '';
          var checked = null;
          preCalRes.map(function(preCalResItem){
              var preCalResItemArr = preCalResItem.split('.');
              var responseTemp = null;
              var preCalResItemTemp = '';

              var getFieldFromObject = function(object,proName){
                  console.log("getFieldFromObject.responseTemp = ",responseTemp);
                  console.log("getFieldFromObject.preCalResItemTemp = ",preCalResItemTemp);
                  for(var key in object){
                      if(key === proName){
                          if(util.getPrefixField(field.type,'checkbox') > -1){
                              if(field.value === object[key]){
                                  //value = 'yes';
                                  checked = true;
                              }else{
                                  checked = false;
                              }
                          }
                          else if(util.getPrefixField(field.type,'radio') > -1){
                              // console.log('key>>>', key, 'field>>>', field, 'object>>>',object);
                              if(field.value === object[key]){
                                  //value = responseTemp[key];
                                  checked = true;
                              }else{
                                  checked = false;
                              }
                              // console.log('checked>>>', checked);
                          }else{
                              if(object[key] !== null)
                                  value += object[key]+' ';
                          }
                          break;
                      }
                  }
              }

              if(preCalResItemArr.length == 2){

                  responseTemp = apptInfo[preCalResItemArr[0]];
                  preCalResItemTemp = preCalResItemArr[1];
                  // console.log('funct concat >>> apptInfo = ', apptInfo);
                  // console.log('funct concat >>> preCalResItemArr = ', preCalResItemArr);
                  // console.log('funct concat >>> responseTemp', responseTemp);
                  // console.log('funct concat >>> preCalResItemArr[0]', preCalResItemArr[0]);

              }else if(preCalResItemArr.length == 3){
                ///get 2 levels of object
                responseTemp = apptInfo[preCalResItemArr[0]][preCalResItemArr[1]];
                preCalResItemTemp = preCalResItemArr[2];
                // console.log('funct concat >>> apptInfo = ', apptInfo);
                // console.log('funct concat >>> preCalResItemArr = ', preCalResItemArr);
                // console.log('funct concat >>> responseTemp', responseTemp);
                // console.log('funct concat >>> preCalResItemArr[0]', preCalResItemArr[0]);

              }else{
                  responseTemp = apptInfo;
                  preCalResItemTemp = preCalResItem;
              }

              if(responseTemp instanceof Array){
                  if(responseTemp.length > 0){
                      // console.log('concat.js: it is an array');
                      //if the object is array, default, get the data of first object for concat
                      getFieldFromObject(responseTemp[0],preCalResItemTemp)
                      // console.log('concat.js: it is an array, value = ',value);
                  }
              }else if(responseTemp instanceof Object){
                  // console.log('concat.js: it is an object');
                  getFieldFromObject(responseTemp,preCalResItemTemp)
              }
          })

          // console.log('concat.js: value = ',value);

          //  console.log('checked 2 >>>', checked);

          if (checked!==null) {
              field.checked = checked;
          }
          if(value) {
              field.value = value
          }
      }
  }
};
