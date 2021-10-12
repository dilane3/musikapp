import React, {useState, useEffect, useMemo, useRef} from 'react'
import "./index.css"
import styles from './app.module.css'
import MusikPlayer from './tools/MusikPlayer'
import MusikList from './tools/MusikList'
import MusikContext from './contexts/musikContext'
import Comparator from 'easy-comparator'
import axios from 'axios'
import {ToastContext, useToastState, ToastContainer} from 'react-simple-toastify'

const compare = new Comparator()
const instance = axios.create({
  baseURL: "http://192.168.43.81:5000/api",
  timeout: 10000
})

// import musik
const musik1 = require("../ressources/musics/game-sound-hard.mp3").default
const musik2 = require("../ressources/musics/maitre_gims_brise.mp3").default
const musik3 = require("../ressources/musics/maitre_gims_est-ce_que_tu_m_aimes.mp3").default
const musik4 = require("../ressources/musics/mhd_feat._tiakola_pololo.mp3").default
const musik5 = require("../ressources/musics/fally_ipupa_amore.mp3").default
const musik6 = require("../ressources/musics/black_m_le_plus_fort_du_monde.mp3").default

// import images
const image1 = require("../ressources/images/default.png").default
const image2 = require("../ressources/images/gims.jpg").default
const image3 = require("../ressources/images/gims.jpg").default
const image4 = require("../ressources/images/mhd.jpg").default
const image5 = require("../ressources/images/fally.jpg").default
const image6 = require("../ressources/images/black-m.jpg").default

const MUSIKS = [
    {
      id: 1,
      src: musik1,
      title: "Game sound",
      author: "Dilane3",
      image: image1,
      downloadName: "Dilane3-Game_sound.mp3",
      category: "urbain"
    },
    {
      id: 2,
      src: musik2,
      title: "Brise",
      author: "Maitre Gims",
      image: image2,
      downloadName: "Maitre_Gims-Brise.mp3",
      category: "urbain"
    },
    {
      id: 3,
      src: musik3,
      title: "Est-ce que tu m'aimes",
      author: "Maitre Gims",
      image: image3,
      downloadName: "Maitre_Gims-Est_ce_que_tu_m'aimes.mp3",
      category: "urbain"
    },
    {
      id: 4,
      src: musik4,
      title: "Pololo",
      author: "Mhd feat Tiakola",
      image: image4,
      downloadName: "Mhd_feat_Tiakola-Pololo.mp3",
      category: "urbain"
    },
    {
      id: 5,
      src: musik5,
      title: "amore",
      author: "Fally Ipupa",
      image: image5,
      downloadName: "Fally_Ipupa-Amore.mp3",
      category: "urbain"
    },
    {
      id: 6,
      src: musik6,
      title: "Le plus fort du monde",
      author: "Black M",
      image: image6,
      downloadName: "Black_M-Le_plus_fort_du_monde.mp3",
      category: "urbain"
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
  const [musiks, setMusiks] = useState(MUSIKS)
  const [currentMusik, setCurrentMusik] = useState(MUSIKS[0])
  const [sizeWidth, setSizeWidth] = useState(window.innerWidth)
  const [musikNav, setMusikNav] = useState("playerSection")

  const [
    toastState, // this contain data of current toast
    displayToast, // this function allow you to display toast
    maskToast // this function is use to mask toast
  ] = useToastState()

  const musicsMemo = useMemo(() => ({musiks, displayToast}), [musiks, displayToast])
  let musicsRef = useRef(musicsMemo)

  useEffect(() => {
    musicsRef.current = musicsMemo
  }, [musicsMemo])

  useEffect(() => {
    const {
      musiks,
      displayToast
    } = musicsRef.current

    instance.get("/musik/all")
    .then(res => {
      if (res.data) {
        const musikData = [...musiks]
  
        res.data.data.forEach(musik => {
          musikData.push({
            id: musik._id,
            src: musik.filename,
            title: musik.title,
            author: musik.author,
            image: image1,
            downloadName: musik.downloadName,
            category: musik.category
          })
        })

        setMusiks(musikData)
        displayToast("Musics sucessful loaded")
      }
    })
    .catch(err => {
      console.log(err.response)

      displayToast("Something went wrong while loading musics")
    })
  }, [])

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

  const addMusik = (musik) => {
    const newMusiks = [...musiks]

    const newMusik = {
      id: musik._id,
      src: musik.filename,
      title: musik.title,
      author: musik.author,
      image: image1,
      downloadName: musik.downloadName,
      category: musik.category
    }

    newMusiks.push(newMusik)
    setMusiks(newMusiks)
  }

  const contextValue = {musiks, currentMusik, selectMusik, navigation: handleNavigate, addMusik}
  const contextValueToast = {...toastState, displayToast, maskToast}

  const toastOptions = {
    position: "bottom",
    timeout: 1000
  }

  return (
    <ToastContext.Provider value={contextValueToast}>
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

        <ToastContainer options={toastOptions} />
      </MusikContext.Provider>
    </ToastContext.Provider>
  )
}

export default App
