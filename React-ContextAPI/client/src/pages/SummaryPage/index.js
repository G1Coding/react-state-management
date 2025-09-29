import React, { useContext } from "react";
import { useState } from "react";
import { OrderContext } from "../../context/OrderContext";

const SummaryPage = ({ setStep }) => {
  const [checked, setChecked] = useState(false);
  const [orderDetails] = useContext(OrderContext);

  // 상품의 가격
  const productArray = Array.from(orderDetails.products); // map > 배열
  const productList = productArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });

  // 옵션 가격
  const hasOptions = orderDetails.options.size > 0;
  let optionsDisplay = null;

  if (hasOptions) {
    const optionsArray = Array.from(orderDetails.options.keys());
    const optionList = optionsArray.map((key) => {
      return <li key={key}>{key}</li>;
    });
    optionsDisplay = (
      <>
        <h2>옵션 : {orderDetails.totals.options}</h2>
        <ul>{optionList}</ul>
      </>
    );
  }

  // 버튼 눌렀을 때 호출
  const handleSubmit = (event) => {
    event.preventDefault(); // 제출 버튼 눌렀을 때 새로고침 방지
    // console.log('서버로 데이터 전송');
    setStep(2);
  };

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDetails.totals.products}</h2>
      <ul>{productList.length > 0 ? productList : "주문 내역 없음"}</ul>
      {optionsDisplay}
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          checked={checked}
          id="confirm-checkbox"
          onChange={(e) => setChecked(e.target.checked)}
        />{" "}
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button type="submit" disabled={!checked}>
          주문하기
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
