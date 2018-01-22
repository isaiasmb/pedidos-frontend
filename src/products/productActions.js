import axios from 'axios'
import { BASE_URL, PRODUCTS_FETCHED } from '../constants'

export function loadProducts() {
    const request = axios.get(`${BASE_URL}/products`);
    return {
        type: PRODUCTS_FETCHED,
        payload: request
    };
}