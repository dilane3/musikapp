import React, {useState, useEffect} from 'react'
import "./index.css"
import styles from './app.module.css'
import MusikPlayer from './tools/MusikPlayer'
import MusikList from './tools/MusikList'
import MusikContext from './contexts/musikContext'
import Comparator from 'easy-comparator'

const compare = new Comparator()

// import musik
const musik1 = require("../ressources/musics/game-sound-hard.mp3").default
const musik2 = require("../ressources/musics/maitre_gims_brise.mp3").default
const musik3 = require("../ressources/musics/maitre_gims_est-ce_que_tu_m_aimes.mp3").default
const musik4 = require("../ressources/musics/mhd_feat._tiakola_pololo.mp3").default
const musik5 = require("../ressources/musics/fally_ipupa_amore.mp3").default
const musik6 = require("../ressources/musics/black_m_le_plus_fort_du_monde.mp3").default

// import images
const image1 = require("../ressources/images/profil.jpg").default
const image2 = require("../ressources/images/gims.jpg").default
const image3 = require("../ressources/images/gims.jpg").default
const image4 = require("../ressources/images/mhd.jpg").default
const image5 = require("../ressources/images/fally.jpg").default
const image6 = require("../ressources/images/black-m.jpg").default

const musiks = [
    {
      id: 1,
      src: musik1,
      title: "Game sound",
      author: "Dilane3",
      image: image1
    },
    {
      id: 2,
      src: musik2,
      title: "Brise",
      author: "Maitre Gims",
      image: image2
    },
    {
      id: 3,
      src: musik3,
      title: "Est-ce que tu m'aimes",
      author: "Maitre Gims",
      image: image3
    },
    {
      id: 4,
      src: musik4,
      title: "Pololo",
      author: "Mhd feat Tiakola",
      image: image4
    },
    {
      id: 5,
      src: musik5,
      title: "amore",
      author: "Fally Ipupa",
      image: image5
    },
    {
      id: 6,
      src: musik6,
      title: "Le plus fort du monde",
      author: "Black M",
      image: image6
    }
  ]

const Navigation = ({active}) => {
  return (
    <section
      className={`
        ${styles.navigationContainer}
        ${active === "playerSection" ? "":styles.navigateToList}
      `}
    >
      <MusikPlayer />
      <MusikList />
    </section>
  )
}

const App = () => {
  const [currentMusik, setCurrentMusik] = useState(musiks[0])
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

    if (navigateTo) {
      setMusikNav(navigateTo)

      return;
    }

    if (musikNav === "playerSection")
      setMusikNav("listMusik")
    else
      setMusikNav("playerSection")
  }

  const contextValue = {musiks, currentMusik, selectMusik, navigation: handleNavigate}

  return (
    <MusikContext.Provider value={contextValue}>
      <main className={styles.frame}>
        <header className={styles.header}>
          <span>MusikApp</span>
          {
            compare.lessThanOrEqual(sizeWidth, 575) && (
              <i className="bi bi-justify" onClick={() => handleNavigate()}></i>
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
