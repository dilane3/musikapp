import React, {useState, useEffect} from 'react'
import "./index.css"
import styles from './app.module.css'
import MusikPlayer from './tools/MusikPlayer'
import MusikList from './tools/MusikList'
import MusikContext from './contexts/musikContext'
import Comparator from 'easy-comparator'

const compare = new Comparator()

const musik1 = require("../ressources/musics/game-sound-hard.mp3").default
const musik2 = require("../ressources/musics/game-sound.wav").default

const Navigation = ({active}) => {
  return (
    <section
      className={
        `
          ${styles.navigationContainer}
          ${active === "playerSection" ? "":styles.navigateToList}
        `
      }
    >
      <MusikPlayer />
      <MusikList />
    </section>
  )
}

const App = () => {
  const musiks = [
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
  ]
  const [currentMusik, setCurrentMusik] = useState({
    id: 1,
    src: musik1,
    title: "Game sound",
    author: "Dilane3"
  })
  const [sizeWidth, setSizeWidth] = useState(window.innerWidth)
  const [musikNav, setMusikNav] = useState("playerSection")

  useEffect(() => {
    const updateLength = (size) => {
      setSizeWidth(size)
    }

    window.onresize = () => {
      updateLength(window.innerWidth)
    }
  })

  const selectMusik = (id) => {
    const musik = musiks.find(mu => compare.equal(mu.id, id))

    console.log(musik)

    if (musik)
      setCurrentMusik(musik)
  }

  const handleNavigate = (navigateTo = "") => {

    if (!navigateTo) {
      if (musikNav === "playerSection")
        setMusikNav("listMusik")
      else
        setMusikNav("playerSection")
    } else
      setMusikNav(navigateTo)
  }

  const contextValue = {musiks, currentMusik, selectMusik, navigation: handleNavigate}

  return (
    <MusikContext.Provider value={contextValue}>
      <main className={styles.frame}>
        <header className={styles.header}>
          <span>MusikApp</span>
          {
            compare.lessThanOrEqual(sizeWidth, 575) && (
              <i className="bi bi-justify" onClick={handleNavigate}></i>
            )
          }
        </header>

        <section className={styles.main}>
          {
            compare.lessThanOrEqual(sizeWidth, 575) ? (
              <Navigation active={musikNav} />
            ):(
              <>
                <MusikPlayer />
                <MusikList />
              </>
            )
          }
        </section>
      </main>
    </MusikContext.Provider>
  )
}

export default App
