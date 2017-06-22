import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';



export default class SubmitModal extends Component {
    
     static contextTypes = {
      submitEform: React.PropTypes.func      
    }

    constructor(props) {
        super(props);        
    }

    componentWillMount(){
    }

    componentWillReceiveProps(nextProps){        
    }

    componentWillUnmount(e){
    }

    componentDidMount() {      
    }

    componentWillUnmount() {      
    }

    componentWillUpdate(){
    }

    componentDidUpdate() {
    }

    _handleSubmit(){

        console.log('this.props >>>>>>>>>>',this.props);
        
        this.context.submitEform();
        
        this._handleClose();

         console.log('this.props >>>>>>>>>>',this.props);
    }


    _handleClose(){
        console.log('this.props close >>>>>>>>>>',this.props);

        if(this.props.closeDialog){
            this.props.closeDialog()
        }
    };


    render() {

          console.log('enter enter enter');

          const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this._handleClose.bind(this)}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this._handleSubmit.bind(this)}
            />,
          ];

          var titleName = 'Confirm Submit';

          return (
            <div>
                <Dialog
                  title={titleName}
                  actions={actions}
                  modal={false}
                  open={this.props.isOpen}
                  onRequestClose={this._handleClose.bind(this)}
                >                  
                </Dialog>
            </div>
          );


    }

}
