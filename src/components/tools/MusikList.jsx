import React, {useContext, useState, useRef, useEffect} from 'react'
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
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")

  const inputFileRef = useRef()

  const handleChangeFile = (value) => {
    setFile(value)
    setTitle(value.name.split(".")[0])
  }

  return (
    <section className={styles.uploadMusik}>
      <span className={styles2.uploadeMusikTitle}>UPLOAD MUSIC</span>

      <div className={styles2.uploadMusikTrigger} onClick={() => inputFileRef.current.click()}>Select a music</div>
      <span className={styles2.indicator}>
        {
          !compare.equal(file, null) && "music selected"
        }
      </span>
      <input 
        ref={inputFileRef} 
        type="file" 
        className="d-none"
        onChange={(e) => handleChangeFile(e.target.files[0])}
      />

      <form className={styles2.uploadMusikForm}>
        <div className={styles2.uploadMusikFormField}>
          <input value={title} type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

          <input value={author} type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <button className={styles2.uploadMusikButton}>Save</button>
      </form>
    </section>
  )
}

export default MusikList
