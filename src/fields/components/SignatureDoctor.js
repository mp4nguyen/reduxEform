import React, { Component } from 'react'
import * as util from '../../redux/lib/utilities';
import {printRequest,postRequest,getRequest, getImageRequest} from '../../redux/lib/request';
import Signature from './Signature';

 var isNoUpdate = 0;

export default class SignatureDoctor extends Component {

    static contextTypes = {
        updateField:React.PropTypes.object,
        Doctor:React.PropTypes.object
    }

    static propTypes = {
      size: React.PropTypes.string,
      roles: React.PropTypes.object,
      userRole: React.PropTypes.object,
      value: React.PropTypes.string,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      fieldID: React.PropTypes.number,
      doctorType: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            imageUid: ''
        }
    }


    encode(input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {
            chr1 = input[i++];
            chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
            chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                      keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    }

    componentDidMount() {
        self=this;

        // console.log('this.props.valueSign.main >>>', this.props.valueSign.main);

        var dataSign = this.props.valueSign;

        var para = self.props.refTemp;

        // var refName = "#"+"signature_"+this.props.name;
        var refName = "#"+"signature_"+this.props.name+"_"+this.props.sectionID+"_"+this.props.rowID+"_"+this.props.fieldID;
        // console.log('refName >>>>>',refName);

        
        // console.log('signatureDoctor.componentDidMount =>  self.context.Doctor = ',self.context.Doctor);
        // console.log('signatureDoctor.componentDidMount =>  doctorType = ',this.props.doctorType);
        let doctors = []

        if(self.context.Doctor){
            doctors = self.context.Doctor[this.props.doctorType]
        }

        console.log('signatureDoctor.componentDidMount =>  doctors = ',doctors, 'self.props>>>', self.props);

        if (!self.props.image) {

            console.log('enter have image');
                
                // if(this.context.Doctor.Signature){
            if(doctors && doctors.length > 0){
                // var uidSignature = this.context.Doctor.Signature;
                var uidSignature = doctors[0].Signature;

                if (uidSignature) {

                    console.log('enter have image data  uidSignature>>>>>');
                
                    getImageRequest('/api/downloadFileWithoutLogin/'+uidSignature).then(response => {

                        console.log('response>>>>>>>>>>>>>>>>>>>>>>>',response);

                        var bytes = new Uint8Array(response.data);

                        var base64Str= self.encode(bytes);

                        $(self.refs.canvas).attr('src', "data:image/jpg;base64,"+base64Str);

                        console.log('enter have image data >>>>>');

                        self.updateField(base64Str);

                        self.setState({imageUid:uidSignature});

                    }, function(error){
                        console.log('errrrrrrrrrrrrrrrrr', error);
                    });

                }else{
                    setTimeout(function(){

                        $(refName).jSignature({width: '100%', height: '200px'});

                        if(self.props.valueSign){ 
                            // console.log('self.props.valueSign',self.props.valueSign);

                            if (self.props.valueSign.main) {

                                // console.log('refName 1111111>>>>>',refName);
                                // console.log('self.props.valueSign 1111111>>>>>',dataSign);

                                $(refName).jSignature("setData", "data:" + dataSign.main.join(","));                          

                            }else{
                                $(refName).jSignature("reset");
                            }
                        }

                        $(refName).bind('change', function(e){

                            var arrParas = e.target.id.split("_");
                            var _sectID = arrParas[arrParas.length-3];
                            var _rowID = arrParas[arrParas.length-2];
                            var _fieldID = arrParas[arrParas.length-1];

                            // console.log('"#"+e.target.id', "#"+e.target.id);

                            var data = $("#"+e.target.id).jSignature('getData', 'default');
                            data = data.replace('data:image/png;base64,','');
                            var returnObjDraw = {
                                main: $("#"+e.target.id).jSignature('getData', 'base30'),
                                sub: data
                            };

                            if (isNoUpdate == 0) {                                                
                                self.context.updateField(_sectID, _rowID, _fieldID, returnObjDraw);
                            }

                        })

                    })                    
                }                
            }

        }else{
            if(doctors && doctors.length > 0){
                $(self.refs.canvas).attr('src', "data:image/jpg;base64,"+ self.props.image);
                self.updateField(self.props.image);
                self.setState({imageUid:''});
            }
        }

    }

    updateField(value){
        this.context.updateField(this.props.sectionID,this.props.rowID,this.props.fieldID, value);
    }

    _reloadDoctor(){
        var self = this;

        self=this;
        // console.log('signatureDoctor._reloadDoctor =>  userRole = ',self.props.userRole);
  //       console.log('signatureDoctor._reloadDoctor =>  self.context.Doctor = ',self.context.Doctor);
  //       console.log('signatureDoctor._reloadDoctor =>  doctorType = ',this.props.doctorType);
        let doctors = []

        if(self.context.Doctor){
            doctors = self.context.Doctor[this.props.doctorType]
        }

        // console.log('signatureDoctor._reloadDoctor =>  doctors = ',doctors);
        // console.log('signatureDoctor._reloadDoctor =>  self.context.Doctor = ',self.context.Doctor);
        // console.log('signatureDoctor._reloadDoctor =>  this.props.doctorType = ',this.props.doctorType);


        if(doctors && doctors.length > 0){

            for(var i = 0; i<doctors.length; i++){
                
                let doctorObject = doctors[i]
                
                // console.log('signatureDoctor._reloadDoctor =>  doctorObject = ',doctorObject, self.props.userRole);
                if (self.props.userRole.Doctor) {
                    if(doctorObject.UID == self.props.userRole.Doctor.UID){
                      
                      var uidSignature = doctorObject.Signature;

                      getImageRequest('/api/downloadFileWithoutLogin/'+uidSignature).then(response => {

                          // console.log('response', response);

                          var bytes = new Uint8Array(response.data);

                          var base64Str= self.encode(bytes);

                          $(self.refs.canvas).attr('src', "data:image/jpg;base64,"+base64Str);

                          self.updateField(base64Str);

                          self.setState({imageUid:uidSignature});

                      });

                      break;
                    }
                }
            }
        }
    }

    _onReset(){
        if (isNoUpdate == 0) {
            var refName = "#"+"signature_"+this.props.name+"_"+this.props.sectionID+"_"+this.props.rowID+"_"+this.props.fieldID;
            $(refName).jSignature("reset");
        }
    }

    render() {

        var isDisabled = false;
        var isVisible = true;

        if(this.props.isDisabled){
            isDisabled = this.props.isDisabled;
        }

        if(this.props.isVisible){
            isVisible = this.props.isVisible;
        }

        var type = this.props.type;
        var html = null;
        var htmlSignature = (this.imageSignature)?<img ref="sign"/>:'No signature';
        var display = (
            <div className="col-xs-12" style={{border: '1px solid green'}}>
                <img ref="canvas" width="100%" id={this.props.refTemp} disabled={isDisabled}/>
            </div>
        )

        var doctors=[];
        console.log('this.context.Doctor >>>>>',this.context.Doctor, 'this.props.doctorType', this.props.doctorType);        
        doctors = this.context.Doctor[this.props.doctorType];        

        if(doctors && doctors.length > 0){

            if (this.props.userRole.Doctor) {

                if(doctors[0].UID == this.props.userRole.Doctor.UID){

                    console.log('have doctor Type',doctors);

                    var uidSignature = doctors[0].Signature;

                    if (uidSignature) {
                                                                        
                        switch(type){
                            case 'eform_input_image_doctor':
                                html = (
                                    <div className={"dragField col-xs-"+this.props.size} ref="group">
                                        <a className="btn btn-primary btn-sm" onClick={this._reloadDoctor.bind(this)} ref="reset">
                                            Reload
                                        </a>
                                        <div className="form-group" id={this.props.groupId}>
                                            {display}
                                        </div>
                                    </div>
                                )
                        }
                                                                
                    }else{

                        var layer = parseInt(this.props.height)+34;
                        html = (
                            <div className={"dragField col-xs-"+this.props.size} ref="group">
                                <div className="form-group">
                                    <div className="col-xs-12">
                                        <a className="btn btn-primary btn-sm" onClick={this._onReset.bind(this)} ref="reset">
                                            Reset
                                        </a>
                                        <div ref={"signature_"+this.props.name} style={{background: '#EEEEEE', height:'200px'}}
                                            // id={this.props.refTemp}/>
                                            id={"signature_"+this.props.name+"_"+this.props.sectionID+"_"+this.props.rowID+"_"+this.props.fieldID}/>
                                    </div>                       
                                </div>
                            </div>            
                        )
                        
                    }
                
                }else{
                    if (this.props.image) {
                        switch(type){
                        case 'eform_input_image_doctor':
                            html = (
                                <div className={"dragField col-xs-"+this.props.size} ref="group">
                                    <a className="btn btn-primary btn-sm" onClick={this._reloadDoctor.bind(this)} ref="reset">
                                        Reload
                                    </a>
                                    <div className="form-group" id={this.props.groupId}>
                                        {display}
                                    </div>
                                </div>
                            )
                        }    
                    
                    }else if(this.props.valueSign && this.props.valueSign.main ){
                        var layer = parseInt(this.props.height)+34;
                        html = (
                            <div className={"dragField col-xs-"+this.props.size} ref="group">
                                <div className="form-group">
                                    <div className="col-xs-12">
                                        <a className="btn btn-primary btn-sm" onClick={this._onReset.bind(this)} ref="reset">
                                            Reset
                                        </a>
                                        <div ref={"signature_"+this.props.name} style={{background: '#EEEEEE', height:'200px'}} 
                                            // id={this.props.refTemp}/>
                                            id={"signature_"+this.props.name+"_"+this.props.sectionID+"_"+this.props.rowID+"_"+this.props.fieldID}/>
                                    </div>                       
                                </div>
                            </div>            
                        )
                        isNoUpdate = 1;
                    }else{
                        html = (
                            <div className={"dragField col-xs-"+this.props.size} ref="group">
                                <a className="btn btn-primary btn-sm" onClick={this._reloadDoctor.bind(this)} ref="reset">
                                    Reload
                                </a>
                                <div className="form-group" id={this.props.groupId}>
                                    {display}
                                </div>
                            </div>
                        )
                    }
                }
            }else{

                if (this.props.image) {
                    switch(type){
                    case 'eform_input_image_doctor':
                        html = (
                            <div className={"dragField col-xs-"+this.props.size} ref="group">
                                <a className="btn btn-primary btn-sm" onClick={this._reloadDoctor.bind(this)} ref="reset">
                                    Reload
                                </a>
                                <div className="form-group" id={this.props.groupId}>
                                    {display}
                                </div>
                            </div>
                        )
                    }    
                
                }else if(this.props.valueSign && this.props.valueSign.main ){
                    var layer = parseInt(this.props.height)+34;
                    html = (
                        <div className={"dragField col-xs-"+this.props.size} ref="group">
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <a className="btn btn-primary btn-sm" onClick={this._onReset.bind(this)} ref="reset">
                                        Reset
                                    </a>
                                    <div ref={"signature_"+this.props.name} style={{background: '#EEEEEE', height:'200px'}} 
                                        // id={this.props.refTemp}/>
                                        id={"signature_"+this.props.name+"_"+this.props.sectionID+"_"+this.props.rowID+"_"+this.props.fieldID}/>
                                </div>                       
                            </div>
                        </div>            
                    )
                    isNoUpdate = 1;
                }else{
                    html = (
                        <div className={"dragField col-xs-"+this.props.size} ref="group">
                            <a className="btn btn-primary btn-sm" onClick={this._reloadDoctor.bind(this)} ref="reset">
                                Reload
                            </a>
                            <div className="form-group" id={this.props.groupId}>
                                {display}
                            </div>
                        </div>
                    )
                }

                
            }

            console.log('html>>>>',html);
            return html;
        
        }else{

            switch(type){
                case 'eform_input_image_doctor':
                    html = (
                        <div className={"dragField col-xs-"+this.props.size} ref="group">
                            <a className="btn btn-primary btn-sm" onClick={this._reloadDoctor.bind(this)} ref="reset">
                                Reload
                            </a>
                            <div className="form-group" id={this.props.groupId}>
                                {display}
                            </div>
                        </div>
                    )
            }
            return html;

        }

    }
}

