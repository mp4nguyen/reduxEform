import React, { Component } from 'react';
import * as _ from 'underscore'

import InputText from '../../fields/components/InputText';
import YesNo from '../../fields/components/YesNo';
import CheckBox from '../../fields/components/CheckBox';
import InputDate from '../../fields/components/InputDate';


export default class Table extends Component {

    static propTypes = {
      content: React.PropTypes.object,
      tableHeader: React.PropTypes.object,
      tableData: React.PropTypes.object,
      fieldID: React.PropTypes.number,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number
    }

    shouldComponentUpdate(nextProps,nextState,nextContext){
        //var startAt = new Date();
        //console.log(' row nextContext.updatingFields = ',nextContext.updatingFields);
        return true;
    }    

    componentDidMount() {

    }

    _renderTableContent(){
        var content = [];

        for(var indexRow = 0;indexRow < this.props.tableData.length; indexRow++){
            var row = this.props.tableData[indexRow];
            content.push(
                <tr key={indexRow}>
                    {
                        row.map(function(c, indexCol){
                            var type = c.typeChild;
                            
                            if (type=="radio_yes_no") {
                              console.log('_renderTableContent >>> type',type);
                            }

                            if(type === 'it')
                                return (
                                    <td key={indexCol}>
                                        <InputText
                                            key={indexCol}
                                            code={indexCol}
                                            value={c.value}
                                            colTableId={indexCol}
                                            rowTableId={indexRow}
                                            fieldID={this.props.fieldID}
                                            rowID={this.props.rowID}
                                            sectionID={this.props.sectionID}
                                        />
                                    </td>
                                )
                            else if(type === 'c')
                                return (
                                    <td key={indexCol} style={{verticalAlign: 'middle'}}>
                                        <center>
                                            <span style={{verticalAlign: 'middle', display: 'inline-block', textAlign: 'center'}}>
                                                <CheckBox
                                                    key={indexCol} 
                                                    type={type}
                                                    ref={"field_"+indexRow+'_'+indexCol}
                                                    code={indexCol}
                                                    checked= {c.checked}                                                    
                                                    colTableId={indexCol}
                                                    rowTableId={indexRow}
                                                    fieldID={this.props.fieldID}
                                                    rowID={this.props.rowID}
                                                    sectionID={this.props.sectionID}
                                                />
                                            </span>
                                        </center>
                                    </td>
                                )
                            else if(type === 'd')
                                return (
                                    <td key={indexCol} style={{verticalAlign: 'middle'}}>
                                        <center>
                                            <span style={{verticalAlign: 'middle', display: 'inline-block', textAlign: 'center'}}>
                                                <InputDate
                                                    key={indexCol} 
                                                    type={type}
                                                    ref={"field_"+indexRow+'_'+indexCol}
                                                    code={indexCol}
                                                    value={c.value}
                                                    colTableId={indexCol}
                                                    rowTableId={indexRow}
                                                    fieldID={this.props.fieldID}
                                                    rowID={this.props.rowID}
                                                    sectionID={this.props.sectionID}
                                                />
                                            </span>
                                        </center>
                                    </td>
                                )
                            else if(type === 'radio_yes_no')
                                return (
                                    <td key={indexCol} style={{verticalAlign: 'middle'}}>
                                        <center>
                                            <span style={{verticalAlign: 'middle', display: 'inline-block', textAlign: 'center'}}>
                                                <YesNo
                                                    key={indexCol} 
                                                    type={type}
                                                    refTemp={this.props.name+"_field_"+indexRow+'_'+indexCol}
                                                    ref={this.props.name+"_field_"+indexRow+'_'+indexCol}
                                                    code={indexCol}
                                                    value={c.value}
                                                    checked={c.checked}
                                                    colTableId={indexCol}
                                                    rowTableId={indexRow}
                                                    fieldID={this.props.fieldID}
                                                    rowID={this.props.rowID}
                                                    sectionID={this.props.sectionID}
                                                />
                                            </span>
                                        </center>
                                    </td>
                                )
                        },this)
                    }
                </tr>
            )
        }

        return content;
    }

    render() {

        console.log('Redering  RowID = ' , this.props.content);

        return(
          <div className="col-md-12 table-responsive">
              <table className="table table-bordered table-striped table-condensed flip-content">
                  <thead className="flip-content">
                      <tr>
                      {
                          this.props.tableHeader.map((col,index)=>{
                              return <th id={index} className="bg-blue-dark bg-font-blue-dark context-col" key={index}>{col.label}</th>
                          })
                      }
                      </tr>
                  </thead>
                  <tbody ref="table">
                      {
                          this._renderTableContent()
                      }
                  </tbody>
              </table>
          </div>
        );

    }
}


//{this.renderRows()}
