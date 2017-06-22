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


var griptable = [
                {ageFrom: 20, ageTo:24, Female:{RIGHT:'22-35',LEFT:'19-32'},Male:{RIGHT:'44-68',LEFT:'41-64'}},
                {ageFrom: 25, ageTo:29, Female:{RIGHT:'21-34',LEFT:'18-32'},Male:{RIGHT:'43-66',LEFT:'39-62'}},
                {ageFrom: 30, ageTo:34, Female:{RIGHT:'20-34',LEFT:'17-31'},Male:{RIGHT:'41-64',LEFT:'37-60'}},
                {ageFrom: 35, ageTo:39, Female:{RIGHT:'20-33',LEFT:'16-30'},Male:{RIGHT:'39-63',LEFT:'35-58'}},
                {ageFrom: 40, ageTo:44, Female:{RIGHT:'19-32',LEFT:'16-29'},Male:{RIGHT:'36-61',LEFT:'34-56'}},
                {ageFrom: 45, ageTo:49, Female:{RIGHT:'18-31',LEFT:'15-29'},Male:{RIGHT:'34-59',LEFT:'31-54'}},
                {ageFrom: 50, ageTo:54, Female:{RIGHT:'17-30',LEFT:'15-28'},Male:{RIGHT:'33-56',LEFT:'29-53'}},
                {ageFrom: 55, ageTo:59, Female:{RIGHT:'17-30',LEFT:'14-28'},Male:{RIGHT:'31-54',LEFT:'28-51'}},
                {ageFrom: 60, ageTo:64, Female:{RIGHT:'16-29',LEFT:'13-27'},Male:{RIGHT:'29-53',LEFT:'25-49'}},
                {ageFrom: 65, ageTo:69, Female:{RIGHT:'15-29',LEFT:'12-26'},Male:{RIGHT:'27-50',LEFT:'24-47'}},
                {ageFrom: 70, ageTo:74, Female:{RIGHT:'15-28',LEFT:'12-25'},Male:{RIGHT:'24-48',LEFT:'22-45'}},
                {ageFrom: 75, ageTo:79, Female:{RIGHT:'14-27',LEFT:'11-25'},Male:{RIGHT:'23-46',LEFT:'20-44'}},
                {ageFrom: 80, ageTo:84, Female:{RIGHT:'13-26',LEFT:'10-24'},Male:{RIGHT:'21-44',LEFT:'18-41'}}
        ];

export default function GRIP(field,preCal,apptInfo){

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

            console.log('grip: age = ',age,' gender =',gender,' hand=',hand);

            for(var i=0;i<griptable.length;i++){
              var ageGroup = griptable[i];
              if(ageGroup.ageFrom <= age && age <= ageGroup.ageTo){
                console.log('found ageGroup = ',ageGroup);
                var gripGender = ageGroup[gender];
                console.log('found gripGender = ',gripGender);
                if (gripGender) {
                    var gripHand = gripGender[hand]
                    console.log('found gripHand = ',gripHand);
                    field.value = gripHand;
                    break;
                }
              }
            }
            griptable
        }

    }

};
