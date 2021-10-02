import React from 'react'
import styles from '../app.module.css'

const MusikList = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.musikHeader}>
        <span className="badge badge-success">6</span>
        <span>Musiques</span>
      </div>
      <div className={styles.musikList}>

      </div>
    </aside>
  )
}

export default MusikList
