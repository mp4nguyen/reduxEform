import moment from 'moment'
import * as util from '../utilities'

/*
  this function is used to cal age based on DOB from apptInfo
*/

var _getAge = function (birthday){
    //console.log('age: _getAge: birthday = ',birthday);
    var age = 0;
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


var griptable = [
                {ageFrom: 20, ageTo:24, Female:{RIGHT:'14-23',LEFT:'13-23'},Male:{RIGHT:'21-34',LEFT:'19-31'}},
                {ageFrom: 25, ageTo:29, Female:{RIGHT:'14-22',LEFT:'13-22'},Male:{RIGHT:'19-41',LEFT:'19-39'}},
                {ageFrom: 30, ageTo:34, Female:{RIGHT:'13-25',LEFT:'12-26'},Male:{RIGHT:'20-36',LEFT:'17-36'}},
                {ageFrom: 35, ageTo:39, Female:{RIGHT:'12-21',LEFT:'12-22'},Male:{RIGHT:'21-32',LEFT:'18-32'}},
                {ageFrom: 40, ageTo:44, Female:{RIGHT:'10-24',LEFT:'8-22'},Male:{RIGHT:'21-31',LEFT:'19-31'}},
                {ageFrom: 45, ageTo:49, Female:{RIGHT:'13-24',LEFT:'12-24'},Male:{RIGHT:'19-35',LEFT:'18-42'}},
                {ageFrom: 50, ageTo:54, Female:{RIGHT:'12-22',LEFT:'12-22'},Male:{RIGHT:'20-34',LEFT:'20-37'}},
                {ageFrom: 55, ageTo:59, Female:{RIGHT:'11-21',LEFT:'12-19'},Male:{RIGHT:'18-34',LEFT:'13-31'}},
                {ageFrom: 60, ageTo:64, Female:{RIGHT:'10-20',LEFT:'10-19'},Male:{RIGHT:'14-37',LEFT:'16-33'}},
                {ageFrom: 65, ageTo:69, Female:{RIGHT:'10-21',LEFT:'10-20'},Male:{RIGHT:'17-32',LEFT:'17-28'}},
                {ageFrom: 70, ageTo:74, Female:{RIGHT:'8-22',LEFT:'9-22'},Male:{RIGHT:'16-25',LEFT:'13-28'}},
                {ageFrom: 75, ageTo:79, Female:{RIGHT:'8-17',LEFT:'7-16'},Male:{RIGHT:'9-31',LEFT:'13-24'}},
                {ageFrom: 80, ageTo:100, Female:{RIGHT:'8-17',LEFT:'7-16'},Male:{RIGHT:'9-31',LEFT:'13-24'}}
        ];

export default function GRIPLBS(field,preCal,apptInfo){

    if(preCal !== ''){
        var preCalRes = util.getParams(preCal);

        if(preCalRes.length >= 3){
            ///get age
            var preCalResItemArr = preCalRes[0].split('.');
            var responseTemp = null;
            var preCalResItemTemp = '';
            var age = null;
            if(preCalResItemArr.length > 1){
                responseTemp = apptInfo[preCalResItemArr[0]];
                preCalResItemTemp = preCalResItemArr[1];
            }else{
                responseTemp = apptInfo;
                preCalResItemTemp = preCalRes[0];
            }

            var dob = responseTemp[preCalResItemTemp];
            if(dob){
                age = _getAge(dob);
            }

            ///get gender
            var preCalResItemArr = preCalRes[1].split('.');
            var responseTemp = null;
            var preCalResItemTemp = '';
            var gender = null;
            if(preCalResItemArr.length > 1){
                responseTemp = apptInfo[preCalResItemArr[0]];
                preCalResItemTemp = preCalResItemArr[1];
            }else{
                responseTemp = apptInfo;
                preCalResItemTemp = preCalRes[0];
            }
            gender = responseTemp[preCalResItemTemp];

            //get hand
            var hand = preCalRes[2];

            console.log('griplbs: age = ',age,' genderlbs =',gender,' handlbs=',hand);

            for(var i=0;i<griptable.length;i++){
              var ageGroup = griptable[i];
              if(ageGroup.ageFrom <= age && age <= ageGroup.ageTo){
                console.log('found ageGroup lbs = ',ageGroup);
                var gripGender = ageGroup[gender];
                console.log('found gripGender lbs = ',gripGender);
                if (gripGender) {
                    var gripHand = gripGender[hand]

                    console.log('found gripHand lbs = ',gripHand);
                    field.value = gripHand;
                    
                    console.log('field griplbs', field);
                    break;
                }
              }
            }
            griptable
        }

    }

};

