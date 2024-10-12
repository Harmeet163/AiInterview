import React from 'react'
import Header from './_component/Header'

const layout = ({children}) => {
  return (
    <div>
      <Header/>
      {children}</div>
  )
}

export default layout