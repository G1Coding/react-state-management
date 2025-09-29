import { createContext, useMemo, useState, useEffect } from "react";

export const OrderContext = createContext();

export function OrderContextProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  // 전체 가격 계산
  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  // 옵션 별 가격표
  const pricePerItem = {
    products: 1000,
    options: 500
  }

  // 옵션의 총(옵션의 종류*갯수) 가격 계산
  const calculateSubtotal = (orderType, orderCounts) => {
    let optionCount = 0;
    for(const count of orderCounts[orderType].values()) {
        optionCount += count;
    }
    return optionCount * pricePerItem[orderType];
  }

  useEffect(() => {
    const productsTotal = calculateSubtotal("products", orderCounts);
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total: total,
    });
  }, [orderCounts]);

  // 상품 주문 갯수, 총 가격이 변경될 때만 리렌더링이 되도록 useMemo 사용
  const value = useMemo(() => {
    // 상품, 주문 갯수의 변경을 업데이트 해주는 함수
    function updateItemCount(itemName, newItemCount, orderType) {
      const newOrderCounts = { ...orderCounts };

      const orderCountsMap = orderCounts[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCount));

      setOrderCounts(newOrderCounts);
    }

    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}
