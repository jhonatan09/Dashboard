import React, { useState, useEffect } from "react";

const DataContext = React.createContext();

function DataContextProvider(props) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("@Provi:userData");
      if (savedUser) return JSON.parse(savedUser);
    } catch (err) {
      console.error("Erro ao ler usuário do localStorage:", err);
    }

    return {
      id: "1",
      name: "Jhonatan",
      password: "12345",
      orders: [
        {
          id: "ord-1",
          amountTaken: "500",
          paidAmount: "100",
          interestRate: "2%",
          totalAmountInTaxes: "50",
          agency: "008",
          account: "98804-5",
          paymentDay: "10",
          installments: [
            { formatedValue: "R$ 200,00", payd: false, dueDate: "10/09/2025" },
            { formatedValue: "R$ 200,00", payd: true, dueDate: "10/08/2025" },
            { formatedValue: "R$ 200,00", payd: false, dueDate: "10/10/2025" },
          ],
        },
      ],
    };
  });

  useEffect(() => {
    if (user?.name && user?.password) {
      try {
        localStorage.setItem("@Provi:userData", JSON.stringify(user));
      } catch (err) {
        console.error("Erro ao salvar usuário no localStorage:", err);
      }
    }
  }, [user]);

  return (
    <DataContext.Provider value={{ user, setUser }}>
      {props.children}
    </DataContext.Provider>
  );
}

export { DataContextProvider, DataContext };
