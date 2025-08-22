import React, { useContext } from "react";
import { DataContext } from "../../store";
import { useHistory } from "react-router-dom"; // <-- corrigido
import "./styles.scss";

function Home() {
  const { user } = useContext(DataContext);
  const history = useHistory(); // <-- corrigido

  if (!user) {
    return <div className="home">Nenhum dado encontrado!</div>;
  }

  const hasOrders = user.orders && user.orders.length > 0;

  return (
    <div className="home">
      <div className="card">
        <h2 className="card-title">Bem-vindo, {user.name}!</h2>

        {!hasOrders ? (
          <div className="empty-state">
            <p>🚫 Nenhum empréstimo contratado ainda.</p>
            <button
              onClick={() => history.push("/Dashboard/order")} // <-- corrigido
              className="btn-primary"
            >
              Criar novo empréstimo
            </button>
          </div>
        ) : (
          user.orders.map((order, idx) => (
            <div key={order.id} className="order-summary">
              <h3 className="info-name">📌 Pedido {idx + 1}</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="label">Valor emprestado:</span>
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
                  <span className="label">Total de juros:</span>
                  <span className="value highlight">
                    R$ {order.totalAmountInTaxes}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
