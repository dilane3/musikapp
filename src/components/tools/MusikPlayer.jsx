import React from 'react'
import styles from '../app.module.css'
import {Image} from 'react-image-progressive-loading'

const MusikPlayer = () => {
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
            <span>Trop beau</span>
            <span>Dilane3</span>
          </div>
        </article>
      </div>
      <div className={styles.musikController}>
        <audio
          src={require("../../ressources/musics/game-sound-hard.mp3").default}
          controls
        ></audio>
      </div>
    </section>
  )
}

export default MusikPlayer
