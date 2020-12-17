import React, {useContext, useState, useEffect} from 'react';
import './styles.scss';
import {DataContext} from '../../store'

function Home() {
    const {newArr} = useContext(DataContext)
    return (
        <div className="home">
            <div className="quakers-info quakers-info_geral">
                <h2>
                    Informações Gerais
                </h2>
                <ul className="info-list">
                    <li className="info-data">
                        <label>
                            Nome do beneficiário:
                        </label>
                        {newArr.name}
                    </li>
                    <li className="info-data">
                        <label>
                            Valor a ser pago:
                        </label>
                        {newArr.amountPayd}
                    </li>
                    <li className="info-data">
                        <label>
                        Numero de parcelas restantes:
                        </label>
                        {!!newArr.installments? newArr.installments.length: ''}
                    </li>
                    <li className="info-data">
                        <label>
                            Valor do emprestimo:
                        </label>
                        R$ {newArr.amountTaken}
                    </li>
                </ul>
            </div>
        </div>
    )
}


export default Home;
