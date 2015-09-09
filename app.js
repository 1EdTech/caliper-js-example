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
 * AngularJS Controller for Sample Caliper Application
 *
 * This controller manages the logic for the Sample Application
 * and uses the sensor service to send Caliper events
 *
 * @author: Prashant Nayak, Intellify Learning; Anthony Whyte, University of Michigan
 */
 
var app = angular.module('sampleCaliperApp', []);

app.controller('sampleAppCtrl', ['$scope', 'sampleAppSensorService',
  function($scope, sampleAppSensorService, $window, $location) {

    // Model(Flags) for controlling UI
    $scope.syllabusActive = true;
    $scope.readingActive = false;
    $scope.quizActive = false;

    // Model for Annotation (Tags)
    $scope.currentTag = '';
    $scope.readingTags = [];

    // Model for Quiz
    $scope.correctAnswer = false;
    $scope.quizSubmitted = false;
    $scope.currentAttempt = null; // set/get current assessment attempt
    $scope.currentEvent = {};

    $scope.init = function() {
      console.log("INIT: Session started, Caliper = %o");
      $scope.startSession(); // Fire Session Event
    };

    // Controller functions for UI
    $scope.setSyllabusActive = function() {
      $scope.syllabusActive = true;
      $scope.readingActive = false;
      $scope.quizActive = false;
    };

    $scope.setReadingActive = function() {
      $scope.navigateToPage(); // Fire Navigation Event
      $scope.readingActive = true;
      $scope.quizActive = false;
      $scope.syllabusActive = false;
    };

    $scope.setQuizActive = function() {
      $scope.startQuiz(); // Fire Assessment Event
      $scope.quizActive = true;
      $scope.readingActive = false;
      $scope.syllabusActive = false;
    };

    $scope.addTag = function() {
      $scope.readingTags.push($scope.currentTag);
      $scope.addTagsToPage($scope.readingTags); // Fire Annotation Event
      $scope.currentTag = '';
    };

    $scope.submitQuiz = function() {
      $scope.quizSubmitted = true;
      // if (correctAnswer) {
      //   // $scope.submitQuizToSensor(3.0); // Fire Assessment Event
      // } else {
      //   // $scope.submitQuizToSensor(0.0); // Fire Assessment Event
      // }
      // Generate an outcome against the quiz submission attempt
      $scope.gradeQuiz();
    };

    $scope.retakeQuiz = function() {
      $scope.quizSubmitted = false;
    };

    //////////////////////////////////////////////////////
    // Controller functions for specific Caliper Events //
    //////////////////////////////////////////////////////

    // BOOTCAMP EXERCISE # 1: Session Event (Login)
    $scope.startSession = function() {

      // Actor LOGGED IN to edApp generating a new Session

      // The Actor for the Caliper Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Caliper Event (Hint: Use SessionActions)
      var action = Caliper.Actions.SessionActions.LOGGED_IN;

      // The Object being interacted with by the Actor (edApp)
      var obj = sampleAppSensorService.edApp;

      // The generated object (Session) within the Event Object
      var generated = new Caliper.Entities.Session("https://imsglobal.org/sampleCaliperApp//session-123456789");
      generated.setName("session-123456789");
      generated.setDescription(null);
      generated.setActor(actor);
      var sessionStart = new Date().toISOString();
      generated.setDateCreated(sessionStart);
      generated.setStartedAtTime(sessionStart);
      generated.setEndedAtTime(null);
      generated.setDuration(null);

      // The edApp that is part of the Learning Context
      var edApp = obj;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The actor's membership, roles and status
      var membership = sampleAppSensorService.membership;

      // Create the Session Event (Uncomment and set references to objects)
      var event = new Caliper.Events.SessionEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setGenerated(generated);
      event.setEdApp(edApp);
      event.setGroup(group);
      event.setMembership(membership);
      event.setEventTime(new Date().toISOString());

      // console.log('created session event %O', event);

      $scope.currentEventType = 'Session Event (LOGGED IN)';
      $scope.currentEvent = event;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(event);
    };

    // Navigation Event
    $scope.navigateToPage = function() {

      // The Actor for the Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Event
      var action = Caliper.Actions.NavigationActions.NAVIGATED_TO;

      // The Object (Reading) being interacted with by the Actor
      var obj = sampleAppSensorService.reading;

      // The target object (frame) within the Event Object
      var target = sampleAppSensorService.readingFrame;

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The actor's membership, roles and status
      var membership = sampleAppSensorService.membership;

      // Specific to the Navigation Event - the location where the user navigated from
      var navigatedFrom = sampleAppSensorService.courseHomePage;

      // Create the Navigation Event
      var event = new Caliper.Events.NavigationEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setTarget(target);
      event.setNavigatedFrom(navigatedFrom);
      event.setEdApp(edApp);
      event.setGroup(group);
      event.setMembership(membership);
      event.setEventTime(new Date().toISOString());

      // console.log('created navigation event %O', event);

      $scope.currentEventType = 'Navigation Event';
      $scope.currentEvent = event;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(event);
    };

    // Annotation Event
    $scope.addTagsToPage = function(tags) {

      // The Actor for the Caliper Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Caliper Event
      var action = Caliper.Actions.AnnotationActions.TAGGED;

      // The Object being interacted with by the Actor
      var obj = sampleAppSensorService.readingFrame;

      // The generated object (Tag annotation)
      var generated = new Caliper.Entities.TagAnnotation("https://imsglobal.org/sampleCaliperApp/tags/7654");
      generated.setTags(tags);
      generated.setDateCreated(new Date().toISOString());

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The actor's membership, roles and status
      var membership = sampleAppSensorService.membership;

      // Create the Annotation Event
      var event = new Caliper.Events.AnnotationEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setGenerated(generated);
      event.setEdApp(edApp);
      event.setGroup(group);
      event.setMembership(membership);
      event.setEventTime(new Date().toISOString());

      console.log('created annotation event %O', event);

      $scope.currentEventType = 'Annotation Event';
      $scope.currentEvent = event;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(event);
    };

    // Quiz Start Event
    $scope.startQuiz = function() {

      // The Actor for the Caliper Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Caliper Event
      var action = Caliper.Actions.AssessmentActions.STARTED;

      // The Object being interacted with by the Actor
      var obj = sampleAppSensorService.quiz;

      // The generated object (Attempt) within the Event Object
      var generated = new Caliper.Entities.Attempt("https://some-university.edu/deptOfPhysics/2014/physics101/assessment1/attempt1");
      generated.setName(null);
      generated.setDescription(null);
      generated.setActor(actor['@id']);
      generated.setAssignable(obj['@id']);
      generated.setDateCreated(new Date().toISOString());
      generated.setDateModified(null);
      generated.setCount(1);
      generated.setStartedAtTime(new Date().toISOString());
      generated.setEndedAtTime(null);
      generated.setDuration(null);

      // Assign to scope object so that the submit quiz event can reference it
      $scope.currentAttempt = generated;

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The actor's membership, roles and status
      var membership = sampleAppSensorService.membership;

      // Create the Assessment Event
      var event = new Caliper.Events.AssessmentEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setGenerated(generated);
      event.setEdApp(edApp);
      event.setGroup(group);
      event.setMembership(membership);
      event.setEventTime(new Date().toISOString());

      // console.log('created assessment event %O', event);

      $scope.currentEventType = 'Assessment Event (STARTED)';
      $scope.currentEvent = event;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(event);
    };

    // BOOTCAMP EXERCISE # 2: Quiz Submit Event
    $scope.submitQuizToSensor = function() {

      // Actor SUBMITTED Quiz Attempt

      // The Actor for the Caliper Event 
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Caliper Event (Hint: Use AssessmentActions)
      var action = Caliper.Actions.AssessmentActions.SUBMITTED;

      // The object (Attempt) being submitted
      var obj = $scope.currentAttempt;
      obj.setEndedAtTime(new Date().toISOString());
      $scope.currentAttempt = obj;

      // The target object
      var target = obj.assignable;

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The actor's membership, roles and status
      var membership = sampleAppSensorService.membership;

      // Create the Assessment Event (Uncomment and set references to objects)
      var event = new Caliper.Events.AssessmentEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setTarget(target);
      event.setEdApp(edApp);
      event.setGroup(group);
      event.setMembership(membership);
      event.setEventTime(new Date().toISOString());

      // console.log('created assessment event %O', event);

      $scope.currentEventType = 'Assessment Event (SUBMITTED)';
      $scope.currentEvent = event;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(event);
    };

    $scope.gradeQuiz = function() {
      
      //console.log("Sending Outcome Event");

      // The Actor for the Caliper Event.  No Event.membership is set for this actor.
      var actor = sampleAppSensorService.edApp;

      // The Action for the Caliper Event (Hint: Use AssessmentActions)
      var action = Caliper.Actions.OutcomeActions.GRADED;

      // The object (Attempt) being submitted
      var obj = $scope.currentAttempt;

      // The target object
      var target = obj.assignable;

      // The generated object (Result)
      var generated = new Caliper.Entities.Result("http://some-university.edu/deptOfPhysics/2014/result/12345", "a fake type");

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The Outcome Event
      var event = new Caliper.Events.OutcomeEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setTarget(target);
      event.setGenerated(generated);
      event.setEdApp(edApp);
      event.setGroup(group);
      event.setEventTime(new Date().toISOString());

      $scope.currentEventType = 'Outcome Event (GRADED)';
      $scope.currentEvent = event;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(event);
    };

    $scope.init();
  }
]);