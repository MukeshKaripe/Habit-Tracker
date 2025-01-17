import { useState } from 'react'
import './App.css';
import './index.css';
import { Provider } from 'react-redux'
import AddHabbit from './ecommerce/components/Addhabbit'
import store from './store/store'
import Slecteduse from './ecommerce/components/Selecteduse'
import { Box } from '@mui/material'
import Habbitstats from './ecommerce/components/Habbitstats'
import AppRoute from './Approute/Route'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../src/i18n/i18n';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      
      {/* <Box  sx={{maxWidth:"800px",margin:'auto'}}>
      <h1>Habits</h1>
      <AddHabbit />
      <Slecteduse />
      </Box>
      <Habbitstats></Habbitstats> */}
          <ToastContainer />
      <Router>
        <AppRoute />
      </Router>

    </Provider>
  )
}

export default App
