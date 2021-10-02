import React from 'react'
import "./index.css"
import styles from './app.module.css'
import MusikPlayer from './tools/MusikPlayer'
import MusikList from './tools/MusikList'

const App = () => {
  return (
    <main className={styles.frame}>
      <header className={styles.header}>MusikApp</header>

      <section className={styles.main}>
        <MusikPlayer />
        <MusikList />
      </section>
    </main>
  )
}

export default App
