import * as React from 'react'
import styles from './styles/MenuModal.module.scss'
import { DrawerModal } from '../components/DrawerModal'
import { usePopupShown } from 'react-dom-basic-kit'
import { transformStyles } from 'react-dom-basic-kit'
import { LoginModal } from './LoginModal'

import { useToggleModal, asModalProps } from 'react-dom-basic-kit'
import { useModal } from 'react-dom-basic-kit'
import { commonSlice, accountAsyncAction } from 'smoex-common-business'
import { Link, NavLink } from 'react-router-dom'

const cx = transformStyles(styles)

const AccountIntro = (props: any) => {
  const { showLogin, onCloseModal } = props
  const [account = {}] = commonSlice.useSelector(
    (state: any) => state.account.payload,
  )
  const [logout] = commonSlice.useAction(accountAsyncAction.logout)
  const onAvatarClick = React.useCallback(() => {
    if (account.group === 'visitor') {
      showLogin()
    }
  }, [account.group])
  const onLogout = () => {
    logout()
    onCloseModal()
  }
  return (
    <div className={cx('account-intro')}>
      <div className={cx('intro-avatar')} onClick={onAvatarClick}>
        Avatar
      </div>
      {account.group === 'visitor' && (
        <div className={cx('intro-login')} onClick={showLogin}>
          TO LOGIN
        </div>
      )}
      {account.group === 'guest' && (
        <div className={cx('intro-complate')}>TO COMPLATED</div>
      )}
      {account.group === 'member' && (
        <div className={cx('intro-nickname')}>
          {account.nickname || account.username}
        </div>
      )}
      {(account.group === 'guest' || account.group === 'member') && (
        <div className={cx('intro-logout')} onClick={onLogout}>
          LOGOUT
        </div>
      )}
      {!account.group && <div>SERVER ERROR</div>}
      {!account.group && <div onClick={showLogin}>TEST FOR LOGIN</div>}
    </div>
  )
}

export const MenuModal: React.FC<any> = (props) => {
  const { onClose } = props
  const shown = usePopupShown(props.isOpen)
  const [showLogin] = useModal(LoginModal)
  return (
    <DrawerModal {...asModalProps(props)}>
      <div className={cx('menu-modal', { shown })}>
        <AccountIntro showLogin={showLogin} onCloseModal={onClose} />
      </div>
    </DrawerModal>
  )
}
