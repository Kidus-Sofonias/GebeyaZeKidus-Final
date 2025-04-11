import React from 'react'
import Header from "/src/Components/Header/Header.jsx";

function Layout({children}) {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default Layout