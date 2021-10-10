import React, {useContext, useState} from 'react'
import styles from '../app.module.css'
import Musik from './Musik'
import MusikContext from '../contexts/musikContext'
import Comparator from 'easy-comparator'

const compare = new Comparator()

const MusikList = () => {
  const {musiks} = useContext(MusikContext)
  const [navigation, setNavigation] = useState("musik-list")

  const navigate = () => {
    if (compare.equal(navigation, "musik-list"))
      setNavigation("upload-musik")
    else
      setNavigation("musik-list")
  }

  return (
    <aside className={styles.aside}>
      <div className={styles.musikHeader}>
        <div>
          <span className="badge badge-success">{musiks.length}</span>
          <span>Musiques</span>
        </div>
        
        <div>
          <i 
            className={`bi bi-${compare.equal(navigation, "musik-list") ? "upload":"justify"}`}
            onClick={() => navigate()}
          >
          </i>
        </div>
      </div>
      
      <div className={styles.musikList}>
        {
          compare.equal(navigation, "musik-list") ? (
            <List musiks={musiks} />
          ):(
            <UploadMusik />
          )
        }
      </div>
    </aside>
  )
}

const List = ({musiks}) => {
  return (
    <>
      {
        musiks.map(musik => (
          <React.Fragment key={musik.id}>
            <Musik
              musik={musik}
            />
          </React.Fragment>
        ))
      }

    </>
  )
}

const UploadMusik = () => {
  return (
    <section className={styles.uploadMusik}>
      {"hello"}
    </section>
  )
}

export default MusikList
