module.exports = {
	convertEformDataStringToObject: function(formDataInStr){
		var data = JSON.parse(formDataInStr);
		var dataInObject = {};
		for(var i = 0;i<data.length;i++){
				var f = data[i];
				if(f.type == 'table'){
						var tableObject = dataInObject[f.ref];
						if(tableObject){
								tableObject.fields[f.refChild]=f;
						}else{
								var fields = {};
								fields[f.refChild]=f;
								dataInObject[f.ref] = {type:'table',ref:f.ref,fields}
						}
				}else{
						dataInObject[f.ref] = f;
				}
		}
		return dataInObject;
	},
	convertEformDataStringToObjectByName: function(formDataInStr){
		var data = JSON.parse(formDataInStr);
		var dataInObject = {};
		for(var i = 0;i<data.length;i++){
				var f = data[i];
				var fieldObject = dataInObject[f.name];
				if(fieldObject){
						if(!fieldObject.groups){
								fieldObject.groups = [];
						}
						fieldObject.groups.push(f);
				}else{
						dataInObject[f.name] = f;
				}

		}
		return dataInObject;
	},




	getField: function(template,position){
		// var getFieldStartAt = new Date();
		// var section = template.sections[position.sectionID];
		// console.log('getField: 0. time = ',(new Date()) - getFieldStartAt ,' ms');
		// var row = section.rows[position.rowID];
		// console.log('getField: 1. time = ',(new Date()) - getFieldStartAt ,' ms');
		// var field = row.fields[position.fieldID];
		// console.log('getField: 2. time = ',(new Date()) - getFieldStartAt ,' ms');

		//console.log('position',position);
		var field = template.sections[position.sectionID].rows[position.rowID].fields[position.fieldID];
		//console.log('field',field);
		return field;
	},
	getParamsIframe: function(appointmentId, patientId,userId){
		return '/eform?appoinmentUID='+appointmentId+'&patientUID='+patientId+'&userUID='+userId;
	},
	getDateTimeZone: function(date){
		if(date === '')
			return '';
		var res = date.charAt(2);
		if(res === '/'){
			var split = date.split('/');
			var z = moment().format('Z');
			return split[2]+'-'+split[1]+'-'+split[0]+' 00:00:00 '+z;
		}
	},
	getPrefixField: function(typeString, findString){
			if(typeString){
					return typeString.indexOf(findString);
			}else{
					return -1;
			}
	},
	getParams: function(concatString){
		var res = [];
		var substring = concatString.substring(concatString.indexOf('(') + 1, concatString.length-1);
		var substringRes = substring.split(',');
		for(var i = 0; i < substringRes.length; i++){
			res.push(substringRes[i]);
		}
		return res;
	},
	getArrayPrecal: function(position, concatString){
		var res = [];
		var substring = concatString.substring(concatString.indexOf('(') + 1, concatString.length-1);
		var substringRes = substring.split(',');
		for(var i = 0; i < substringRes.length; i++){
			res.push(substringRes[i]);
		}
		return res;
	},
	getArrayDefault: function(defaultString){
		var res = [];
		var substring = defaultString.substring(8, defaultString.length-1);
		var substringRes = substring.split(',');
		for(var i = 0; i < substringRes.length; i++){
			res.push(substringRes[i]);
		}
		return res;
	},
	setDate: function(date){
		if(date === '')
			return '';
		var dateTZ = moment(date).format('DD/MM/YYYY');
		return dateTZ;
	},
	parseQueryString: function(location){
	        var params = location.split('?');
	        var str = params[1];
	        var objURL = {};

	        str.replace(
	            new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
	            function( $0, $1, $2, $3 ){
	                objURL[ $1 ] = $3;
	            }
	        );
	        return objURL;
	},

	getAuthInfo: function() {
		return {
			systemtype: Cookies.get('systemtype'),
			deviceid: Cookies.get('__browserFingerprint'),
			appid: Cookies.get('appid'),
			authorization: 'Bearer ' + Cookies.get('token')
		}
	},

	getDisabled: function(arrRolesEdit, userRoleStr){
	  	var isDisabled= false;
	  	if (arrRolesEdit) {
		  	arrRolesEdit.map(function(role, index){
		      var index = role.ref.indexOf("_");
		      if (index>0) {
		        var roleStr = role.ref.substring(index+1, role.ref.length);

		        // console.log('roleStr in Render InputText', roleStr);

		        if (userRoleStr == roleStr) {
		            if (role.value == "no") {
		              isDisabled = true
		            }
		        }
		      }

		    })
	  	}

	  return isDisabled
	},

	getVisible:function(arrRolesView, userRoleStr){

	    var isVisible= true;
	    if (arrRolesView) {
		    arrRolesView.map(function(role, index){
			var indexView = role.ref.indexOf("_");
			if (indexView>0) {
				var roleStrView = role.ref.substring(indexView+1, role.ref.length );

				// console.log('roleStrView in Render InputText', roleStrView);

				if (userRoleStr == roleStrView) {
					if (role.value == "no") {
					  isVisible = false
					}
				}
			}

			})
		}
	  return isVisible
	}

}
