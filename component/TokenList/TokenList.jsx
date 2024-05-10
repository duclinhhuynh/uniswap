import React from 'react'

const TokenList = ({tokenData, setOpenTokenBox}) => {
  const data = [1, 2, 3, 4, 5];
  return (
    <div>
        <h2>TokenList</h2>
        {tokenData.map((el, i) => (
            <div>{el}</div>
        ))}
    </div>
  )
}

export default TokenList