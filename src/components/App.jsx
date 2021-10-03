import React, {useState} from 'react'
import "./index.css"
import styles from './app.module.css'
import MusikPlayer from './tools/MusikPlayer'
import MusikList from './tools/MusikList'
import MusikContext from './contexts/musikContext'

const musik1 = require("../ressources/musics/game-sound-hard.mp3").default

const App = () => {
  const [musiks, setMusik] = useState([
    {
      id: 1,
      src: musik1,
      title: "Game sound",
      author: "Dilane3",
      time: 400
    }
  ])
  const [currentMusik, setCurrentMusik] = useState({
    id: 1,
    src: musik1,
    title: "Game sound",
    author: "Dilane3",
    time: 400
  })

  const contextValue = {musiks, currentMusik}

  return (
    <MusikContext.Provider value={contextValue}>
      <main className={styles.frame}>
        <header className={styles.header}>MusikApp</header>

        <section className={styles.main}>
          <MusikPlayer />
          <MusikList />
        </section>
      </main>
    </MusikContext.Provider>
  )
}

export default App
