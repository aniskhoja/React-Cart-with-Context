
const reducer = (state, action) => {
    switch (action.type) {
        case "CLEAR_CART":
            return { ...state, cart: [] }
        case "REMOVE":
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload) }
        case "INCREASE":
            return {
                ...state, cart:
                    state.cart.map(c => c.id === action.payload ?
                        { ...c, amount: c.amount + 1 } : c)
            }
        case "DECREASE":
            let tempCart = state.cart.map(c => {
                if (c.id === action.payload) {
                    return {...c, amount: c.amount - 1}  
                }
                return c
            }).filter(c => c.amount !== 0)
            return { ...state, cart: tempCart }
        case "GET_TOTALS":
            let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
                const { price, amount } = cartItem;
                const itemTotal = price * amount;

                cartTotal.total += itemTotal
                cartTotal.amount += amount;
                return cartTotal
            }, {
                total: 0, amount: 0
            })
            total = parseFloat(total.toFixed(2))
            return { ...state, total, amount }
        case "LOADING":
            return { ...state, loading: true }
        case "DISPLAY_ITEMS":
            return {...state, cart:action.payload, loading:false}
    }
    
   
}

export default reducer