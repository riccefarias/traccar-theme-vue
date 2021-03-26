'use strict';

import axios from 'axios';

import Emitter from './Emitter';



let connector = function(server,vue){
    this.server = server;
    this.vue = vue;
    this.vm = false;
    this.ws = null;
    this.listeners = {"open": [],"message":[],"close":[]};

    this.axios = axios.create({
        baseURL: this.server,
        timeout: 30000,
        withCredentials: true,
        validateStatus: function (status) {
            return (status < 400); // Resolve only if the status code is less than 500
        }
    });

    vue.mixin({created: function(){
            connector.vm = this;
        }})

    console.log("Instance of " + server);
}



connector.prototype.startWS = function(){
    let wsServer = this.server.replace('http://','ws://').replace('https://','wss://');
    this.ws = new WebSocket(wsServer+'/socket');
    this.ws.onopen = (event)=>{
        Emitter.emit('open',event);
    }

    this.ws.onclose = (event)=>{
        Emitter.emit('close',event);
    }

    this.ws.onmessage = (d)=>{
        let data = JSON.parse(d.data);
        Emitter.emit('message',data);
    }
}

connector.prototype.on = function(label,fnc){
    Emitter.addListener(label,fnc);
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

connector.prototype.getPositions = function(){
    return this.axios.get('/positions');
}

connector.prototype.sendStopEngine = function(deviceId){
    return this.axios.post('/commands/send',{"id":0,"description":"Novo...","deviceId":deviceId,"type":"engineStop","textChannel":false,"attributes":{}})
}

connector.prototype.loadTrips = function(id,from,to){
    return this.axios.get('/reports/trips?_dc=1616717856816&deviceId='+id+'&type=allEvents&from='+from+'&to='+to+'&daily=false&page=1&start=0&limit=25');
}


connector.prototype.loadRoute = function(id,from,to){
    return this.axios.get('/reports/route?_dc=1616717856816&deviceId='+id+'&type=allEvents&from='+from+'&to='+to+'&daily=false&page=1&start=0&limit=25');
}

export default connector;

