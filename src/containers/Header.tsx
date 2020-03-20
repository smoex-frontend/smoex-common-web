import * as React from 'react'
import '../index.scss' // TODO: 全局 scss 的引入暂时放在 Header
import { NavLink, Link } from 'react-router-dom'
import styles from './styles/App.module.scss'
import {
  useThemeStyles,
  useToggleModal,
  useModal,
  useToastError,
} from 'react-dom-basic-kit'
import {
  commonSlice,
  accountSelector,
  accountAsyncAction,
} from 'smoex-common-business'
import { LoginModal } from '../partials/LoginModal'
const useStyle = () => useThemeStyles(styles)

const SMOEX_HOME_URL = '//www.smoex.com'
const SMOEX_LEARN_URL = '//www.smoex.com'

const mockLinks = [
  ['To Account', `${SMOEX_HOME_URL}/account`],
  ['To User', `${SMOEX_HOME_URL}/user`],
  ['To Member', `${SMOEX_HOME_URL}/member`],
  ['To Learn', `${SMOEX_LEARN_URL}`],
]

const ProfilePanel: React.FC = () => {
  const cx = useStyle()
  const [logout, logoutState] = commonSlice.useAction(accountAsyncAction.logout)
  const onLogout = () => {
    logout()
  }
  useToastError(logoutState.error)
  return (
    <div className={cx('profile-wrapper')}>
      <div className={cx('profile-panel')}>
        <div className={cx('profile-link-wrapper')}>
          {mockLinks.map(([name, link], i) => (
            <a
              className={cx('profile-link')}
              key={i}
              href={link}
              target="_blank"
            >
              {name}
            </a>
          ))}
        </div>
        <div className={cx('profile-logout')} onClick={onLogout}>
          Logout
        </div>
      </div>
    </div>
  )
}

const Profile: React.FC<any> = () => {
  const cx = useStyle()
  const [account] = commonSlice.useSelector(accountSelector.info)
  const [toggleModal] = useModal(LoginModal)
  return (
    <div className={cx('header-profile')}>
      {(!account && <div>loading</div>) ||
        (['visitor'].includes(account?.group) && (
          <div className={cx('header-login')} onClick={toggleModal}>
            Login
          </div>
        )) ||
        (['guest', 'member'].includes(account.group) && (
          <React.Fragment>
            <div className={cx('header-user')}>
              <div className={cx('header-avatar')}>avatar</div>
              <ProfilePanel />
            </div>
          </React.Fragment>
        ))}
    </div>
  )
}

export const Header: React.FC<any> = (props) => {
  const cx = useStyle()
  return (
    <header id="Header" className={cx('header')}>
      <div className={cx('header-wrapper')}>
        <NavLink
          exact
          to={'/'}
          className={cx('header-logo')}
          activeClassName={cx('header-logo--disable')}
        >
          SMOEX
        </NavLink>
        <Profile />
      </div>
    </header>
  )
}
export default Header
