import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useAuth, useWindowSize } from '../../lib/hooks';
import { SCREEN, TEXT } from '../../lib/constants';
import { TopNavButton } from '../../components/TopNavButton';
import VersionIcon from '../../assets/icons/version.svg';
import ExitIcon from '../../assets/icons/exit.svg';
const cx = classNames.bind(styles);

// the Home page where users manage their courses
export const Home = () => {
    const { authName, updateAuth } = useAuth();
    const { type, width } = useWindowSize();
    const isSmallScreen = type === SCREEN.MOBILE || width < 500;

    return <div className={cx(styles.wrapper)} data-testid='home-wrapper'>
        <div className={cx(styles.topNav)} data-testid='home-topnav'>
            <span 
                className={cx(styles.topNavText, {
                    [styles.smallScreen]: isSmallScreen
                })}
                data-testid='home-topnav-text'
            >
                {`Hello, ${authName}`}
            </span>
            <TopNavButton
                className={cx(styles.lastVersion)}
                text={TEXT.LAST_VERSION}
                icon={VersionIcon}
            />
            <TopNavButton
                className={cx(styles.exit)}
                text={TEXT.EXIT}
                icon={ExitIcon}
                onClick={() => updateAuth({})}
            />
        </div>
        <div className={cx(styles.courseLists)} data-testid='home-courseLists'>

        </div>
    </div>
}