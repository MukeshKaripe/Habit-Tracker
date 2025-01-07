import { useState } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import AddHabbit from './ecommerce/components/Addhabbit'
import store from './store/store'
import Slecteduse from './ecommerce/components/Selecteduse'
import { Box } from '@mui/material'
import Habbitstats from './ecommerce/components/Habbitstats'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <Box  sx={{maxWidth:"800px",margin:'auto'}}>
      <h1>Habits</h1>
      <AddHabbit />
      <Slecteduse />
      </Box>
      <Habbitstats></Habbitstats>
    </Provider>
  )
}

export default App
