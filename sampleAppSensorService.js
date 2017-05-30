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

    var sensor = Caliper.Sensor;
    var client = Caliper.Clients.HttpClient;
    var config = Caliper.Config.Config;
    var options = Caliper.Clients.HttpOptions;

    /**
     * HTTP OPTIONS & SENSOR/CLIENT IDENTIFIERS TO SET
     *
     * 1) HTTP request options
     * 1.1  Set by Sensor (can be overridden)
     * options.method: "POST"
     * options.headers["Content-Length"]: decimal number of OCTETS per RFC 2616
     * options.headers["Content-Type"]: "application/json"
     * options.body: stringified envelope filtered by a replacer function
     * options.timeout: 10000
     *
     * 1.2 Set by You
     * options.uri: <string> fully qualified endpoint URL
     * options.headers["Authorization"]: API key
     *
     * 2) Sensor and Client ids
     * These identifiers may need to be set to a specific value in order to
     * authenticate against a given endpoint (e.g., Intellify endpoint requires
     * a known Sensor Id).
     */

    // Intellify endpoint
    options.uri = "https://demo.intellify.io/collector/v2/caliper/event";
    options.headers["Authorization"] = "40dI6P62Q_qrWxpTk95z8w";

    // Requestbin endpoint
    /**
     var host = "https://requestb-in-1h04eq0e08pc.runscope.net";
     var path = "/quu6jzqu"; // REPLACE WITH YOUR REQUEST BIN PATH
     options.uri = host.concat(path);
     options.headers["Authorization"] = "Y2FsaXBlcnYxcDFib290Y2FtcDIwMTc="; // Faux
     options.withCredentials = false;
     */

    /**
     console.log("OPTIONS: " + options.method);
     console.log("OPTIONS: " + options.uri);
     console.log("OPTIONS: " + options.headers["Authorization"]);
     console.log("OPTIONS: " + options.headers["Content-Type"]);
     console.log("OPTIONS: " + options.timeout);
     */

    // Initialize Sensor and register Client (delegation chain)
    sensor.initialize("org.ims.caliper.bootcamp2017");
    client.initialize(sensor.id.concat("/clients/1"), options);
    sensor.registerClient(client);

    // Wrapper around Caliper Sensor config.
    var getEnvelopeDataVersion = function getEnvelopeDataVersion() {
      return config.dataVersion;
    };

    // Wrapper around Caliper Sensor getId()
    var getId = function getId() {
      return sensor.getId();
    };

    // Wrapper around Caliper Sensor createEnvelope()
    var createEnvelope = function createEnvelope(opts) {
      return sensor.createEnvelope(opts)
    };

    // Wrapper around Caliper Sensor's sendEnvelope()
    var sendEnvelope = function sendEnvelope(envelope) {
      sensor.sendToClient(client, envelope);
    };

    // Export the functions that will be used by controller
    var exports = {
      getEnvelopeDataVersion: getEnvelopeDataVersion,
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