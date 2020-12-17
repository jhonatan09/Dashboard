import React, {useContext, useState, useEffect} from 'react';
import './styles.scss';
import {DataContext} from '../../store';


function Payment() {
    const {newArr} = useContext(DataContext)
    const [installments, setInstallments] = useState(newArr.installments)
    console.log(installments)
    return (
        <div className="payment-page">
            <h1>Minhas Faturas</h1>
                {!installments
                    ? ''
                    :
                    <ul>
                    {installments.map((items, index) => {
                        return (
                            <div key={index} className="info-list">
                                <li className="info-data info-data_red">
                                    <label>
                                        Valor:
                                    </label>
                                    {items.formatedValue}
                                </li>
                                <li className="info-data info-data_red">
                                    <label>
                                        Foi paga:
                                    </label>
                                    {items.payd? 'Sim': 'Não'}
                                </li>
                                <li className="info-data info-data_red">
                                    <label>
                                        Data de vencimento:
                                    </label>
                                    {items.dueDate}
                                </li>
                            </div>
                        )
                    })}
                </ul>
                }
        </div>
    )
}


export default Payment;
