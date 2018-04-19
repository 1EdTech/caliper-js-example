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
    
    // Initialize Caliper sensor
    var sensor = Caliper.Sensor;
    sensor.initialize("http://example.org/sensors/1");
    
    // TAKE HEED: you must uncomment and define the HTTPClient options (endpoint, message headers, etc.)
    // Example: RequestBin endpoint running in Heroku (Runscope's public version has been disabled due to misuse)
    /**
    var options = {
      uri: 'https://someplace.herokuapp.com/wufdiiwu',
      withCredentials: false,
      headers: {
        "Authorization": "Y2FsaXBlcnYxcDFib290Y2FtcDIwMTc=",
        "Content-Type": "application/json"
      },
      method: "POST"
    };
    */
    
    // Initialize then register HTTP client
    var client = Caliper.Clients.HttpClient;
    client.initialize(sensor.id.concat("/clients/1"), options);
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
      sensor.sendToClients(envelope);
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