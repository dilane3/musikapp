import React, {useContext, useState, useRef} from 'react'
import styles from '../app.module.css'
import styles2 from '../upload.module.css'
import Musik from './Musik'
import MusikContext from '../contexts/musikContext'
import Comparator from 'easy-comparator'
import axios from 'axios'
import {ToastContext} from 'react-simple-toastify'

const compare = new Comparator()
const instance = axios.create({
  baseURL: "http://192.168.43.81:5000/api",
  timeout: 10000
})

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
          <span>Musics</span>
        </div>
        <div>
          <i 
            className={`bi bi-${compare.equal(navigation, "musik-list") ? "upload":"justify"}`}
            onClick={() => navigate()}
            title={compare.equal(navigation, "musik-list") ? "upload section":"music list"}
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

// this component lists all the music
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
  const [category, setCategory] = useState("urban")
  const [loading, setLoading] = useState(false)

  const {addMusik} = useContext(MusikContext)
  const {displayToast} = useContext(ToastContext)

  const inputFileRef = useRef()

  const handleChangeFile = (file) => {
    if (file) {
      setFile(file)
      setTitle(file.name.split(".")[0])
    }
  }

  const handleUploadFile = (event) => {
    event.preventDefault()

    if (
      file && 
      compare.greaterThan(title.length, 0) && 
      compare.greaterThan(author.length, 0) &&
      category
    ) {
      // display the loader
      setLoading(true)

      // construction of the form data
      const dataform = new FormData()

      dataform.append("audio", file)
      dataform.append("title", title)
      dataform.append("author", author)
      dataform.append("category", category)

      instance.post("/musik/upload", dataform)
      .then(res => {
        if (res.data)
          addMusik(res.data.data)

        displayToast("Music uploaded successfully")
      })
      .catch(err => {
        console.log(err)

        displayToast("Something went wrong")
      })
      .then(() => {
        // mask the loader
        setLoading(false)

        setTitle("")
        setAuthor("")
        setCategory("urban")
        setFile(null)
      })
    }
  }

  return (
    <section className={styles.uploadMusik}>
      <span className={styles2.uploadeMusikTitle}>UPLOAD MUSIC</span>

      <div 
        className={`${styles2.uploadMusikTrigger} ${!compare.equal(file, null) && styles2.uploadMusikTriggerOk}`} 
        onClick={() => inputFileRef.current.click()}
      >
        Select a music
      </div>
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
        accept="audio/*"
      />

      <form className={styles2.uploadMusikForm}>
        <div className={styles2.uploadMusikFormField}>
          <input value={title} type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

          <input value={author} type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="urbain">Urban</option>
            <option value="rap">Rap</option>
            <option value="religious">Religious</option>
            <option value="traditionnelle">Tradition</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button className={styles2.uploadMusikButton} onClick={handleUploadFile}>Save</button>
      </form>

      {
        loading && <div className={styles2.uploadMusikLoader}></div>
      }
    </section>
  )
}

export default MusikList
