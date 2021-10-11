import React, {useContext} from 'react'
import styles from '../app.module.css'
import {Image} from 'react-image-progressive-loading'
import MusikContext from '../contexts/musikContext'

const Musik = ({musik}) => {
  const {selectMusik, navigation} = useContext(MusikContext)

  const handleClick = () => {
    selectMusik(musik.id)
    navigation("playerSection")
  }

  return (
    <article className={styles.musikItem}>
      <Image
        image={musik.image}
        className={styles.musikItemImage}
        blur={true}
      />

      <div className={styles.musikItemInfo}>
        <span>{musik.author}</span>
        <span>{musik.title}</span>
      </div>

      <div onClick={handleClick}>
        <i className="bi bi-play-fill" title="play"></i>
      </div>
    </article>
  )
}

export default Musik
