import React from 'react';
class Home extends React.Component {

  render() {
    return (
    <div className='login-form'>
        <div className='login-content'>
            <div className='form-login-error'>
                <h3>DashBoard Login</h3>
                <p>Enter <strong>Test</strong>/<strong>Test</strong> as login and password.</p>
            </div>
            <form method='post' role='form' id='form_login' action='index.html'>
                <div className='form-group'>
                    <div className='input-group'>
                        <div className='input-group-addon'>
                            <i className='fa fa-user'>username</i>
                        </div>
                        <input type='text' className='form-control' name='username' id='username' placeholder='Username'/>
                    </div>
                </div>
                <div className='form-group'>
                    <div className='input-group'>
                        <div className='input-group-addon'>
                            <i className='fa fa-key'>password</i>
                        </div>
                        <input type='password' className='form-control' name='password' id='password' placeholder='Password'/>
                    </div>

                </div>

                <div className='form-group'>
                    <button type='button' className='btn btn-primary btn-block btn-login'>
                        <i className='fa fa-sign-in'></i>
                        Login In
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
  }
}
export default Home;
