// Author : Nikethan Selvanathan
// Date : 07/01/2016

'use strict';

var googleCalendarProvider = require('./../providers/CalendarProvider.js');
var fs = require('fs');

module.exports = {
    getAuthorizationURL : getAuthorizationURL,
    setAuthorizationCode : setAuthorizationCode
};


function getAuthorizationURL(request, response) {

    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            response.json({message: err});
        }

        var con = JSON.parse(content);

        googleCalendarProvider.getAuthorizationURL(con).then(function (res) {

                response.json({message: res});

        }).catch(function (err) {
            console.log(err);
            response.json({message: err});
        });

    });
}

function setAuthorizationCode(request, response) {
    var authorizationCode = request.swagger.params.authorizationCode.value || '';

    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            response.json({message: err});
        }

        var con = JSON.parse(content);

        googleCalendarProvider.saveAuthorizationCode(con, authorizationCode).then(function (res) {

            response.json({message: res});

        }).catch(function (err) {
            console.log(err);
            response.json({message: err});
        });

    });
}