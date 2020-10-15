import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';
import SocialLogin from './SocialLogin';

const enhance = translate();

class LoginForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    error: PropTypes.object,
    supportsSocialAuth: PropTypes.bool,
    onLogin: PropTypes.func,
    onOpenResetPasswordDialog: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = { busy: false };
  }

  handleSubmit = (event) => {
    const { onLogin } = this.props;

    event.preventDefault();
    this.setState({ busy: true });
    onLogin({
      email: this.email.value,
      password: this.password.value,
    }).finally(() => {
      this.setState({ busy: false });
    });
  };

  handleResetPassword = (event) => {
    const { onOpenResetPasswordDialog } = this.props;

    event.preventDefault();
    onOpenResetPasswordDialog();
  };

  refEmail = (email) => {
    this.email = email;
  };

  refPassword = (password) => {
    this.password = password;
  };

  render() {
    const { t, error, supportsSocialAuth } = this.props;
    const { busy } = this.state;

    return (
      <Form className="LoginForm" onSubmit={this.handleSubmit}>
        {error && <FormGroup>{error.message}</FormGroup>}
        {supportsSocialAuth && (
          <>
            <FormGroup>
              <SocialLogin />
            </FormGroup>
            <Divider>or</Divider>
          </>
        )}
        <FormGroup>
          <TextField
            ref={this.refEmail}
            className="LoginForm-field"
            type="email"
            autoComplete="email"
            placeholder={t('login.email')}
            icon={<EmailIcon htmlColor="#9f9d9e" />}
            autoFocus
          />
        </FormGroup>

        <FormGroup>
          <TextField
            ref={this.refPassword}
            className="LoginForm-field"
            type="password"
            autoComplete="current-password"
            placeholder={t('login.password')}
            icon={<PasswordIcon htmlColor="#9f9d9e" />}
          />
        </FormGroup>

        <FormGroup>
          <Button
            className="LoginForm-submit"
            disabled={busy}
          >
            {busy ? (
              <div className="Button-loading">
                <CircularProgress size="100%" />
              </div>
            ) : t('login.login')}
          </Button>
        </FormGroup>

        <FormGroup className="LoginForm-forgot">
          <a
            href="#forgot"
            onClick={this.handleResetPassword}
            className="LoginForm-forgotLink"
          >
            {t('login.forgotPassword')}
          </a>
        </FormGroup>
      </Form>
    );
  }
}

export default enhance(LoginForm);
