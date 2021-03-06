import moment from 'moment'
import * as util from '../utilities'

/*
  this function is used to cal age based on DOB from apptInfo
*/

var _getAge = function (birthday){
    //console.log('age: _getAge: birthday = ',birthday);
    var age=0;
    if (birthday) {
        var split_b = birthday.split('/');
        var real_birthday = split_b[2]+'-'+split_b[1]+'-'+split_b[0]+' 00:00:00';
        var real_birthday = moment(real_birthday).toDate();
        var today = new Date();
        age = today.getFullYear() - real_birthday.getFullYear();
        var m = today.getMonth() - real_birthday.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < real_birthday.getDate())) {
            age--;
        }
    }
    return age;
}

export default function(field,preCal,apptInfo){

    if(preCal !== ''){
        var preCalRes = util.getArrayPrecal(4, preCal);
        var preCalResItemArr = preCalRes[0].split('.');
        var responseTemp = null;
        var preCalResItemTemp = '';
        var res = '';
        if(preCalResItemArr.length > 1){
            responseTemp = apptInfo[preCalResItemArr[0]];
            preCalResItemTemp = preCalResItemArr[1];
        }else{
            responseTemp = apptInfo;
            preCalResItemTemp = preCalRes[0];
        }
        for(var key in responseTemp){
            if(key === preCalResItemTemp){
                res = _getAge(responseTemp[key]);
                break;
            }
        }//end for

        field.value = res;
    }

};
