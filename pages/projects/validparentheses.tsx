import Head from 'next/head'
import React from 'react'
import Container from '../../components/valid-parens/Container'
import Header from '../../components/valid-parens/Header'

const ValidParenthesis = () => {
  return (
    <div className='bg-gradient-to-t from-gray-800 to-gray-700 h-screen'>
      <Head>
        <title>Valid Parentheses</title>
        <link rel="shortcut icon" href="/algo-logo.png" />
      </Head>
      <Header />
      <Container />
    </div>
  )
}

export default ValidParenthesis