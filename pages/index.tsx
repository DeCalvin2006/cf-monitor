import React, { useEffect, useState } from "react"
import Head from 'next/head'
export default function Home () {

  return (

    <div className='container-fluid'>
      <Head>
        <title>
          Codeforces Monitor
        </title>
      </Head>
      <p>在URL后附加要监视的人喵</p>
      <p>切换用户的时候可能会卡成上一个人，这时候刷新就好喵</p>
    </div >
  )
}