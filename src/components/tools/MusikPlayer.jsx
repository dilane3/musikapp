import React, {useContext} from 'react'
import styles from '../app.module.css'
import {Image} from 'react-image-progressive-loading'
import MusikContext from '../contexts/musikContext'

const MusikPlayer = () => {
  const {currentMusik} = useContext(MusikContext)

  return (
    <section className={styles.playerSection}>
      <div className={styles.musikInfo}>
        <article className={styles.musik}>
          <Image
            image={require("../../ressources/images/profil.jpg").default}
            className={styles.musikProfil}
            blur={true}
          />

          <div className={styles.musikText}>
            <span>{currentMusik.title}</span>
            <span>{currentMusik.author}</span>
          </div>
        </article>
      </div>
      <div className={styles.musikController}>
        <audio
          src={currentMusik.src}
          controls
        ></audio>
      </div>
    </section>
  )
}

export default MusikPlayer
