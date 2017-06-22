import moment from 'moment';
import * as util from './utilities';
import eformFuncs from './eformfuncs';

export default function ConvertTemplateToFieldArray(template,isPrint, params) {

  var startAt = new Date();
  var fields = [];

  if (params && params.templateUID == "e6b05150-4b5f-468d-ac9e-c456790bc0de") {
    for(var section_index = 0; section_index < template.sections.length; section_index++){
       
        //console.log(" * transformEformData: section = ",section);

        if (  template.sections[section_index].moduleID != 45 && template.sections[section_index].moduleID != 46 
              && template.sections[section_index].moduleID != 47 && template.sections[section_index].moduleID != 48 
              && template.sections[section_index].moduleID != 49 && template.sections[section_index].moduleID != 71
              && template.sections[section_index].moduleID != 72 && template.sections[section_index].moduleID != 73
              && template.sections[section_index].moduleID != 74
              ) {
          
          var section = template.sections[section_index];
          var isSaveSection = true;

          if(section.viewType == 'dynamic'){
              if(section.isShow){
                  var pureField = {
                                    ref: section.ref,
                                    isShow: section.isShow,
                                    checked: null,
                                    name: section.name,
                                    type: 'section',
                                    value: null,
                                    moduleID: section.moduleID
                                  };
                  fields.push(pureField);
              }else{
                  var isSaveSection = false;
              }
          }else{
              fields.push({
                            ref: section.ref,
                            isComplete: section.isComplete,
                            isOpen: section.isOpen,
                            checked: null,
                            name: section.name,
                            type: 'section',
                            value: null,
                            moduleID: section.moduleID
                          });
          }

          for(var row_index = 0; row_index < section.rows.length && isSaveSection ; row_index++){
              var row = section.rows[row_index];
              //console.log("    - transformEformData: row = ",row);
              for(var field_index = 0; field_index < row.fields.length; field_index++){

                  var field = row.fields[field_index];

                  if(field.type == "eform_input_text" ||
                        field.type == "eform_input_check_radio" ||
                        field.type == "eform_input_check_checkbox" ||
                        field.type == "eform_input_textarea" ||
                        field.type == "eform_input_date"
                      ){
                      var pureField = {
                                        checked: field.checked,
                                        name: field.name,
                                        ref: field.ref,
                                        type: field.type,
                                        value: field.value,
                                        moduleID: section.moduleID
                                      };
                      fields.push(pureField);
                  }else if(field.type == "eform_input_signature"){

                    var pureField = {
                                      checked: field.checked,
                                      name: field.name,
                                      ref: field.ref,
                                      type: field.type,
                                      value: isPrint?null:field.value,
                                      base64Data: isPrint? (field.value ? field.value.sub:null) :null,
                                      moduleID: section.moduleID
                                    };
                    fields.push(pureField);
                  }else if(field.type == "eform_input_image_doctor"){

                    var valuePrint = null;
                    console.log('field.valueSign', field.valueSign, 'field.image', field.image);
                    // if (field.valueSign) {
                    //   valuePrint = field.valueSign.sub;
                    // }else{
                    //   valuePrint = field.image;                      
                    // }   
                    if (field.isPrintDoctor) {
                      valuePrint = field.image;
                    }else{
                      if (field.valueSign) {
                        valuePrint = field.valueSign.sub;
                      }
                    }               

                    var pureField = {
                                      checked: field.checked,
                                      name: field.name,
                                      ref: field.ref,
                                      type: field.type,
                                      image:field.image,
                                      value: isPrint?null:field.value,
                                      valueSign: isPrint?null:field.valueSign,
                                      isPrintDoctor: field.isPrintDoctor,
                                      // base64Data: isPrint? (field.value ? field.value.sub:null) :null,
                                      // base64Data: isPrint? (field.image ? field.image:null) :null,
                                      base64Data: isPrint? valuePrint  :null,
                                      moduleID: section.moduleID
                                    };
                    // console.log('pureField >>>>> 2',pureField);                                    
                    fields.push(pureField);
                  }else if(field.type == "table"){
                      if(field.tableData){
                          field.tableData.forEach(row=>{
                              row.forEach(col=>{
                                  var pureField = {
                                                    refChild: col.refChild,
                                                    value: col.value,
                                                    type: col.type,
                                                    typeChild: col.typeChild,
                                                    ref: col.ref,
                                                    name: col.name,
                                                    moduleID: section.moduleID
                                                  };
                                  fields.push(pureField);
                              });
                          });
                      }
                  }else if(field.type == "line_chart" || field.type == "rec_chart" ){

                        // console.log('field.type >>>',field.type);
                        // console.log('field >>>',field);

                        var pureField = {
                                          ref: field.ref,
                                          type: field.type,
                                          name: field.name,
                                          series : field.series,
                                          moduleID: section.moduleID,
                                          value: isPrint?null:(field.image ? field.image:''),
                                          base64Data: isPrint? (field.image ? field.image:null) :null,
                                        };
                        fields.push(pureField);
                        if (isPrint) {
                          if (field.type == "line_chart") {
                            var pureFieldHeader = {
                                              ref: field.ref,
                                              type: field.type,
                                              name: 'chart_base64_image_1',
                                              series : field.series,
                                              moduleID: section.moduleID,
                                              value: isPrint?null:(field.headerImage ? field.headerImage:''),
                                              base64Data: isPrint? (field.headerImage ? field.headerImage:null) :null,
                                            };
                            fields.push(pureFieldHeader);
                          }
                        }else{
                          if (field.type == "line_chart") {
                            var pureFieldHeader = {
                                              ref: field.ref,
                                              type: field.type,
                                              name: 'chart_base64_image_1',
                                              series : field.series,
                                              moduleID: section.moduleID,
                                              value: isPrint?null:(field.headerImage ? field.headerImage:''),
                                              //base64Data: isPrint? (field.headerImage ? field.headerImage:null) :null,
                                            };
                            fields.push(pureFieldHeader);
                          }
                        }
                  }
              }
          }//End for of rows

        }

    }//end for of sections

    for(var section_index = 0; section_index < template.sections.length; section_index++){
       

        if (  template.sections[section_index].moduleID == 45 || template.sections[section_index].moduleID == 46 
              || template.sections[section_index].moduleID == 47 || template.sections[section_index].moduleID == 48 
              || template.sections[section_index].moduleID == 49 || template.sections[section_index].moduleID == 71
              || template.sections[section_index].moduleID == 72 || template.sections[section_index].moduleID == 73
              ||template.sections[section_index].moduleID == 74
              ) {
        //console.log(" * transformEformData: section = ",section);

          var section = template.sections[section_index];
          var isSaveSection = true;

          if(section.viewType == 'dynamic'){
              if(section.isShow){
                  var pureField = {
                                    ref: section.ref,
                                    isShow: section.isShow,
                                    checked: null,
                                    name: section.name,
                                    type: 'section',
                                    value: null,
                                    moduleID: section.moduleID
                                  };
                  fields.push(pureField);
              }else{
                  var isSaveSection = false;
              }
          }else{
              fields.push({
                            ref: section.ref,
                            isComplete: section.isComplete,
                            isOpen: section.isOpen,
                            checked: null,
                            name: section.name,
                            type: 'section',
                            value: null,
                            moduleID: section.moduleID
                          });
          }

          for(var row_index = 0; row_index < section.rows.length && isSaveSection ; row_index++){
              var row = section.rows[row_index];
              //console.log("    - transformEformData: row = ",row);
              for(var field_index = 0; field_index < row.fields.length; field_index++){

                  var field = row.fields[field_index];

                  if(field.type == "eform_input_text" ||
                        field.type == "eform_input_check_radio" ||
                        field.type == "eform_input_check_checkbox" ||
                        field.type == "eform_input_textarea" ||
                        field.type == "eform_input_date"
                      ){
                      var pureField = {
                                        checked: field.checked,
                                        name: field.name,
                                        ref: field.ref,
                                        type: field.type,
                                        value: field.value,
                                        moduleID: section.moduleID
                                      };
                      fields.push(pureField);
                  }else if(field.type == "eform_input_signature"){

                    var pureField = {
                                      checked: field.checked,
                                      name: field.name,
                                      ref: field.ref,
                                      type: field.type,
                                      value: isPrint?null:field.value,
                                      base64Data: isPrint? (field.value ? field.value.sub:null) :null,
                                      moduleID: section.moduleID
                                    };
                    fields.push(pureField);
                  }else if(field.type == "eform_input_image_doctor"){

                    console.log('field.valueSign 2', field.valueSign, 'field.image', field.image);

                    var valuePrint = null;
                    // if (field.valueSign) {
                    //   valuePrint = field.valueSign.sub;
                    // }else{
                    //   valuePrint = field.image;                      
                    // }
                    if (field.isPrintDoctor) {
                      valuePrint = field.image;
                    }else{
                      if (field.valueSign) {
                        valuePrint = field.valueSign.sub;
                      }
                    }

                    // console.log('valuePrint 1',valuePrint);

                    var pureField = {
                                      checked: field.checked,
                                      name: field.name,
                                      ref: field.ref,
                                      type: field.type,
                                      image:field.image,
                                      value: isPrint?null:field.value,
                                      valueSign: isPrint?null:field.valueSign,
                                      isPrintDoctor: field.isPrintDoctor,
                                      // base64Data: isPrint? (field.value ? field.value.sub:null) :null,
                                      // base64Data: isPrint? (field.image ? field.image:null) :null,
                                      base64Data: isPrint? valuePrint  :null,
                                      moduleID: section.moduleID
                                    };
                    // console.log('pureField >>>>> 3 ',pureField);
                    fields.push(pureField);
                  }else if(field.type == "table"){
                      if(field.tableData){
                          field.tableData.forEach(row=>{
                              row.forEach(col=>{
                                  var pureField = {
                                                    refChild: col.refChild,
                                                    value: col.value,
                                                    type: col.type,
                                                    typeChild: col.typeChild,
                                                    ref: col.ref,
                                                    name: col.name,
                                                    moduleID: section.moduleID
                                                  };
                                  fields.push(pureField);
                              });
                          });
                      }
                  }else if(field.type == "line_chart" || field.type == "rec_chart" ){

                        // console.log('field.type >>>',field.type);
                        // console.log('field >>>',field);

                        var pureField = {
                                          ref: field.ref,
                                          type: field.type,
                                          name: field.name,
                                          series : field.series,
                                          moduleID: section.moduleID,
                                          value: isPrint?null:(field.image ? field.image:''),
                                          base64Data: isPrint? (field.image ? field.image:null) :null,
                                        };
                        fields.push(pureField);
                        if (isPrint) {
                          if (field.type == "line_chart") {
                            var pureFieldHeader = {
                                              ref: field.ref,
                                              type: field.type,
                                              name: 'chart_base64_image_1',
                                              series : field.series,
                                              moduleID: section.moduleID,
                                              value: isPrint?null:(field.headerImage ? field.headerImage:''),
                                              base64Data: isPrint? (field.headerImage ? field.headerImage:null) :null,
                                            };
                            fields.push(pureFieldHeader);
                          }
                        }else{
                          if (field.type == "line_chart") {
                            var pureFieldHeader = {
                                              ref: field.ref,
                                              type: field.type,
                                              name: 'chart_base64_image_1',
                                              series : field.series,
                                              moduleID: section.moduleID,
                                              value: isPrint?null:(field.headerImage ? field.headerImage:''),
                                              //base64Data: isPrint? (field.headerImage ? field.headerImage:null) :null,
                                            };
                            fields.push(pureFieldHeader);
                          }
                        }
                  }
              
          }//End for of rows

        }
      }  
    }//end for of sections

  }else{
    for(var section_index = 0; section_index < template.sections.length; section_index++){
     
      //console.log(" * transformEformData: section = ",section);              
        var section = template.sections[section_index];
        var isSaveSection = true;

        if(section.viewType == 'dynamic'){
            if(section.isShow){
                var pureField = {
                                  ref: section.ref,
                                  isShow: section.isShow,
                                  checked: null,
                                  name: section.name,
                                  type: 'section',
                                  value: null,
                                  moduleID: section.moduleID
                                };
                fields.push(pureField);
            }else{
                var isSaveSection = false;
            }
        }else{
            fields.push({
                          ref: section.ref,
                          isComplete: section.isComplete,
                          isOpen: section.isOpen,
                          checked: null,
                          name: section.name,
                          type: 'section',
                          value: null,
                          moduleID: section.moduleID
                        });
        }

        for(var row_index = 0; row_index < section.rows.length && isSaveSection ; row_index++){
            var row = section.rows[row_index];
            //console.log("    - transformEformData: row = ",row);
            for(var field_index = 0; field_index < row.fields.length; field_index++){

                var field = row.fields[field_index];

                if(field.type == "eform_input_text" ||
                      field.type == "eform_input_check_radio" ||
                      field.type == "eform_input_check_checkbox" ||
                      field.type == "eform_input_textarea" ||
                      field.type == "eform_input_date"
                    ){
                    var pureField = {
                                      checked: field.checked,
                                      name: field.name,
                                      ref: field.ref,
                                      type: field.type,
                                      value: field.value,
                                      moduleID: section.moduleID
                                    };
                    fields.push(pureField);
                }else if(field.type == "eform_input_signature"){

                  var pureField = {
                                    checked: field.checked,
                                    name: field.name,
                                    ref: field.ref,
                                    type: field.type,
                                    value: isPrint?null:field.value,
                                    base64Data: isPrint? (field.value ? field.value.sub:null) :null,
                                    moduleID: section.moduleID
                                  };
                  fields.push(pureField);
                }else if(field.type == "eform_input_image_doctor"){

                  console.log('field.valueSign 3', field.valueSign, 'field.image', field.image);

                  var valuePrint = null;
                  if (field.isPrintDoctor) {
                    valuePrint = field.image;
                  }else{
                    if (field.valueSign) {
                      valuePrint = field.valueSign.sub;
                    }
                  }
                  

                  // console.log('valuePrint 2',valuePrint);

                  var pureField = {
                                    checked: field.checked,
                                    name: field.name,
                                    ref: field.ref,
                                    type: field.type,
                                    image:field.image,
                                    value: isPrint?null:field.value,
                                    valueSign: isPrint?null:field.valueSign,
                                    isPrintDoctor: field.isPrintDoctor,
                                    // base64Data: isPrint? (field.value ? field.value.sub:null) :null,
                                    // base64Data: isPrint? (field.image ? field.image:null) :null,
                                    base64Data: isPrint? valuePrint  :null,
                                    moduleID: section.moduleID
                                  };
                  fields.push(pureField);
                  // console.log('pureField >>>>>',pureField);
                }else if(field.type == "table"){
                    if(field.tableData){
                        field.tableData.forEach(row=>{
                            row.forEach(col=>{
                                var pureField = {
                                                  refChild: col.refChild,
                                                  value: col.value,
                                                  type: col.type,
                                                  typeChild: col.typeChild,
                                                  ref: col.ref,
                                                  name: col.name,
                                                  moduleID: section.moduleID
                                                };
                                fields.push(pureField);
                            });
                        });
                    }
                }else if(field.type == "line_chart" || field.type == "rec_chart" ){

                      // console.log('field.type >>>',field.type);
                      // console.log('field >>>',field);

                      var pureField = {
                                        ref: field.ref,
                                        type: field.type,
                                        name: field.name,
                                        series : field.series,
                                        moduleID: section.moduleID,
                                        value: isPrint?null:(field.image ? field.image:''),
                                        base64Data: isPrint? (field.image ? field.image:null) :null,
                                      };
                      fields.push(pureField);
                      if (isPrint) {
                        if (field.type == "line_chart") {
                          var pureFieldHeader = {
                                            ref: field.ref,
                                            type: field.type,
                                            name: 'chart_base64_image_1',
                                            series : field.series,
                                            moduleID: section.moduleID,
                                            value: isPrint?null:(field.headerImage ? field.headerImage:''),
                                            base64Data: isPrint? (field.headerImage ? field.headerImage:null) :null,
                                          };
                          fields.push(pureFieldHeader);
                        }
                      }else{
                          if (field.type == "line_chart") {
                            var pureFieldHeader = {
                                              ref: field.ref,
                                              type: field.type,
                                              name: 'chart_base64_image_1',
                                              series : field.series,
                                              moduleID: section.moduleID,
                                              value: isPrint?null:(field.headerImage ? field.headerImage:''),
                                              //base64Data: isPrint? (field.headerImage ? field.headerImage:null) :null,
                                            };
                            fields.push(pureFieldHeader);
                          }
                        }
                }
            }
        }//End for of rows

      

    }//end for of sections

  }
  
  console.log('----------------------------------->Conver time = ',(new Date() - startAt),' ms <------------------------------');
  return fields;

}

