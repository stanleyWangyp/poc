/* eslint max-len: 0 */
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

// import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.min.css';
import '../../../css/react-bootstrap-table.css';
// import 'jquery';
// import 'bootstrap';
import {
  Navbar,
  Nav,
  NavItem,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar inverse toggleNavKey={ 0 }>
          <Nav>
            <LinkContainer to='/fileUpload'>
            <NavItem><b>FileUpLoad</b></NavItem>
          </LinkContainer>
            <LinkContainer to='/examples/complex'>
              <NavItem><b>DashBoard</b></NavItem>
            </LinkContainer>
            <LinkContainer to='#'>
              <NavItem><b>Login</b></NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
        <Grid fluid>
          <Row>
            <Col md={ 12 }>
              { this.props.children }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default App;
