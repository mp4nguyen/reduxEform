import React, { Component } from 'react'
import InputText from '../../fields/components/InputText'

export default class InputRecChart extends Component {
   
    static propTypes = {
      name: React.PropTypes.string,      
      size: React.PropTypes.string,
      roles: React.PropTypes.object,
      userRole: React.PropTypes.object,      
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      fieldID: React.PropTypes.number,
      rowAxisID:React.PropTypes.number,
      colAxisID:React.PropTypes.number
    }    

    _onChangeInput(dataIndex, inputIndex, event){
        this.props.series[dataIndex].data[inputIndex] = parseFloat(event.target.value);        
    }
    

    render(){

        console.log('this.props.series >>>>', this.props.series);

        return (
            <div style={{width: '700px'}}>
                <center><h4><b>Hearing Level dB (decibels)</b></h4></center>
                <table className="table-bordered table-condensed table">
                    <thead>
                        <tr>
                            <th>Frequency (Hz)</th>
                            {
                                this.props.axisX.categories.map(function(x, index){
                                    return <th key={index}>{x}</th>
                                }, this)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.series.map(function(serie, index){
                                return (
                                    <tr key={index}>
                                        <td><b> {serie.name} (db)</b></td>
                                        {
                                            serie.data.map(function(input, inputIndex){
                                               
                                                return (
                                                    <td key={inputIndex}>
                                                        <InputText  
                                                                    className="default" 
                                                                    style={{width: '60px', fontSize: '14px', paddingLeft: '3px'}}                                                                                                                                        
                                                                    value={input} 
                                                                    rowAxisID = {index}
                                                                    colAxisID = {inputIndex}
                                                                    fieldID={this.props.fieldID}
                                                                    rowID={this.props.rowID}
                                                                    sectionID={this.props.sectionID}

                                                                    />
                                                    </td>
                                                )
                                            }, this)
                                        }
                                    </tr>
                                )
                            }, this)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}