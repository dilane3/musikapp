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
        <progress min={0} max={100} value={60}></progress>
      </div>
    </section>
  )
}

export default MusikPlayer
