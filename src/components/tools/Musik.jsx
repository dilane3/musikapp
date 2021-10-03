import React, {useContext} from 'react'
import styles from '../app.module.css'
import {Image} from 'react-image-progressive-loading'
import MusikContext from '../contexts/musikContext'

const Musik = ({musik}) => {
  const {selectMusik} = useContext(MusikContext)

  return (
    <article className={styles.musikItem}>
      <Image
        image={require("../../ressources/images/profil.jpg").default}
        className={styles.musikItemImage}
        blur={true}
      />

      <div className={styles.musikItemInfo}>
        <span>{musik.author}</span>
        <span>{musik.title}</span>
      </div>

      <div onClick={() => selectMusik(musik.id)}>
        <i className="bi bi-play-fill"></i>
      </div>
    </article>
  )
}

export default Musik
