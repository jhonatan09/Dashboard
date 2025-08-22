import { useContext, useState } from "react";
import "./styles.scss";
import { DataContext } from "../../store";
import jsPDF from "jspdf";
import { useHistory } from "react-router-dom";

function Payment() {
  const history = useHistory();

  const { user } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [paymentValue, setPaymentValue] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!user || !user.orders || user.orders.length === 0) {
    return (
      <div className="payment container">
        <div className="card">
          <h2 className="card-title"> Pagamento</h2>
          <p>Nenhum pedido encontrado.</p>
        </div>
      </div>
    );
  }

  const handleGenerateBoleto = () => {
    if (!selectedOrder || !paymentValue) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Boleto Fictício", 20, 20);

    doc.setFontSize(12);
    doc.text(`Pedido: ${selectedOrder.id}`, 20, 40);
    doc.text(`Agência: ${selectedOrder.agency}`, 20, 50);
    doc.text(`Conta: ${selectedOrder.account}`, 20, 60);
    doc.text(`Valor do pagamento: R$ ${paymentValue}`, 20, 70);
    doc.text(`Beneficiário: Provi Bank`, 20, 90);
    doc.text(
      "Este boleto é fictício e gerado apenas para demonstração.",
      20,
      110
    );

    doc.save(`boleto-${selectedOrder.id}.pdf`);

    setShowModal(false);
    setPaymentValue("");
    setSelectedOrder(null);
  };

  return (
    <div className="payment container">
      <div className="actions">
        <button
          className="btn-back"
          onClick={() => history.push("/Dashboard/home")}
        >
          Voltar para Home
        </button>
      </div>
      {user.orders.map((order, index) => (
        <div key={order.id} className="card">
          <h2 className="card-title">Pagamento - Pedido {index + 1}</h2>
          <ul className="info-list">
            <li className="info-item">
              <span className="label">Valor total:</span>
              <span className="value">R$ {order.amountTaken}</span>
            </li>
            <li className="info-item">
              <span className="label">Valor já pago:</span>
              <span className="value">R$ {order.amountPayd}</span>
            </li>
            <li className="info-item">
              <span className="label">Parcelas restantes:</span>
              <span className="value">{order.installments?.length || 0}</span>
            </li>
            <li className="info-item">
              <span className="label">Agência:</span>
              <span className="value">{order.agency}</span>
            </li>
            <li className="info-item">
              <span className="label">Conta:</span>
              <span className="value">{order.account}</span>
            </li>
          </ul>

          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedOrder(order);
              setShowModal(true);
            }}
          >
            Efetuar Pagamento
          </button>
        </div>
      ))}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Informe o valor para pagamento</h3>
            <input
              type="number"
              value={paymentValue}
              onChange={(e) => setPaymentValue(e.target.value)}
              placeholder="Digite o valor"
            />
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={handleGenerateBoleto}
              >
                Gerar Boleto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
