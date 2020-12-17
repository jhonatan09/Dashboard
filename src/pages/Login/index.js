import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import {DataContext} from '../../store'
import './styles.scss'

function Login() {
    const history = useHistory();
    const {newArr} = useContext(DataContext)
    const [datas, setDatas] = useState({name: '', password: ''});
    const [warning, setWarning] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatas({...datas, [name]:value});
    }

    console.log(datas, newArr.name, newArr.password)

    const verificar = (e) => {
        e.preventDefault();
        if(datas.name === newArr.name && datas.password === newArr.password){
            const user = newArr;
            localStorage.setItem('@Provi:user', JSON.stringify(user));
            history.push('/Dashboard/home'); 
        }else{
            setWarning(true)
           setTimeout(()=> {
               setWarning(false)
           },5000)
        }
    }

    return (
        <div className="login-page">
             <form onSubmit={verificar} className="form">
                <div className="input-data">
                    <label>Login:</label>
                    <input value={datas.name} name="name" onChange={handleChange} required/>
                </div>
                <div className="input-data">
                    <label>Senha:</label>
                    <input value={datas.password} name="password" onChange={handleChange} required/>
                </div>
                {warning && 
                    <div className="Popup-Error">
                        <span>Login ou Senha incorretos!</span>
                    </div>
                }
                <button>Entrar</button>
             </form>
        </div>
    )
}

export default Login
