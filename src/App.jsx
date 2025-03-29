import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inputbox from './Components/Inputbox'
import axios from 'axios'
import { use } from 'react'

function App() {
  const YOUR_APIKEY=import.meta.env.VITE_API_KEY
  const LINK=import.meta.env.VITE_LINK
  const [currencyList,setList]=useState([]);
  const [data,setData]=useState(0)
  const [toAmount, setToAmount] = useState('0')
  const [toCur, setToCur] = useState()
  const [fromAmount, setFromAmount] = useState('0')
  const [fromCur, setFromCur] = useState('USD')

  useEffect(()=>{
    const getList = async()=>{
      const res=await axios.get(LINK)
      const list = Object.keys(res.data.currencySymbols)
      // console.log(res.data.currencySymbols)
      setList(list)
    }
    getList()
  },[]);

  
  // getData()
  useEffect(()=>{
    const getData=async(currency)=>{
      if(toCur&&fromCur){
        const res=await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${YOUR_APIKEY}&symbols=${toCur}&base=${fromCur}`)
        setData(res.data.rates[toCur])
        console.log(1)
      }
    }
    getData()
  },[toCur]);

  useEffect(()=>{
    if(toCur&&fromCur)setToAmount(Number(fromAmount)*Number(data))
  },[fromAmount])

  return (
    <>
      <div
        className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("https://www.econlib.org/wp-content/uploads/2018/02/foreign-exchange.jpg")`,
        }}
      >
        <div className="flex gap-4">
          <Inputbox 
          currencyOptions={['USD']}
          label={"From"}
          onAmountChange={setFromAmount}
          onCurrencyChange={setFromCur}
          selectCurrency={fromCur}
          amount={fromAmount}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Inputbox 
          currencyOptions={currencyList}
          label={"To"}
          onCurrencyChange={setToCur}
          selectCurrency={toCur}
          amount={toAmount}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <button onClick={getData}>but</button> */}
        </div>
      </div>
    </>
  )
}

export default App
