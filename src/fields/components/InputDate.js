import React, { Component } from 'react'
import * as util from '../../redux/lib/utilities';
import moment from 'moment';

export default class Label extends Component {

    static contextTypes = {
      updateField: React.PropTypes.func,
      updateTableField: React.PropTypes.func,
      onMyBlur: React.PropTypes.func
    }

    static propTypes = {
      name: React.PropTypes.string,
      size: React.PropTypes.string,
      roles: React.PropTypes.object,
      userRole: React.PropTypes.object,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      fieldID: React.PropTypes.number,
      value: React.PropTypes.string
    }

    
    updateField(value){

        //console.log('InputDate: update value ABC |||||| = ',value);

        if(this.props.rowTableId >= 0 && this.props.colTableId >= 0){
            console.log('InputDate: update value = ',value);
            this.context.updateTableField(this.props.sectionID,this.props.rowID,this.props.fieldID,this.props.rowTableId,this.props.colTableId,value);
        }else{
            this.context.updateField(this.props.sectionID,this.props.rowID,this.props.fieldID,value);
        }

   }

   onBlur(event){
      this.context.onMyBlur(this.props.sectionID,this.props.rowID,this.props.fieldID,event.target.value);
    }

   setValue(value){
        if(value){
            if(value.indexOf('+') > -1)
                value = moment(value).format('DD/MM/YYYY');
            $(this.refs.input).datepicker("update", value);
        }
    }    

    componentDidMount() {
        console.log('VVV');
        var self = this;
        $(this.refs.input).datepicker({
            autoclose: !0,
            format: 'dd/mm/yyyy',
            clearBtn:true,
        }).on('changeDate',function(e) {            
            var value = this.value;            
            self.updateField(value);  
                
        });

        var dateFormat = null;

        if (this.props.value) {
            if (typeof this.props.value === 'string' || this.props.value instanceof String){
                //console.log('is string');
                if (this.props.value.trim().length>10 ) {
                    dateFormat = moment(this.props.value, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY");
                }else{
                    dateFormat= this.props.value;
                }

            }else{
                //console.log('is not string');
                dateFormat = moment(this.props.value, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY");
            }
        }else{
            dateFormat = '';
        }
        self.setValue(dateFormat);
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
        var display_name = null;
        if(this.props.permission === 'eformDev'){
            display_name = (
                <div style={{position: 'absolute', top: -30, left: 0, backgroundColor: 'green', color: 'white', padding: 5}}>
                    {this.props.name + ' ' +this.props.refTemp}
                </div>
            )
        }
        var inputStyle = {
            paddingLeft: '1px',
            paddingRight:'1px'
        }
        switch(type){
            case 'default':
                html = (
                    <input type="text" className={this.props.className} name={this.props.name} ref="input" placeholder={this.props.placeholder} disabled={isDisabled}/>
                )
                break;
            case 'eform_input_date':
                html = (
                    <div className={"dragField col-xs-"+this.props.size} ref="group">
                        {display_name}
                        <div className="form-group" id={this.props.groupId}>
                            <div className="col-xs-12">
                                <input title={this.props.name} type="text" className="form-control" style={inputStyle} name={this.props.name} ref="input" placeholder={this.props.placeholder}
                                    id={this.props.refTemp} onDoubleClick = {this.selection}   onBlur={this.onBlur.bind(this)}                                    
                                    disabled={isDisabled}/>
                            </div>
                        </div>
                    </div>
                )
                break;
            case 'd':
                html = (
                    <input type="text" className="form-control" style={inputStyle} name={this.props.name} ref="input" placeholder={this.props.placeholder} 
                        id={this.props.refTemp} disabled={isDisabled} />
                )
                break;
        }
        return html;

    }
}
