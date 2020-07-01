import React from 'react'
import './App.css'
import CallCalculation from './components/CallCalculation'
import CallTariffMaps from './components/CallTariffMaps'


function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        Sistema
      </header>
      <main>
        <h1>Cálculo de custo de ligação e mapa de tarifas</h1>
        <hr/>
        <div className="calculate-and-callTariffMaps">
          <CallCalculation />
          <CallTariffMaps />
        </div>
      </main>
    </div>
  )
}

export default App
