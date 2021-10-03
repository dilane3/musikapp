import React from 'react'
import styles from '../app.module.css'
import {Image} from 'react-image-progressive-loading'

const Musik = ({musik}) => {
  return (
    <article className={styles.musikItem}>
      <Image
        image={require("../../ressources/images/profil.jpg").default}
        className={styles.musikItemImage}
        blur={true}
      />

      <div className={styles.musikItemInfo}>
        <div>
          <span>{musik.author}</span>
          <span>{musik.title}</span>
        </div>
        <span>{musik.time}</span>
      </div>

      <div>
        <i className="bi bi-play-fill"></i>
      </div>
    </article>
  )
}

export default Musik
