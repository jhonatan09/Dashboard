import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { DataContext } from "../../store";
import "./styles.scss";

function Register() {
  const history = useHistory();
  const { setUser } = useContext(DataContext);
  const [formData, setFormData] = useState({ name: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.password.trim()) {
      console.log("Preencha todos os campos!");
      return;
    }

    const userData = {
      ...formData,
      id: Date.now().toString(),
      orders: [],
    };

    localStorage.setItem("@Provi:userData", JSON.stringify(userData));
    setUser(userData);

    alert("Cadastro realizado com sucesso!");
    history.push("/Dashboard/home");
  };

  return (
    <div className="register-page">
      <form onSubmit={handleRegister} className="form">
        <h2 className="title-page">Create account</h2>
        <p className="subtitle">Fill in the details to register</p>

        <div className="input-data">
          <label>Login:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Type your user name"
            required
          />
        </div>

        <div className="input-data">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Type your user password"
            required
          />
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Register;
