import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Routes from './routers'
import {DataContextProvider} from './store'
function App() {

  return (
    <DataContextProvider>
        <Routes />
    </DataContextProvider>
  )
}

export default App;
