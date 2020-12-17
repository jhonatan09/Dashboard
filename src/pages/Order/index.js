import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import './styles.scss'

function Order() {
    const [datas, setDatas] = useState({name: '', valor: ''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatas({...datas, [name]:value});
    }


    const send = (e) => {
        e.preventDefault();
        
        const order = datas;
        localStorage.setItem('@Provi:Order', JSON.stringify(order));
        
    }

    return (
        <div className="order">
            <h1>Fazer Pedido de Crédito</h1>
             <form onSubmit={send} className="form">
                <div className="input-data">
                    <label>Seu nome:</label>
                    <input value={datas.name} name="name" onChange={handleChange} required/>
                </div>
                <div className="input-data">
                    <label>Valor:</label>
                    <input value={datas.valor} name="valor" onChange={handleChange} required/>
                </div>
                <button>Enviar</button>
             </form>
        </div>
    )
}

export default Order;
