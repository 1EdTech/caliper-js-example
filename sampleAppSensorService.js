/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

/* 
 * Sample App Sensor Service
 *
 * This service wraps the caliper-js sensor, enabling any application specific 
 * logic to be performed before sending events using the base Javascript sensor
 *
 * @author: Prashant Nayak, Intellify Learning; Anthony Whyte, University of Michigan
 */
angular.module('sampleCaliperApp')
  .factory('sampleAppSensorService', ['sampleAppContextService', function(sampleAppContextService) {

    // Initialize Caliper sensor with options
    var sensor = Caliper.Sensor;
    var client = Caliper.SensorClients.Client;

    // Note that you will have to create a new request bin
    // by navigating to http://requestb.in/
    // and replace the "path" setting below with the path 
    // to your request bin
    /**
    sensor.initialize('http://example.com/sensor/1',{
      host: 'requestb-in-1h04eq0e08pc.runscope.net',
      path: '/quu6jzqu', // REPLACE WITH YOUR REQUEST BIN PATH
      withCredentials: false
    });
     */

    // Intellify endpoint
    var options = {
      host: 'demo.intellify.io',
      path: '/collector/v2/caliper/event',
      withCredentials: false,
      headers: {
        "Authorization": "40dI6P62Q_qrWxpTk95z8w",
        "Content-Length": null,
        "Content-Type": "application/json"
      },
      method: "POST"
    };

    // Requestbin endpoint
    /**
     var options = {
      host: 'requestb-in-4f2lrjhmp27c.runscope.net',
      path: '/rrccxxrr', // REPLACE WITH YOUR REQUEST BIN PATH
      withCredentials: false
      headers: {
      "Authorization": "Y2FsaXBlcnYxcDFib290Y2FtcDIwMTc=", // caliperv1p1bootcamp2017 Base64 encode
      "Content-Length": null,
      "Content-Type": "application/json"
      },
      method: "POST"
    };
     */

    // Initial Delegation chain
    sensor.initialize("http://example.com/sensor/1");
    client.initialize(sensor.id.concat("/clients/1", options));
    sensor.registerClient(client);

    // Wrapper around Caliper Sensor getId()
    var getId = function() {
      return sensor.getId();
    };

    // Wrapper around Caliper Sensor createEnvelope()
    var createEnvelope = function(opts) {
      return sensor.createEnvelope(opts)
    };

    // Wrapper around Caliper Sensor's sendEnvelope()
    var sendEnvelope = function(envelope) {
      sensor.sendEnvelope(envelope);
    };

    // Export the functions that will be used by controller
    var exports = {
      getId: getId,
      createEnvelope: createEnvelope,
      sendEnvelope: sendEnvelope,
      currentUser: sampleAppContextService.getUser(),
      syllabus: sampleAppContextService.getSyllabus(),
      reading: sampleAppContextService.getReading(),
      readingFrame: sampleAppContextService.getReadingFrame(),
      edApp: sampleAppContextService.getEdApp(),
      course: sampleAppContextService.getCourse(),
      membership: sampleAppContextService.getMembership(),
      courseHomePage: sampleAppContextService.getCourseHomePage(),
      quiz: sampleAppContextService.getQuiz(),
      quizPage: sampleAppContextService.getQuizPage()
    };

    return exports;
  }]);