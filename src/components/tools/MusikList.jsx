import React, {useContext} from 'react'
import styles from '../app.module.css'
import Musik from './Musik'
import MusikContext from '../contexts/musikContext'

const MusikList = () => {
  const {musiks} = useContext(MusikContext)

  return (
    <aside className={styles.aside}>
      <div className={styles.musikHeader}>
        <span className="badge badge-success">6</span>
        <span>Musiques</span>
      </div>
      <div className={styles.musikList}>
        {
          musiks.map(musik => (
            <Musik
              musik={musik}
            />
          ))
        }

      </div>
    </aside>
  )
}

export default MusikList
