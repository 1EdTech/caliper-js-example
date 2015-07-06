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
      var edApp = sampleAppSensorService.edApp;

      // Event starteAtTime
      var currentTimeMillis = (new Date()).getTime();

      // The generated object (Session) within the Event Object
      var generatedSession = new Caliper.Entities.Session("https://imsglobal.org/sampleCaliperApp//session-123456789");
      generatedSession.setName("session-123456789");
      generatedSession.setDescription(null);
      generatedSession.setActor(actor);
      generatedSession.setStartedAtTime(currentTimeMillis);
      generatedSession.setEndedAtTime(null);
      generatedSession.setDuration(null);
      generatedSession.setDateCreated(currentTimeMillis);

      // The edApp that is part of the Learning Context
      // var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var course = sampleAppSensorService.course;

      // Create the Session Event (Uncomment and set references to objects)
      var sessionEvent = new Caliper.Events.SessionEvent();
      sessionEvent.setActor(actor);
      sessionEvent.setAction(action);
      sessionEvent.setObject(edApp);
      sessionEvent.setGenerated(generatedSession);
      sessionEvent.setGroup(course);
      sessionEvent.setEdApp(edApp);
      sessionEvent.setStartedAtTime(currentTimeMillis);

      // console.log('created session event %O', sessionEvent);

      $scope.currentEventType = 'Session Event (LOGGED IN)';
      $scope.currentEvent = sessionEvent;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(sessionEvent);
    };

    // Navigation Event
    $scope.navigateToPage = function() {

      // The Actor for the Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Event
      var action = Caliper.Actions.ReadingActions.NAVIGATED_TO;

      // The Object (Reading) being interacted with by the Actor
      var eventObj = sampleAppSensorService.reading;

      // The target object (frame) within the Event Object
      var targetObj = sampleAppSensorService.readingFrame;

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var course = sampleAppSensorService.course;

      // Specific to the Navigation Event - the location where the user navigated from
      var navigatedFromObj = sampleAppSensorService.courseHomePage;

      // Event starteAtTime
      var currentTimeMillis = (new Date()).getTime();

      // Create the Navigation Event
      var navigationEvent = new Caliper.Events.NavigationEvent();
      navigationEvent.setActor(actor);
      navigationEvent.setAction(action);
      navigationEvent.setObject(eventObj);
      navigationEvent.setTarget(targetObj);
      navigationEvent.setEdApp(edApp);
      navigationEvent.setGroup(course);
      navigationEvent.setStartedAtTime(currentTimeMillis);
      navigationEvent.setNavigatedFrom(navigatedFromObj);

      console.log('created navigation event %O', navigationEvent);

      $scope.currentEventType = 'Navigation Event';
      $scope.currentEvent = navigationEvent;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(navigationEvent);
    };

    // Annotation Event
    $scope.addTagsToPage = function(tags) {

      // The Actor for the Caliper Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Caliper Event
      var action = Caliper.Actions.AnnotationActions.TAGGED;

      // The Object being interacted with by the Actor
      var eventObj = sampleAppSensorService.readingFrame;

      // The generated object (Tag annotation)
      var generatedAnnotation = new Caliper.Entities.TagAnnotation("https://imsglobal.org/sampleCaliperApp/tags/7654");
      generatedAnnotation.setTags(tags);
      generatedAnnotation.setDateCreated(new Date().getTime());

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var course = sampleAppSensorService.course;

      // Event startedAtTime
      var currentTimeMillis = (new Date()).getTime();

      // Create the Annotation Event
      var tagAnnotationEvent = new Caliper.Events.AnnotationEvent();
      tagAnnotationEvent.setActor(actor);
      tagAnnotationEvent.setAction(action);
      tagAnnotationEvent.setObject(eventObj);
      tagAnnotationEvent.setGenerated(generatedAnnotation);
      tagAnnotationEvent.setEdApp(edApp);
      tagAnnotationEvent.setGroup(course);
      tagAnnotationEvent.setStartedAtTime(currentTimeMillis);

      console.log('created annotation event %O', tagAnnotationEvent);

      $scope.currentEventType = 'Annotation Event';
      $scope.currentEvent = tagAnnotationEvent;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(tagAnnotationEvent);
    };

    // Quiz Start Event
    $scope.startQuiz = function() {

      // The Actor for the Caliper Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Caliper Event
      var action = Caliper.Actions.AssessmentActions.STARTED;

      // The Object being interacted with by the Actor
      var quizObject = sampleAppSensorService.quiz;

      // The target object (frame) within the Event Object
      var targetObj = null;

      // Event startedAtTime
      var currentTimeMillis = (new Date()).getTime();

      // The generated object (Attempt) within the Event Object
      var generatedAttempt = new Caliper.Entities.Attempt("https://some-university.edu/deptOfPhysics/2014/physics101/assessment1/attempt1");
      generatedAttempt.setName(null);
      generatedAttempt.setDescription(null);
      generatedAttempt.setActor(actor['@id']);
      generatedAttempt.setAssignable(quizObject['@id']);
      generatedAttempt.setDateCreated(currentTimeMillis);
      generatedAttempt.setDateModified(null);
      generatedAttempt.setCount(1);
      generatedAttempt.setStartedAtTime(currentTimeMillis);
      generatedAttempt.setEndedAtTime(null);
      generatedAttempt.setDuration(null);

      $scope.currentAttempt = generatedAttempt; // set so that submit quiz event can reference

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var course = sampleAppSensorService.course;

      // Create the Assessment Event
      var assessmentEvent = new Caliper.Events.AssessmentEvent();
      assessmentEvent.setActor(actor);
      assessmentEvent.setAction(action);
      assessmentEvent.setObject(quizObject);
      assessmentEvent.setTarget(targetObj);
      assessmentEvent.setGenerated(generatedAttempt);
      assessmentEvent.setEdApp(edApp);
      assessmentEvent.setGroup(course);
      assessmentEvent.setStartedAtTime(currentTimeMillis);

      console.log('created assessment event %O', assessmentEvent);

      $scope.currentEventType = 'Assessment Event (STARTED)';
      $scope.currentEvent = assessmentEvent;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(assessmentEvent);
    };

    // BOOTCAMP EXERCISE # 2: Quiz Submit Event
    $scope.submitQuizToSensor = function() {

      // Actor SUBMITTED Attempt for Quiz

      // The Actor for the Caliper Event 
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Caliper Event (Hint: Use AssessmentActions)
      var action = Caliper.Actions.AssessmentActions.SUBMITTED;

      // The target object within the Event Object (Hint: Current Quiz)
      var quizObject = sampleAppSensorService.quiz;

      // The generated object (Attempt) within the Event Object
      var generatedAttempt = new Caliper.Entities.Attempt("https://some-university.edu/deptOfPhysics/2014/physics101/assessment1/attempt1");
      generatedAttempt.setName(null);
      generatedAttempt.setDescription(null);
      generatedAttempt.setActor(actor['@id']);
      generatedAttempt.setAssignable(quizObject['@id']);
      generatedAttempt.setDateCreated(currentTimeMillis);
      generatedAttempt.setDateModified(null);
      generatedAttempt.setCount(1);
      generatedAttempt.setStartedAtTime(currentTimeMillis);
      generatedAttempt.setEndedAtTime(null);
      generatedAttempt.setDuration(null);

      // The Object being interacted with by the Actor (Hint: CurrentAttempt)
      var currentAttempt = generatedAttempt;

      // Event starteAtTime
      var currentTimeMillis = (new Date()).getTime();

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var course = sampleAppSensorService.course;

      // Create the Assessment Event (Uncomment and set references to objects)
      var assessmentEvent = new Caliper.Events.AssessmentEvent();
      assessmentEvent.setActor(actor);
      assessmentEvent.setAction(action);
      assessmentEvent.setObject(generatedAttempt);
      assessmentEvent.setTarget(quizObject);
      assessmentEvent.setEdApp(edApp);
      assessmentEvent.setGroup(course);
      assessmentEvent.setStartedAtTime(currentTimeMillis);

      // console.log('created assessment event %O', assessmentEvent);

      $scope.currentEventType = 'Assessment Event (SUBMITTED)';
      $scope.currentEvent = assessmentEvent;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(assessmentEvent);
    };

    $scope.gradeQuiz = function() {
      
      console.log("##########Sending Outcome Event");

      // The Actor for the Caliper Event 
      var actor = sampleAppSensorService.edApp;

      // The Action for the Caliper Event (Hint: Use AssessmentActions)
      var action = Caliper.Actions.OutcomeActions.GRADED;
      
      var quizObject = sampleAppSensorService.quiz;

      // The object (Attempt) within the Event Object
      var generatedAttempt = new Caliper.Entities.Attempt("https://some-university.edu/deptOfPhysics/2014/physics101/assessment1/attempt1");
      generatedAttempt.setName(null);
      generatedAttempt.setDescription(null);
      generatedAttempt.setActor(actor['@id']);
      generatedAttempt.setAssignable(quizObject['@id']);
      generatedAttempt.setDateCreated(currentTimeMillis);
      generatedAttempt.setDateModified(null);
      generatedAttempt.setCount(1);
      generatedAttempt.setStartedAtTime(currentTimeMillis);
      generatedAttempt.setEndedAtTime(null);
      generatedAttempt.setDuration(null);

      // The generated object (Result)
      var result = new Caliper.Entities.Result("http://some-university.edu/deptOfPhysics/2014/result/12345", "a fake type");

      // Event starteAtTime
      var currentTimeMillis = (new Date()).getTime();

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var course = sampleAppSensorService.course;

      // The Outcome Event
      var outcomeEvent = new Caliper.Events.OutcomeEvent();
      outcomeEvent.setActor(actor);
      outcomeEvent.setAction(action);
      outcomeEvent.setObject(generatedAttempt);
      outcomeEvent.setGenerated(result);
      outcomeEvent.setEdApp(edApp);
      outcomeEvent.setGroup(course);
      outcomeEvent.setStartedAtTime(currentTimeMillis);

      $scope.currentEventType = 'Outcome Event (GRADED)';
      $scope.currentEvent = outcomeEvent;

      // Send the event (check RequestBin for event JSON)
      sampleAppSensorService.send(outcomeEvent);
    };

    $scope.init();
  }
]);