import React from 'react'
import Router from './Router'
import "./assets/reset.css"
import './assets/main.css'
import {Header} from './components/Header/index'
import {Footer} from './components/Footer/index'

const App = () => {
  return (
    <>
      <Header />
      <main className={"c-main"}>
        <Router />
      </main>
      <Footer />
    </>
  )
}

export default App