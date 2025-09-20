import {createContext, useMemo, useState} from 'react';

const OrderContext = createContext();

export function OrderContextProvider(props) {

    const [orderCounts, setOrderCounts] = useState({
        products: new Map(),
        options: new Map()
    })

    // 상품 주문 갯수가 변경될 때만 리렌더링이 되도록 useMemo 사용
    const value = useMemo(() => {

        // 상품, 주문 갯수의 변경을 업데이트 해주는 함수
        function updateItemCount(itemName, newItemCount, orderType) {
            const newOrderCounts = {...orderCounts};

            const orderCountsMap = orderCounts(orderType);
            orderCountsMap.set(itemName, parseInt(newItemCount));

            setOrderCounts(newOrderCounts);
        }


        return [{...orderCounts}, updateItemCount]

    }, [orderCounts])



    return <OrderContext.Provider value={value} {...props} />       
}