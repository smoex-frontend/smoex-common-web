import * as React from 'react'
import '../index.scss' // TODO: 全局 scss 的引入暂时放在 Header
import { NavLink } from 'react-router-dom'
import styles from './styles/App.module.scss'
import { useThemeStyles, useToggleModal, useModal } from 'react-dom-basic-kit'
import { commonSlice, accountSelector } from 'smoex-common-business'
import { toSwitch } from 'js-basic-kit'
import { MenuModal } from '../partials/MenuModal'
import { LoginModal } from '../partials/LoginModal'
const useStyle = () => useThemeStyles(styles)

const Profile: React.FC<any> = () => {
  const cx = useStyle()
  const [account] = commonSlice.useSelector(accountSelector.info)
  const [toggleModal] = useModal(LoginModal)
  return (
    <div className={cx('header-profile')}>
      {toSwitch(
        !account && <div>loading</div>,
        ['visitor'].includes(account?.group) && (
          <div className={cx('header-login')} onClick={toggleModal}>
            Login
          </div>
        ),
        ['guest', 'member'].includes(account?.group) && (
          <div className={cx('header-user')}>avatar</div>
        ),
      )}
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
