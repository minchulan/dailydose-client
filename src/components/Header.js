import React from 'react'

const Header = ({slogan, storeName}) => {
  return (
      <div>
          <h1>{storeName}</h1>
          <h2>{slogan}</h2>
    </div>
  )
}

export default Header