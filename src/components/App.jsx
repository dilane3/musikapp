import React, {useState} from 'react'
import "./index.css"
import styles from './app.module.css'
import MusikPlayer from './tools/MusikPlayer'
import MusikList from './tools/MusikList'
import MusikContext from './contexts/musikContext'
import Comparator from 'easy-comparator'

const compare = new Comparator()

const musik1 = require("../ressources/musics/game-sound-hard.mp3").default
const musik2 = require("../ressources/musics/game-sound.wav").default

const App = () => {
  const [musiks, setMusik] = useState([
    {
      id: 1,
      src: musik1,
      title: "Game sound",
      author: "Dilane3"
    },
    {
      id: 2,
      src: musik2,
      title: "Game sound 2",
      author: "Donald"
    }
  ])
  const [currentMusik, setCurrentMusik] = useState({
    id: 1,
    src: musik1,
    title: "Game sound",
    author: "Dilane3"
  })

  const selectMusik = (id) => {
    const musik = musiks.find(mu => compare.equal(mu.id, id))

    console.log(musik)

    if (musik)
      setCurrentMusik(musik)
  }

  const contextValue = {musiks, currentMusik, selectMusik}

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
