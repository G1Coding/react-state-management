import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import axios from "axios";
import "../../index.css";

const CompletePage = ({ setStep }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderData] = useContext(OrderContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData]);

  // 서버로 주문 정보 보내는 함수.
  const orderCompleted = async (orderData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/order",
        orderData
      );
      // console.log("response", response);
      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // 서버로부터 받아온 데이터 배열 출력용
  const orderTable = orderHistory.map((item) => (
    <tr key={item.orderNumber}>
      <td> {item.orderNumber}</td>
      <td> {item.price}</td>
    </tr>
  ));

  console.log(orderHistory);

  if (loading) {
    return <div>...loading</div>;
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>주문이 성공했습니다.</h2>
        <h3>지금까지 모든 주문</h3>

        <table style={{ margin: "auto" }}>
          <tbody>
            <tr>
              <th>number</th>
              <th>price</th>
            </tr>
            {orderTable}
          </tbody>
        </table>

        <br />
        <button onClick={() => setStep(0)}>첫 페이지로</button>
      </div>
    );
  }
};

export default CompletePage;
