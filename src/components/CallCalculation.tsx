import React, { useState, useEffect } from 'react'
import axios from '../axios'
import '../App.css'


interface CalculateCallInterface {
  duration: number
  callPlanUuid?: string
  originCode?: number
  destinationCode?: number
}

interface CallCalculation {
  price: number,
  minutes: number
}


const CallCalculation = () => {

  const [plans, setPlans] = useState([])
  const [ddds, setDdd] = useState([])

  const [selectedOrigin, setSelectedOrigin] = useState()
  const [selectedDestination, setSelectedDestination] = useState()
  const [selectedPlan, setSelectedPlan] = useState()
  const [minutes, setMinutes] = useState(1)

  const [callCalculation, setCallCalculation] = useState({} as CallCalculation)
  const [isLoading, setIsLoading]  = useState(false)

  const fetchAllCallPlans = async () => {
    const result: any = await axios.get('/call-plans')
    setPlans(result.data)
  }

  const fetchAllDDDs = async () => {
    const result = await axios.get('/ddd')
    setDdd(result.data)
  }

  const fetchCallCalculation = async (dto: CalculateCallInterface) => {
    const result: any = await axios.post('/call-records/calculate', dto)
    setCallCalculation(result.data)
    setIsLoading(false)
  }

  const submitForm = (event: any) => {
    event.preventDefault()
    setIsLoading(true)

    fetchCallCalculation({
      duration: minutes > 0 ? minutes : 1,
      callPlanUuid: selectedPlan,
      destinationCode: selectedDestination,
      originCode: selectedOrigin
    })
  }

  useEffect(() => {
    function onMount() {
      fetchAllCallPlans()
      fetchAllDDDs()
    }
    onMount()
  }, [])


  const handleSelectedOriginChange = (event: any) => {
    setSelectedOrigin(event.target.value)
  }

  const handleSelectedDestinationChange = (event: any) => {
    setSelectedDestination(event.target.value)
  }

  const handleSelectedPlanChange = (event: any) => {
    setSelectedPlan(event.target.value)
  }

  const handleMinutesChange = (event: any) => {
    setMinutes(event.target.value)
  }

  const SelecectOrigin = () =>
    <div className="row calculate-origin-selection">
      <label htmlFor="dddOrigin" className="label">
        DDD de Origem
      </label>
      <select className="select"
        onChange={handleSelectedOriginChange}
        value={selectedOrigin}>

        <option value="">Selecione a origem</option>
        {ddds && ddds.length && ddds.map((ddd: any, key: any) => (
          <option key={key} value={ddd.uuid}>
            {ddd.code}
          </option>
        ))}
      </select>
    </div>


  const SelectDestination = () =>
    <div className="row calculate-destination-selection">
      <label htmlFor="dddDestination" className="label">
        DDD de Destino
      </label>
      <select className="select"
        onChange={handleSelectedDestinationChange}
        value={selectedDestination}>
        <option value="">Selecione o destino</option>
        {ddds && ddds.length && ddds.map((ddd: any, key: any) => (
          <option key={key} value={ddd.uuid}>
            {ddd.code}
          </option>
        ))}
      </select>
    </div>


  const SelectPlan = () =>
    <div className="row calculate-plan-selection" >
      <label className="label" htmlFor="plan">
        Plano
      </label>

      <select className="select" id="plan"
        onChange={handleSelectedPlanChange}
        value={selectedPlan}>
        <option value="">Sem plano</option>
        {plans && plans.length && plans.map((plan: any, key: any) => (
          <option key={key} value={plan.uuid}>
            {plan.name}
          </option>
        ))}

      </select>
    </div>

  const SubmitButton = () =>
    <div className="row">
      <button className="btn">Consultar</button>
    </div>


  const ShowCalculationResult = () =>
    <>
      {isLoading && (<div className="row">Carregando...</div>)}

      {callCalculation && callCalculation.minutes > 0 && !isLoading && (
        <div className="row calculate-result">
          <h3>Custo da ligação</h3>
          <div className="row">
            <span className="calculate-result-sign">
              $
            </span>
            <span className="calculate-result-value">
              {callCalculation.price.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </>

  return (
    <section className="calculate">
      <h2>Calcular o custo de uma ligação</h2>
      <form onSubmit={submitForm} className="calculate-form">
        <SelecectOrigin />
        <SelectDestination />
        <SelectPlan />
        {/* <SetMinutes> */}
        <div className="row calculate-minutes-selection">
          <label htmlFor="minutes" className="label">
            Minutos
          </label>
          <input type="number" className="input" min={1} max={500}
            onChange={handleMinutesChange} value={minutes} />
        </div>
        {/* </SetMinutes> */}
        <SubmitButton />
      </form>
      <ShowCalculationResult />
    </section>
  )
}

export default CallCalculation
