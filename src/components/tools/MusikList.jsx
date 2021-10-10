import React, {useContext, useState} from 'react'
import styles from '../app.module.css'
import styles2 from '../upload.module.css'
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
      <span className={styles2.uploadeMusikTitle}>UPLOAD MUSIC</span>

      <div className={styles2.uploadMusikTrigger}>Select a music</div>

      <form className={styles2.uploadMusikForm}>
        <div className={styles2.uploadMusikFormField}>
          <input type="text" placeholder="Title" />

          <input type="text" placeholder="Author" />
        </div>

        <button className={styles2.uploadMusikButton}>Save</button>
      </form>
    </section>
  )
}

export default MusikList
