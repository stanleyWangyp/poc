require('./demo.css');
import React from 'react';
import App from './app';
class Demo extends React.Component {
  constructor(props) {
    super(props);
    console.log('_---------------------------------------');
    this.state = {
      list: [ { value: 'One', selected: true }, { value: 'Two' }, { value: 'Three' }, { value: 'Four', label: 'Four Label' } ]
    };
  }
  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <App/>
        </div>
      </div>
    );
  }
}
export default Demo;
