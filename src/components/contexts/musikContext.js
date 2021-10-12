import React from 'react'

const MusikContext = React.createContext({
  musiks: [],
  currentMusik: {},
  selectMusik: (id) => {},
  navigation: (target) => {},
  addMusik: (musik) => {}
})

export default MusikContext
