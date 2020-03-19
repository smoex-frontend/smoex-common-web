import * as React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { useAsyncCallback } from 'redux-async-kit'
import { accountAsyncAction, commonSlice } from 'smoex-common-business'
import { Footer } from './Footer'
import { PageError } from './PageError'
import { PageLoading } from './PageLoading'
import { useToastError } from 'react-dom-basic-kit'
import { initInnerHeight } from 'browser-basic-kit'
import { IPageContext, useInitPageContext } from './PageRouterContext'

const PageContext = React.createContext({} as IPageContext)
export function usePageContext() {
  return React.useContext(PageContext)
}

function usePageInit() {
  const [getInfo, infoState] = commonSlice.useAction(accountAsyncAction.getInfo)

  const onGetInfo = useAsyncCallback(async () => {
    await getInfo()
  })

  React.useEffect(() => {
    // 初始化 root 高度，处理 Safari 高度计算问题
    const rootNode = document.getElementById('root')
    if (!rootNode?.style.minHeight) {
      initInnerHeight(rootNode)
    }

    // 初始化请求
    onGetInfo()
  }, [])

  useToastError(infoState.error)
}

export const PageRouter: React.FC<any> = (props) => {
  const { children } = props
  const formContext = useInitPageContext()
  const { showHeader, showFooter, reset } = formContext
  const { pathname } = useLocation()

  React.useEffect(() => {
    reset()
  }, [pathname])

  usePageInit()

  return (
    <PageContext.Provider value={formContext}>
      {showHeader && <Header />}
      <React.Suspense fallback={<PageLoading />}>
        <Switch>
          {false ? <PageError code={500} /> : children}
          <Route render={() => <PageError code={404} />} />
        </Switch>
        {showFooter && <Footer />}
      </React.Suspense>
    </PageContext.Provider>
  )
}
export default PageRouter
