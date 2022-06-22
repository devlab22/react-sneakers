import axios from "axios";

// https://api.meraki.com/api/

const baseUrl = 'http://localhost:8085/api/';

class MyDashboard {
    constructor(session) {
        this.session = session;
    }

    getHeaders() {

        return {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Cisco-Meraki-API-Key": this.session
        }

    }

    async getData(url) {

        const { data } = await axios.get(url, {
            headers: this.getHeaders()
        });
        return data;

    }
    async getOrganizations() {

        const url = baseUrl + 'organizations';
        return await this.getData(url);
    }

    async getNetwork(networkId) {

        const url = baseUrl + `networks/${networkId}`;
        return await this.getData(url);
    }
    async getNetworks(orgId) {

        const url = baseUrl + `organizations/${orgId}/networks/`;
        return await this.getData(url);
    }

    async getCountries() {

        const { data } = await axios.get("https://restcountries.com/v2/all");
        return data;
    }

}

export default MyDashboard;