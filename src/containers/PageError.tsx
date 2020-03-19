import * as React from 'react'
import { usePageProps } from './PageRouterContext'

export const PageError: React.FC<any> = (props) => {
  usePageProps({ visible: false })
  return (
    <section>
      <h1>{props.code}</h1>
    </section>
  )
}
export default PageError
