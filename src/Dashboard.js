import axios from "axios";


class MyDashboard {
    constructor(session) {
        this.session = session;
        this.session = "9c990e550487dcfdcfe02e65b40f77035bd45d86";

    }

    getHeaders() {

        return {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            "Access-Control-Allow-Credentials": true,
            "X-Cisco-Meraki-API-Key": this.session
        }

    }

    async getData(url) {

        const options = {
            headers: this.getHeaders(),
            method: 'GET',
            body: null,
            url: url,
            mode: "no-cors",
            crossdomain: true,
            proxy: "https://api.meraki.com"
        }

        const { data } = await axios(options['url'], options);
        console.log(data);
        return data;
    }
    async getOrganizations() {

        const url = 'https://api.meraki.com/api/v1/organizations';
        return await this.getData(url);
    }

    async getNetwork(networkId) {

        const url = `https://api.meraki.com/api/v1/networks/${networkId}`;
        return await this.getData(url);
    }

    async getCountries() {

        const { data } = await axios.get("https://restcountries.com/v2/all");
        //console.log(data)
        return data;
    }

}

export default MyDashboard;