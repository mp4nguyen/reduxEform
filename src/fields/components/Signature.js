import React, { Component } from 'react'


export default class Signature extends Component {

    static contextTypes = {
      updateField: React.PropTypes.func
    }

    static propTypes = {
      name: React.PropTypes.string,     
      size: React.PropTypes.string,
      roles: React.PropTypes.object,
      userRole: React.PropTypes.object,           
      value: React.PropTypes.string,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      value: React.PropTypes.object

    }

    
    componentDidMount() {
        var self = this;
        setTimeout(function(){
            $(self.refs.signature).jSignature({width: '100%', height: self.props.height});

            if(self.props.value){            
                $(self.refs.signature).jSignature("setData", "data:" + self.props.value.main.join(","));          
            }

            $(self.refs.signature).bind('change', function(e){
                var data = $(self.refs.signature).jSignature('getData', 'default');
                data = data.replace('data:image/png;base64,','');
                var returnObjDraw = {
                    main: $(self.refs.signature).jSignature('getData', 'base30'),
                    sub: data
                };
                
                // if(this.props.isDisabled == false){            
                    self.context.updateField(self.props.sectionID,self.props.rowID,self.props.fieldID, returnObjDraw);
                // }

            })

        })


    }

    _onReset(){
        // if(this.props.isDisabled == false){ 
            $(this.refs.signature).jSignature("reset");
        // }
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
        var layer = parseInt(this.props.height)+34;
    
        if(this.props.permission === 'eformDev'){
            display_name = (
                <div style={{position: 'absolute', top: -30, left: 0, backgroundColor: 'green', color: 'white', padding: 5}}>
                    {this.props.name + ' ' +this.props.refTemp}
                </div>
            )
        }
        switch(type){
            case 'eform_input_signature':
                html = (
                    <div className={"dragField col-xs-"+this.props.size} ref="group">
                        <div style={{position: 'absolute', height: layer, top: 0, left: 0, width: '100%', zIndex: -1}} ref="layer"/>
                        {display_name}
                        <div className="form-group" id={this.props.groupId}>
                            <div className="col-xs-12">
                                <a className="btn btn-primary btn-sm" onClick={this._onReset.bind(this)} ref="reset">
                                    Reset
                                </a>
                                <div ref="signature" style={{background: '#EEEEEE', height: this.props.height}}
                                    id={this.props.refTemp}/>
                            </div>
                        </div>
                    </div>
                )
        }
        return html;

    }
}

