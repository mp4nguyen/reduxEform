
import * as util from '../utilities'

/*
  GRIPRANGETOCHECK(dominant_hand,avg_L,avg_R,normal_L,normal_R,1)
*/
export default function GRIPRANGECHECK(fieldsByName,fieldsByRef,template,func,field,updatingFields){
    return new Promise((resolve,reject)=>{
        // GRIPRANGETOCHECK(58_dominant_hand,58_avg_L,58_avg_R,normal_L,normal_R,ABOVE)
        console.log('func func 123', func);

        var params = util.getParams(func);
        var bmi = null;
        var from = 0;
        var to = 0;
        var isChecked = false;

        var handValue;
        var avg_L;
        var avg_R;
        var normal_L;
        var normal_R;
        var result;

        params.forEach((param,index)=>{
            if(index == 0){
                //get dominant hand
                var handField = fieldsByName[param];
                console.log('GRIPRANGETOCHECK: handField = 1',handField);
                if(handField){
                    handValue = util.getField(template,handField.fieldPosition);
                    console.log('GRIPRANGETOCHECK: handValue = 2',handValue);
                    if(!handValue.checked && handField.groups.length >=1 ){
                        handValue = util.getField(template,handField.groups[0].fieldPosition);
                        console.log('GRIPRANGETOCHECK: handValue = 3',handValue);
                    }
                }
            }
            if(index == 1){
                //get avg_l
                var avg_lField = fieldsByName[param];
                if(avg_lField){
                    avg_L = util.getField(template,avg_lField.fieldPosition).value;
                }
            }
            if(index == 2){
                //get avg_r
                var avg_rField = fieldsByName[param];
                if(avg_rField){
                    avg_R = util.getField(template,avg_rField.fieldPosition).value;
                }
            }
            if(index == 3){
                //get avg_r
                var normal_LField = fieldsByName[param];
                if(normal_LField){
                    normal_L = util.getField(template,normal_LField.fieldPosition).value;
                    console.log('normal_L',normal_L, normal_LField);
                }
            }
            if(index == 4){
                //get avg_r
                var normal_RField = fieldsByName[param];
                if(normal_RField){
                    normal_R = util.getField(template,normal_RField.fieldPosition).value;
                     console.log('normal_R',normal_R, normal_RField);
                }
            }
        });




        var normals = [];
        var avg = 0;
        if(handValue.checked && handValue.value.indexOf('Left')>=0){
            if (normal_L) {
                normals = normal_L.split('-');
                avg = avg_L;
            }
        }else if(handValue.checked && handValue.value.indexOf('Right')>=0){
            if (normal_R) {
                normals = normal_R.split('-');
                avg = avg_R;
            }
        }

        console.log('>>>>>>>>>> GRIPRANGETOCHECK: handValue = ',handValue.value,handValue.checked,' avg_L = ',avg_L,' avg_R = ',avg_R,' normal_L = ',normal_L,' normal_R = ',normal_R,'  normals = ',normals);
        if(normals.length >=2){
            var low = Number(normals[0]);
            var high = Number(normals[1]);

            if(avg < low){
                result = 'below';
            }else if ( low <= avg && avg <= high ) {
                result = 'within';
            }else{
                result = 'above'
            }
        }

        if(field.value == result){
            field.checked = true;
        }else{
            field.checked = false;
        }

        if (updatingFields) {
            updatingFields.push(field.fieldPosition);
        }

        // console.log('avg',avg, 'low', low, 'high', high, 'result', result, 'field calculation', field, 'field.checked calculation', field.checked);

        resolve(result)
    });

};
