import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { DataContext } from "../../store";
import "./styles.scss";

function Order() {
  const history = useHistory();
  const { user, setUser } = useContext(DataContext);

  const [showModal, setShowModal] = useState(false);
  const [loanValue, setLoanValue] = useState("");
  const [installments, setInstallments] = useState(1);
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");
  const [paymentDay, setPaymentDay] = useState("");

  const calculateLoan = () => {
    const value = parseFloat(loanValue);
    if (!value || value <= 0) return null;

    const monthlyInterest = 0.02;
    const total = value * Math.pow(1 + monthlyInterest, installments);
    const installmentValue = total / installments;

    return {
      netValue: value,
      total,
      installmentValue,
      monthlyInterest: `${(monthlyInterest * 100).toFixed(2)}%`,
    };
  };

  const getDueDate = (day, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() + index + 1);

    if (day.includes("5")) {
      date.setDate(5);
    } else if (day.includes("15")) {
      date.setDate(15);
    } else if (day.includes("30")) {
      date.setDate(30);
    }

    return date.toLocaleDateString();
  };

  const handleSubmit = () => {
    const calc = calculateLoan();
    if (!calc) return;

    if (!paymentDay || paymentDay === "escolha um dia") {
      alert("⚠️ Escolha um dia de pagamento antes de confirmar.");
      return;
    }

    const newInstallments = Array.from({ length: installments }, (_, i) => ({
      formattedValue: `R$ ${calc.installmentValue.toFixed(2)}`,
      payd: false,
      dueDate: getDueDate(paymentDay, i),
    }));

    const newOrder = {
      id: Date.now(),
      amountTaken: loanValue,
      totalAmountInTaxes: (calc.total - calc.netValue).toFixed(2),
      interestRate: calc.monthlyInterest,
      paidAmount: 0,
      installments: newInstallments,
      agency,
      account,
      paymentDay,
      createdAt: new Date().toLocaleDateString(),
    };

    const updatedUser = {
      ...user,
      orders: [...(user.orders || []), newOrder],
    };

    setUser(updatedUser);

    setLoanValue("");
    setInstallments(1);
    setAgency("");
    setAccount("");
    setPaymentDay("");
    setShowModal(false);
  };

  return (
    <div className="order-page">
      <div className="order-header">
        <h2>Meus Pedidos</h2>
        <div className="actions">
          <button
            className="btn-back"
            onClick={() => history.push("/Dashboard/home")}
          >
            Voltar para Home
          </button>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            Novo Pedido
          </button>
        </div>
      </div>

      {(!user.orders || user.orders.length === 0) && (
        <p className="no-orders">Nenhum pedido realizado ainda.</p>
      )}

      <div className="orders-list">
        {user.orders?.map((order, idx) => (
          <div key={order.id} className="card">
            <h3 className="card-title">Pedido #{idx + 1}</h3>
            <div className="info-list">
              <div className="info-item">
                <span className="label">Valor solicitado:</span>
                <span className="value">R$ {order.amountTaken}</span>
              </div>
              <div className="info-item">
                <span className="label">Já pago:</span>
                <span className="value">R$ {order.paidAmount}</span>
              </div>
              <div className="info-item">
                <span className="label">Taxa de juros:</span>
                <span className="value">{order.interestRate}</span>
              </div>
              <div className="info-item">
                <span className="label">Total de Juros:</span>
                <span className="value">R$ {order.totalAmountInTaxes}</span>
              </div>
              <div className="info-item">
                <span className="label">Agência:</span>
                <span className="value">{order.agency}</span>
              </div>
              <div className="info-item">
                <span className="label">Conta:</span>
                <span className="value">{order.account}</span>
              </div>
              <div className="info-item">
                <span className="label">Dia do Pagamento:</span>
                <span className="value">{order.paymentDay}</span>
              </div>
            </div>

            <div className="installments">
              <p className="subtitle">Parcelas:</p>
              <div className="installment-list">
                {order.installments.map((inst, i) => (
                  <div key={i} className="installment-item">
                    <span className="label">{inst.dueDate}</span>
                    <span className="value">{inst.formattedValue}</span>
                    <span
                      className={inst.payd ? "status-paid" : "status-pending"}
                    >
                      {inst.payd ? "Pago" : "Pendente"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Novo Pedido</h3>
            <label>
              Valor do Empréstimo:
              <input
                type="number"
                value={loanValue}
                onChange={(e) => setLoanValue(e.target.value)}
              />
            </label>
            <label>
              Parcelas:
              <input
                type="number"
                value={installments}
                min="1"
                max="36"
                onChange={(e) => setInstallments(Number(e.target.value))}
              />
            </label>
            <label>
              Agência:
              <input
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
              />
            </label>
            <label>
              Conta:
              <input
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </label>
            <label>
              Dia de Pagamento:
              <select
                value={paymentDay}
                onChange={(e) => setPaymentDay(e.target.value)}
              >
                <option value="">-- escolha um dia --</option>
                <option value="5º dia útil">5º dia útil</option>
                <option value="15º dia">15º dia</option>
                <option value="30º dia">30º dia</option>
              </select>
            </label>
            <div className="modal-actions">
              <button className="btn-success" onClick={handleSubmit}>
                Confirmar
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
