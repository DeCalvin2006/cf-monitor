import React, { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { Container, Nav, Navbar } from "react-bootstrap"
import NavHead from "../components/NavHead"
export default function Home () {

  return (
    <Container>
      <h2>
        这里是使用说明的喵
      </h2>
      <hr />
      <p>
        在URL后附加要监视的喵
      </p>
      <p>
        切换用户的时候可能会卡成上一个人，这时候刷新喵就好
      </p>
    </Container>
  )
}