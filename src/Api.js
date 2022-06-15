import axios from "axios";
import { Buffer } from 'buffer'

class CiscoISE{
    constructor(login, password, ipAddress){
      this.ipAddress = 'https://' + ipAddress;
      const tmp = login + ':' + password;
      this.credentials = Buffer.from(tmp).toString('base64');
      //console.log(this.credentials);
      //console.log(Buffer.from(this.credentials, 'base64').toString('ascii'));     
    }
    getHeader(){

        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + this.credentials
        }
    }
}

export default CiscoISE;