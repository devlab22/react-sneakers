import axios from "axios";

class MyDashboard {
    constructor(session) {
        this.session = session;
        //this.session = "6bec40cf957de430a6f1f2baa056b99a4fac9ea0";
    }

    getHeaders() {

        return {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "X",
            "X-Cisco-Meraki-API-Key": this.session
        }

    }
    async getOrganizations() {

        const resp = await axios.get('https://api.meraki.com/api/v1/organizations', {
            headers: this.getHeaders()
        });
        console.log(resp)
        return resp;

    }
}

export default MyDashboard;