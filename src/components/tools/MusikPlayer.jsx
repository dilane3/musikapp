import React, {useContext, useEffect, useRef, useState} from 'react'
import styles from '../app.module.css'
import {Image} from 'react-image-progressive-loading'
import MusikContext from '../contexts/musikContext'
import axios from 'axios'

const MusikPlayer = () => {
  const {currentMusik} = useContext(MusikContext)
  const [load, setLoad] = useState(false)
  const audioRef = useRef()

  useEffect(() => setLoad(true), [])

  useEffect(() => {
    if (load)
      audioRef.current.play()
  }, [currentMusik, load])

  function download(e, musik) {
    e.preventDefault()

    axios({
      url: musik.src.replace("http", "https"),
      method: 'GET',
      responseType: 'blob'
    })
    .then((response) => {
      const url = window.URL
        .createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', musik.downloadName.toLowerCase());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(response.data)
      console.log(url)
    })
  }


  return (
    <section className={styles.playerSection}>
      <div className={styles.musikInfo}>
        <article className={styles.musik}>
          <Image
            image={currentMusik.image}
            className={styles.musikProfil}
            blur={true}
          />

          <div className={styles.musikText}>
            <span>{currentMusik.title.replaceAll('_', " ")}</span>
            <span>{currentMusik.author}</span>
          </div>

          <span
            className={`${styles.musikDownloadIcon}`}
            onClick={(e) => download(e, currentMusik)}
          >
            <i className={`bi bi-download`} title="download"></i>
          </span>
        </article>
      </div>
      <div className={styles.musikController}>
        <audio
        ref={audioRef}
          src={currentMusik.src}
          controls
        ></audio>
      </div>
    </section>
  )
}

export default MusikPlayer
