import axios from 'axios'
import { showTabs, selectTab } from '../tab/tabActions'
import { BASE_URL, CLIENTS_FETCHED } from '../constants'

export function loadClients() {
    const request = axios.get(`${BASE_URL}/clients`);
    return {
        type: CLIENTS_FETCHED,
        payload: request
    };
}