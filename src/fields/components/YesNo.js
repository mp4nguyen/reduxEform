import React, { Component } from 'react'

import * as util from '../../redux/lib/utilities';


export default class YesNo extends Component {

    static contextTypes = {
      updateField: React.PropTypes.func,
      updateTableField: React.PropTypes.func
    }

    static propTypes = {
      name: React.PropTypes.string,
      size: React.PropTypes.string,
      roles: React.PropTypes.object,
      userRole: React.PropTypes.object,
      value: React.PropTypes.string,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      fieldID: React.PropTypes.number
    }


    componentDidMount(){

    }

    _onChangeChecked(value){

        if(this.props.rowTableId >= 0 && this.props.colTableId >= 0){
            //console.log('InputText: update value = ',event.currentTarget.checked);
            this.context.updateTableField(this.props.sectionID,this.props.rowID,this.props.fieldID,this.props.rowTableId,this.props.colTableId,value);
        }

    }


    render(){

        var checked =false;
        // var isNull = false;

        if (this.props.value) {
            if (this.props.value == "yes") {
                checked=true;
            }else if(this.props.value == "no"){
                checked=false;
            }
            // isNull=false;
        }

        // if(isNaN(this.props.value)){
        //     isNull = true;
        //     console.log('isNull >>>>>>', isNull);
        // }




        return (
            <div className="form-group">
                <div className="col-xs-12">
                    <div className="icheck-inline">
                        <label>
                            <div className={this.props.value == 'yes' ?"iradio_square-green checked":"iradio_square-green"} style={{position: 'relative'}}>
                                <input
                                        style={{ labelHover: false, cursor: true, radioClass: 'iradio_square-green', position: 'absolute', opacity:0}}
                                        type="radio" name=""
                                        checked={checked}
                                        onChange={this._onChangeChecked.bind(this,"yes")} />
                            </div>
                            &nbsp;
                            Yes
                        </label>
                        <label>
                            <div className={this.props.value == 'no'?"iradio_square-green checked":"iradio_square-green"} style={{position: 'relative'}}>
                                <input
                                        style={{ labelHover: false, cursor: true, radioClass: 'iradio_square-green', position: 'absolute', opacity:0}}
                                        type="radio"
                                        checked={!checked}
                                        onChange={this._onChangeChecked.bind(this,"no")}/>
                            </div>
                            &nbsp;
                            No
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}
