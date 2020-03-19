import * as React from 'react'
import '../index.scss' // TODO: 全局 scss 的引入暂时放在 Header
import { NavLink } from 'react-router-dom'
import styles from './styles/App.module.scss'
import { useThemeStyles } from 'react-dom-basic-kit'
import { commonSlice } from 'smoex-common-business'
const useStyle = () => useThemeStyles(styles)

const Profile: React.FC<any> = () => {
  const cx = useStyle()
  // const [account] = commonSlice.useSelector(state.)
  return <div className={cx('header-profile')}>{}</div>
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
