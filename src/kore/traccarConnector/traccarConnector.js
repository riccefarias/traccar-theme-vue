'use strict';

import axios from 'axios';


let connector = function(server){
    this.server = server;

    this.axios = axios.create({
        baseURL: this.server,
        timeout: 30000,
        withCredentials: true,
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    });

    console.log("Instance of " + server);
}


connector.prototype.login = function(email,password){


    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    params.append('undefined', 'false');

    return this.axios.post('/session',params);
}

connector.prototype.getDevices = function(){
    return this.axios.get('/devices');
}

export default connector;

