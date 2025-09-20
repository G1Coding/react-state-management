import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "./Products";
import Options from "./Options";

const Type = ({ orderType }) => {
    const [items, setItems] = useState([]);
  useEffect(() => {
    // orderType에 따라 다른 컴포넌트를 불러와야 함
    // orderType이 products면 Products 컴포넌트, options면 Options 컴포넌트
    loadItem( orderType );
  }, [orderType]);

  const loadItem = async (orderType) => {
    try {
      const response = await axios.get(`http://localhost:4000/${orderType}`);
        setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ItemComponent = orderType === "products" ? Products : Options;
  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));
  
  
  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격</p>

      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" ? "column" : "row",
        }}
      >

        {optionItems}
      </div>
    </div>
  );
};

export default Type;
