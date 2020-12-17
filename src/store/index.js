import React, {useState, useEffect} from 'react'
import axios from 'axios'
const DataContext = React.createContext();


function DataContextProvider(props) {
    const [newArr, setNewArr] = useState([{id: '', name: '', password: '', amountPayd:'', monthlyInterest: '', amountTaken: '', installments: '', totalAmountInTaxes: '' }])
    


  useEffect(() => {
    axios({
        method: 'GET',
        url: 'https://www.mocky.io/v2/5c923b0932000029056bce39',
    })
    .then(res => {
      setNewArr({id: res.data.UserId, name: 'Jhonatan', password: '12345', amountPayd: res.data.amountPayd, monthlyInterest:  res.data.monthlyInterest, amountTaken:  res.data.amountTaken, installments:  res.data.installments, totalAmountInTaxes:  res.data.totalAmountInTaxes })
    })
    .catch((error) => {
        console.log(error)
      })
},[])




    return (
        <DataContext.Provider value={{newArr, setNewArr}}>
            {props.children}
        </DataContext.Provider>
    )
}


export {DataContextProvider, DataContext};