import React, {useContext, useState} from 'react';
import {DataContext} from '../../store';
import {Link, useHistory} from 'react-router-dom';
import './styles.scss';
import { FaUserAlt } from "react-icons/fa";

function Header() {
    const history = useHistory();
    const {newArr} = useContext(DataContext)
    const [change, setChange] = useState(false)
    const [changeMob, setChangeMob] = useState(false)

    const handleClickLogout = () => {
        localStorage.removeItem('@Provi:user');
        history.push('/'); 
    }

    const handleClickShowLogout = () => {
        setChange(current => !current)
    }

    const handleClickMenuMob = () => {
        setChangeMob(current => !current)
    }

    return (
        <div className="nav-bar">
            <div className="logo">
                <Link to="/home" className="links-home">
                    GruntPix
                </Link>
            </div>
            <div className="content">
                <div className={`menu-mob ${changeMob? 'active': ''}`} onClick={() => handleClickMenuMob()}>
                    <span className="line line-1"></span>
                    <span className="line line-2"></span>
                    <span className="line line-3"></span>
                </div>
                <div className={`links links_mob ${changeMob? 'active': ''}`}>
                    <Link to="/pay" className="links_text">
                        Minhas faturas
                    </Link>
                    <Link to="/order" className="links_text">
                        Fazer pedido
                    </Link>
                    <div className="user">
                        <div className="user-icon" onClick={() => handleClickShowLogout()}>
                            <FaUserAlt />
                        </div>
                        <span className="user_name">
                            {newArr.name}
                        </span>
                        <span className={`user_logout ${!change? "hidden": "show"}`}>
                            <span className="exit" onClick={() => handleClickLogout()}>
                                Sair
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;