import React from 'react'

const MusikContext = React.createContext({
  musiks: [],
  currentMusik: {},
  selectMusik: (id) => {}
})

export default MusikContext
