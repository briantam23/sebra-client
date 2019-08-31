import axios from 'axios';
import { UPDATE_ORDER } from '../constants';


const _updateOrder = cart => ({
    type: UPDATE_ORDER,
    orders: cart
})
export const updateOrder = (auth, history) => {
    const token = window.localStorage.getItem('token');
    console.log(token)
    const transactionInfo = { 
        username: /* auth.username, */ 'allen2',
        recipientAddress: /* auth.recipientAddress, */'57e6856ff558364ce4f4574ea0cc9e993e4d1581310aea7990b7085c8251526c9', 
        amount: /* auth.chargeAmount / 100 */ 5
    }     
    console.log(transactionInfo)
    return dispatch => (
        axios.post('https://vast-plains-55545.herokuapp.com/api/transaction', { transactionInfo }, { headers: { authorization: token } })
            .then(res => res.data)
            .then(data => {
                history.push(`/account/completed`);
                dispatch(_updateOrder(data));
            })
    )
}