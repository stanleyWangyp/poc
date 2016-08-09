/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
/* eslint space-infix-ops: 0 */
/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tabs, Tab } from 'react-bootstrap';

const regionType = {
  0: 'AP',
  1: 'EU',
  2: 'MEA '
};

const siteType = {
  0: 'HKH',
  1: 'LOH'
};

const sSystemType = {
  0: 'Raven MST',
  1: 'Raven EST'
};

const priorityType = {
  0: 'HIGH',
  1: 'MEDIUM'
};

const statusCubeType = {
  0: 'COMPLETE',
  1: 'ERROR'
};

function dateParser(d) {
  return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
}

function onRowSelect(row, isSelected) {
  console.log(row);
  console.log(`selected: ${isSelected}`);
}

function onSelectAll(isSelected) {
  console.log(`is select all: ${isSelected}`);
}

function onAfterSaveCell(row, cellName, cellValue) {
  console.log(`Save cell ${cellName} with value ${cellValue}`);
  console.log('Thw whole row :');
  console.log(row);
}

function onAfterTableComplete() {
  console.log('Table render complete.');
}

function onAfterDeleteRow(rowKeys) {
  console.log('onAfterDeleteRow');
  console.log(rowKeys);
}

function onAfterInsertRow(row) {
  console.log('onAfterInsertRow');
  console.log(row);
}

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  selected: [], // default select on table
  bgColor: 'rgb(238, 193, 213)',
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};

const options = {
  paginationShowsTotal: true,
  sortName: 'name',  // default sort column name
  sortOrder: 'desc',  // default sort order
  afterTableComplete: onAfterTableComplete, // A hook for after table render complete.
  afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
  afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
  sizePerPage: 10
};

function priorityFormatter(cell, row) {
  if (cell === 'A') return '<font color="red">' + cell + '</font>';
  else if (cell === 'B') return '<font color="orange">' + cell + '</font>';
  else return cell;
}

function trClassNameFormat(rowData, rIndex) {
  return rIndex % 3 === 0 ? 'third-tr' : '';
}
function nameValidator(value) {
  if (!value) {
    return 'Job Name is required!';
  } else if (value.length < 3) {
    return 'Job Name length must great 3 char';
  }
  return true;
}
function priorityValidator(value) {
  if (!value) {
    return 'Priority is required!';
  }
  return true;
}

function handleStop() {
  alert('handleStop');
  console.log('执行Stop');
}

function handleRerun() {
  alert('handleRerun');
  console.log('执行Rerun');
}

function handleChangePriorlty() {
  alert('ChangePriorlty');
  console.log('执行handleChangePriorlty');
}

function handleLPD() {
  alert('handleLPD');
  console.log('执行handleLPD');
}

function handleViewLog() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const json = JSON.parse(xhr.responseText);
      console.log(json);
    }
  };
  xhr.open('GET', 'http://localhost:8888/putDatas/'+Date.now(), true);
  xhr.send(null);

  alert('ViewLog');
  console.log('执行ViewLog');
}

function handleRemove() {
  alert('Remove');
  console.log('执行Remove');
}

function actionFormatter(cell) {
  if (cell === '0') {
    return (
      <button type='button' onClick={ handleStop } className='btn btn-link btn-xs'>Stop</button>
    );
  } else if (cell === '1') {
    return (
      <div className='btn-group' role='group' aria-label='...'>
        <button type='button' onClick={ handleChangePriorlty } className='btn btn-link btn-xs'>Change Priorlty</button>
        <button type='button' onClick={ handleLPD } className='btn btn-link btn-xs'>LPD</button>
      </div>
    );
  } else if (cell === '2') {
    return (
        <div className='btn-group' role='group' aria-label='...'>
          <button type='button' onClick={ handleRerun } className='btn btn-link btn-xs'>Rerun</button>
          <button type='button' onClick={ handleLPD } className='btn btn-link btn-xs'>LPD</button>
          <button type='button' onClick={ handleViewLog } className='btn btn-link btn-xs'>View Log</button>
        </div>
    );
  } else if (cell === '3') {
    return (
      <button type='button' onClick={ handleStop } className='btn btn-link btn-xs'>Stop</button>
    );
  } else {
    return (
    <div className='btn-group' role='group' aria-label='...'>
      <button type='button' onClick={ handleRerun } className='btn btn-link btn-xs'>Rerun</button>
      <button type='button' onClick={ handleRemove } className='btn btn-link btn-xs'>Remove</button>
      <button type='button' onClick={ handleLPD } className='btn btn-link btn-xs'>LPD</button>
    </div>
    );
  }
}

function statusFormatter(cell) {
  if (cell === '0') return ( <img src='./images/done16.ico' alt='Done'/> );
  else if (cell === '1') return ( <img src='./images/error16.ico' alt='Error'/> );
  else return cell;
}

function progessFormatter(cell) {
  console.log('********************cell********************');
  console.log(cell);
  console.log('********************cell********************');
  if (cell === '100') {
    return (
        <div className='progress-bar progress-bar-success' role='progressbar'
            aria-valuenow= { cell }
            aria-valuemin='0'
            aria-valuemax='100'
            style={ { width: cell + '%' } }>
        { cell }%
        </div>
    );
  } else if (cell === '87') {
    return (
        <div className='progress-bar progress-bar-warning' role='progressbar'
            aria-valuenow= { cell }
            aria-valuemin='0'
            aria-valuemax='100'
            style={ { width: cell + '%' } }>
        { cell }%
        </div>
    );
  } else {
    return (
        <div className='progress-bar progress-bar-info' role='progressbar'
            aria-valuenow= { cell }
            aria-valuemin='0'
            aria-valuemax='100'
            style={ { width: cell + '%' } }>
        { cell }%
        </div>
    );
  }
}

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      allData: [],
      cobdate: '20160726',
      pendingData: [],
      processingData: []
    };
    this.changeCobDate = this.changeCobDate.bind(this);
  }

  setDefaultDate() {
    let defaultDate = '';
    defaultDate = dateParser(new Date());
    return defaultDate;
  }

  handleClick() {
    console.log(this.state.isVisible);
  }

  changeCobDate(event) {
    const cobDate = { cobdate: event.target.value };
    console.log(cobDate);
    this.setState(cobDate);
    this.updateCompletedList(cobDate);
  }

  updateDynamicStateKey(key, url) {
    const xhr = new XMLHttpRequest();
    const self = this;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const json = JSON.parse(xhr.responseText);
        self.setState({ [key]: json });
      }
    };
    xhr.open('GET', url + '?' + Date.now(), true);
    xhr.send(null);
  }

  updateCompletedList(cobDate) {
    this.updateDynamicStateKey('allData', 'http://localhost:8888/allDatas/' + cobDate);
  }

  updatePendingJobList() {
    this.updateDynamicStateKey('pendingData', 'http://localhost:8888/pendingDatas');
  }

  updateRunningJobList() {
    this.updateDynamicStateKey('processingData', 'http://localhost:8888/processingDatas');
  }

  componentDidMount() {
    const self = this;
    setInterval(function() {
      const cobDate = self.state.cobdate;
      self.updateCompletedList(cobDate);
      self.updatePendingJobList();
      self.updateRunningJobList();
    }, 3 * 1000);
  }

  render() {
    return (
    <div>
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='row'>
                  <table className='table'>
                    <tr>
                      <td><label htmlFor='Cob_Date'>Cob Date</label></td>
                      <td>
                        <input ref='seachInput' id='Cob_Date'
                            className='filter date-filter-input form-control'
                            type='date'
                            onChange={ this.changeCobDate }
                            onKeyUp={ this.handleKeyUp }
                            defaultValue={ this.setDefaultDate() }/>
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor='sourceSystem'>Source System</label></td>
                      <td>
                        <select className='form-control' ref='seachInput' id='sourceSystem'>
                          <option>Please Select</option>
                          <option value='0'>Raven MST</option>
                          <option value='1'>Raven EST</option>
                        </select>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td><label htmlFor='region'>Region</label></td>
                      <td>
                        <select className='form-control' ref='seachInput' id='region'>
                          <option>Please Select</option>
                          <option>AP</option>
                          <option>EU</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor='site'>Site</label></td>
                      <td>
                        <select className='form-control' ref='seachInput' id='site'>
                          <option>Please Select</option>
                          <option>HKH</option>
                          <option>LOH</option>
                        </select>
                      </td>
                    </tr>
                  </table>
                </div>
             </div>
            <div className='col-md-6'>
              <div id='main' className='pieChar'>D3 chat</div>
            </div>
          </div>
        </div>
        <hr/>
      </div>

      <div>
      <Tabs animation>
       <Tab eventKey={ 1 } title='Processing'>
         <BootstrapTable data={ this.state.processingData }
             trClassName={ trClassNameFormat }
             selectRow={ selectRowProp }
             options={ options }
             insertRow
             deleteRow
             search
             hover
             pagination>
           <TableHeaderColumn dataField='id' isKey={ true } hidden={ true } dataSort autoValue>ID</TableHeaderColumn>
           <TableHeaderColumn dataField='cd' dataAlign='center'>COB Date</TableHeaderColumn>
           <TableHeaderColumn dataField='Region' width='90' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
               formatExtraData={ regionType } filter={ { type: 'SelectFilter', options: regionType } }
               isVisible={ this.state.isVisible }>Region</TableHeaderColumn>
           <TableHeaderColumn dataField='Site' width='100' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
               formatExtraData={ siteType } filter={ { type: 'SelectFilter', options: siteType } } isVisible={ this.state.isVisible }>Site</TableHeaderColumn>
           <TableHeaderColumn dataField='SSystem' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
               formatExtraData={ sSystemType } filter={ { type: 'SelectFilter', options: sSystemType } }
               isVisible={ this.state.isVisible }>SourceSystem</TableHeaderColumn>
           <TableHeaderColumn dataField='DataType' dataAlign='center' dataSort={ true }>DataType</TableHeaderColumn>
           <TableHeaderColumn dataField='DataSubType' dataAlign='center' dataSort={ true }>DataSubType</TableHeaderColumn>
           <TableHeaderColumn dataField='Priority' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
               formatExtraData={ priorityType } filter={ { type: 'SelectFilter', options: priorityType } }
               isVisible={ this.state.isVisible }>Priority</TableHeaderColumn>
           <TableHeaderColumn dataField='BatchStatus' dataAlign='center' dataFormat={ progessFormatter } dataSort={ true }>BatchStatus</TableHeaderColumn>
           <TableHeaderColumn dataField='BAction' dataAlign='center' width='160' dataFormat={ actionFormatter } dataSort={ true }>Batch Action</TableHeaderColumn>
           <TableHeaderColumn dataField='StatusCube' dataAlign='center' dataSort={ true } dataFormat={ statusFormatter } isVisible={ this.state.isVisible }
               formatExtraData={ statusCubeType } filter={ { type: 'SelectFilter', options: statusCubeType } }>Status Cube</TableHeaderColumn>
         </BootstrapTable>
      </Tab>
      <Tab eventKey={ 2 } title='Pending'>
        <BootstrapTable data={ this.state.pendingData }
            trClassName={ trClassNameFormat }
            selectRow={ selectRowProp }
            options={ options }
            insertRow
            deleteRow
            search
            hover
            pagination>
          <TableHeaderColumn dataField='id' isKey={ true } hidden={ true } dataSort autoValue>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='cd' dataAlign='center'>COB Date</TableHeaderColumn>
          <TableHeaderColumn dataField='Region' width='90' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
              formatExtraData={ regionType } filter={ { type: 'SelectFilter', options: regionType } }
              isVisible={ this.state.isVisible }>Region</TableHeaderColumn>
          <TableHeaderColumn dataField='Site' width='100' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
              formatExtraData={ siteType } filter={ { type: 'SelectFilter', options: siteType } } isVisible={ this.state.isVisible }>Site</TableHeaderColumn>
          <TableHeaderColumn dataField='SSystem' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
              formatExtraData={ sSystemType } filter={ { type: 'SelectFilter', options: sSystemType } }
              isVisible={ this.state.isVisible }>SourceSystem</TableHeaderColumn>
          <TableHeaderColumn dataField='DataType' dataAlign='center' dataSort={ true }>DataType</TableHeaderColumn>
          <TableHeaderColumn dataField='DataSubType' dataAlign='center' dataSort={ true }>DataSubType</TableHeaderColumn>
          <TableHeaderColumn dataField='Priority' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
              formatExtraData={ priorityType } filter={ { type: 'SelectFilter', options: priorityType } }
              isVisible={ this.state.isVisible }>Priority</TableHeaderColumn>
          <TableHeaderColumn dataField='BatchStatus' dataAlign='center' dataFormat={ progessFormatter } dataSort={ true }>BatchStatus</TableHeaderColumn>
          <TableHeaderColumn dataField='CutOffLine' dataAlign='center' dataSort={ true }>CutOffLine</TableHeaderColumn>
          <TableHeaderColumn dataField='BAction' dataAlign='center' width='160' dataFormat={ actionFormatter } dataSort={ true }>Batch Action</TableHeaderColumn>
        </BootstrapTable>
      </Tab>
      <Tab eventKey={ 3 } title='All'>
          <BootstrapTable data={ this.state.allData }
              trClassName={ trClassNameFormat }
              selectRow={ selectRowProp }
              options={ options }
              insertRow
              deleteRow
              search
              hover
              pagination>
            <TableHeaderColumn dataField='id' isKey={ true } hidden={ true }>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='cd' dataAlign='center'>COB Date</TableHeaderColumn>
            <TableHeaderColumn dataField='Region' width='90' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
                formatExtraData={ regionType } filter={ { type: 'SelectFilter', options: regionType } }
                isVisible={ this.state.isVisible }>Region</TableHeaderColumn>
            <TableHeaderColumn dataField='Site' width='100' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
                formatExtraData={ siteType } filter={ { type: 'SelectFilter', options: siteType } } isVisible={ this.state.isVisible }>Site</TableHeaderColumn>
            <TableHeaderColumn dataField='SSystem' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
                formatExtraData={ sSystemType } filter={ { type: 'SelectFilter', options: sSystemType } }
                isVisible={ this.state.isVisible }>SourceSystem</TableHeaderColumn>
            <TableHeaderColumn dataField='DataType' dataAlign='center' dataSort={ true }>DataType</TableHeaderColumn>
            <TableHeaderColumn dataField='DataSubType' dataAlign='center' dataSort={ true }>DataSubType</TableHeaderColumn>
            <TableHeaderColumn dataField='Priority' dataAlign='center' dataSort={ true } dataFormat={ enumFormatter }
                formatExtraData={ priorityType } filter={ { type: 'SelectFilter', options: priorityType } }
                isVisible={ this.state.isVisible }>Priority</TableHeaderColumn>
            <TableHeaderColumn dataField='BatchStatus' dataAlign='center' dataFormat={ progessFormatter } dataSort={ true }>BatchStatus</TableHeaderColumn>
            <TableHeaderColumn dataField='ProcessedBy' dataAlign='center' dataSort={ true } filter={ { type: 'TextFilter', delay: 1000 } }
                isVisible={ this.state.isVisible }>ProcessedBy</TableHeaderColumn>
            <TableHeaderColumn dataField='BAction' dataAlign='center' width='160' dataFormat={ actionFormatter } dataSort={ true }>Batch Action</TableHeaderColumn>
            <TableHeaderColumn dataField='StatusCube' dataAlign='center' dataSort={ true } dataFormat={ statusFormatter } isVisible={ this.state.isVisible }
                formatExtraData={ statusCubeType } filter={ { type: 'SelectFilter', options: statusCubeType } }>Status Cube</TableHeaderColumn>
          </BootstrapTable>
        </Tab>
      </Tabs>
      </div>
      </div>
    );
  }
}
