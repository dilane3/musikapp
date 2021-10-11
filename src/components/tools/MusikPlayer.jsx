import React, {useContext, useEffect, useRef, useState} from 'react'
import styles from '../app.module.css'
import {Image} from 'react-image-progressive-loading'
import MusikContext from '../contexts/musikContext'

const MusikPlayer = () => {
  const {currentMusik} = useContext(MusikContext)
  const [load, setLoad] = useState(false)
  const audioRef = useRef()

  useEffect(() => setLoad(true), [])

  useEffect(() => {
    if (load)
      audioRef.current.play()
  }, [currentMusik, load])

  return (
    <section className={styles.playerSection}>
      <div className={styles.musikInfo}>
        <article className={styles.musik}>
          <Image
            image={currentMusik.image}
            className={styles.musikProfil}
            blur={true}
          />

          <div className={styles.musikText}>
            <span>{currentMusik.title}</span>
            <span>{currentMusik.author}</span>
          </div>

          <a 
            href={currentMusik.src} 
            download={currentMusik.downloadName}
            className={`${styles.musikDownloadIcon}`}
          >
            <i className={`bi bi-download`} title="download"></i>
          </a>
        </article>
      </div>
      <div className={styles.musikController}>
        <audio
        ref={audioRef}
          src={currentMusik.src}
          controls
        ></audio>
      </div>
    </section>
  )
}

export default MusikPlayer
