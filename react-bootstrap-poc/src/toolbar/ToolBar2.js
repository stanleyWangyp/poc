import React, { Component } from 'react';
import Notifier from '../Notification.js';

class ToolBar2 extends Component {

  static modalSeq = 0;

  constructor(props) {
    super(props);
    this.timeouteClear = 0;
    this.modalClassName;
    this.state = {
      isInsertRowTrigger: true,
      validateState: null,
      shakeEditor: false,
      showSelected: false
    };
  }
  render() {
    const searchTextInput = this.renderSearchPanel();

    return (
    <div>
    <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
      { searchTextInput }
    </div>
        <div className='row'>
            <Notifier ref='notifier' />
        </div>
    </div>
    );
  }
  renderSearchPanel() {
    let classNames = 'form-group form-group-sm react-bs-table-search-form';
    let clearBtn = null;
    if (this.props.clearSearch) {
      clearBtn = (
          <span className='input-group-btn'>
            <button
                className='btn btn-default'
                type='button'
                onClick={ this.handleClearBtnClick }>
              Clear
            </button>
          </span>
      );
      classNames += ' input-group input-group-sm';
    }
    return (
        <div className={ classNames }>
          <div className='table-responsive'>
          <table className='table'>
            <tr>
                <td><label htmlFor='Cob_Date'>Cob Date</label></td>
              <td>
                <input ref='seachInput' id='Cob_Date'
                    className='form-control'
                    type='text'
                    placeholder={ this.props.searchPlaceholder ? this.props.searchPlaceholder : 'Cob Date' }
                    onKeyUp={ this.handleKeyUp }/>
                    { clearBtn }
              </td>
              </tr>
                <tr>
              <td><label htmlFor='SourceSystem'>Source System</label></td>
              <td>
                <input ref='seachInput' id='SourceSystem'
                    className='form-control'
                    type='text'
                    placeholder={ this.props.searchPlaceholder ? this.props.searchPlaceholder : 'SourceSystem' }
                    onKeyUp={ this.handleKeyUp }/>
                    { clearBtn }
              </td>
            </tr>
            <tr>
              <td><label htmlFor='Region'>Region</label></td>
              <td>
                <input ref='seachInput' id='Region'
                    className='form-control'
                    type='text'
                    placeholder={ this.props.searchPlaceholder ? this.props.searchPlaceholder : 'Region' }
                    onKeyUp={ this.handleKeyUp }/>
                    { clearBtn }
              </td>
            </tr>
            <tr>
              <td><label htmlFor='Site'>Site</label></td>
              <td>
                <input ref='seachInput' id='Site'
                    className='form-control'
                    type='text'
                    placeholder={ this.props.searchPlaceholder ? this.props.searchPlaceholder : 'Site' }
                    onKeyUp={ this.handleKeyUp }/>
                    { clearBtn }
              </td>
            </tr>
          </table>
          </div>
        </div>
    );
  }
}

export default ToolBar2;
