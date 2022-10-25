import styles from './index.module.css';
import classNames from 'classnames/bind';
import { TEXT } from '../../lib/constants';
import VandyIcon from '../../assets/icons/vandy.svg';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../../lib/hooks';
const cx = classNames.bind(styles);

// the authentication page
export const AuthPage = () => {
    const { updateAuth } = useAuth();
    const handleLogInResponse = (response) => {
        const { name = "", email = "" } = jwt_decode(response.credential);
        updateAuth({ name, email });
    }
    
    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
          client_id: '237156054363-e8mh2mlovao9kbcd155sef698su7se77.apps.googleusercontent.com',
          callback: handleLogInResponse
      });
      google.accounts.id.renderButton(
        document.getElementById('google-button'),
        { theme: 'filled_blue', size: 'large', text: 'signin_with' }
      )
    }, []);

    return <div className={cx(styles.authWrapper)} data-testid='auth-page-wrapper'>
        <div className={cx(styles.authTitle)} data-testid='auth-page-title'>
            {TEXT.AUTH_PAGE_TITLE}
        </div>
        <div className={cx(styles.authIconWrapper)} data-testid='auth-page-icon-wrapper'>
            <img src={VandyIcon} className={cx(styles.authIcon)} data-testid='auth-page-icon'/>
        </div>
        <div className={cx(styles.googleButton)} data-testid='auth-page-google-button' id='google-button'></div>
    </div>
}