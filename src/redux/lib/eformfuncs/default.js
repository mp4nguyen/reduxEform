
import * as util from '../utilities'
import moment from 'moment'

/*
  this function is used to set default value for  textfield/areafield
  so far: just TODAY value
  will add more in the future
*/

export default function(field,preCal){

    if(preCal !== ''){
        var preCalRes = util.getArrayDefault(preCal);
        var value = preCalRes[0];

        if(value === 'TODAY'){
            field.value =  moment().format('YYYY-MM-DD HH:mm:ss');
        }

        if(value === 'TODAYSHORT'){
            field.value =  moment().format('DD/MM/YYYY');
        }
    }

};
