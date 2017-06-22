

import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
*/
export default function(field,preCal){

    var preCalRes = util.getArrayPrecal(13, preCal);
    var value = null;
    if(preCalRes.length>0) {
        value = preCalRes[0];
    }

    if(util.getPrefixField(field.type,'radio') > -1){
        field.checked = true;
    } else {
        field.value = value;
    }
};
