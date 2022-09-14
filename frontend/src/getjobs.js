import { useReducer, useEffect } from "react"
import axios from 'axios'
const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}
const BASE_URL = 'https://app.sportdataapi.com/api/v1/soccer/players?apikey=06eddd10-33b6-11ed-963f-3da45e036ac9&country_id=48&max_age=19';

function reducer(state,action){
    switch(action.type){
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: []}
    case ACTIONS.GET_DATA:
      return {...state, loading: false, jobs: action.payload.jobs}
    case ACTIONS.ERROR:
        return {...state, loading: false, jobs: action.error, jobs: []}
    default : 
      return state
    }
}


export default function Getjobs(params,page){
    const [state, dispatch] = useReducer(reducer, {jobs: [], loading:true})

    useEffect(() => {
      dispatch({type : ACTIONS.MAKE_REQUEST })
      axios.get(BASE_URL,{
          params : {markdown: true,page: page , ...params}
      }).then(res => {
          dispatch({type: ACTIONS.GET_DATA, payload: {jobs: res.data}})
      }).catch(e => {
          dispatch({type: ACTIONS.ERROR, payload: {error: e}})
      })
    },[params, page])
     return state
}