import React from 'react'
import styles from '../app.module.css'

const MusikPlayer = () => {
  return (
    <section className={styles.playerSection}>
      <div className={styles.musikInfo}>
        <article className={styles.musik}>


        </article>
      </div>
      <div className={styles.musikController}>
        <input type="range" />
      </div>
    </section>
  )
}

export default MusikPlayer
