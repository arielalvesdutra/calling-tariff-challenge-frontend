import React, { useState, useEffect } from 'react'
import axios from '../axios'
import '../App.css'

interface CallTariffMapInterface {
  pricePerMinute: number
  originDDD: number
  destinationDDD: number
}

const CallTariffMaps = () => {
  const [tariffMaps, setTariffMaps] = useState([] as CallTariffMapInterface[])
 
  const fetchAllCallTariffMaps = async () => {
    const result = await axios.get('/call-tariff-maps')
    setTariffMaps(result.data)
  }

  useEffect(() => {
    function onMount() {
      fetchAllCallTariffMaps()
    }
    onMount()
  }, [])

  return (
    <section className="callTariffMaps">
      <h2>Mapa de tarifas</h2>
      <ul className="callTariffMaps-list">
        {tariffMaps && tariffMaps.length > 0 && tariffMaps.map((tariff: CallTariffMapInterface, key:any) => (
          <li key={key} className="callTariffMaps-item">
            <strong>Origem</strong>: {tariff.originDDD} - 
            <strong className="mt-left-5">Destino</strong>: {tariff.destinationDDD} -
            <strong className="mt-left-5">Valor</strong>: $ {tariff.pricePerMinute.toFixed(2)}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CallTariffMaps
