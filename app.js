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
      $scope.navigateToHomePage(); // Fire Navigation Event
      $scope.syllabusActive = true;
      $scope.readingActive = false;
      $scope.quizActive = false;
    };

    $scope.setReadingActive = function() {
      $scope.navigateToReadingPage(); // Fire Navigation Event
      $scope.readingActive = true;
      $scope.quizActive = false;
      $scope.syllabusActive = false;
    };

    $scope.setQuizActive = function() {
      $scope.navigateToQuizPage(); // Fire Navigation Event
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



    $scope.startSession = function() {
      // Actor LOGGED IN to edApp generating a new Session

      // Event identifier
      var id = "urn:uuid:d4618c23-d612-4709-8d9a-478d87808067";

      // The Actor for the Caliper Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Caliper Event (Hint: Use SessionActions)
      var action = Caliper.Actions.loggedIn.term;

      // The Object being interacted with by the Actor (edApp)
      var obj = sampleAppSensorService.edApp;

      // The edApp that is part of the Learning Context
      var edApp = obj;

      // Target
      var target = sampleAppSensorService.courseHomePage;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The actor's membership, roles and status
      var membership = sampleAppSensorService.membership;

      // The actor's session
      var sessionStart = new Date().toISOString();
      var session = Caliper.Entities.EntityFactory().create(Caliper.Entities.Session, {
        id: "https://imsglobal.org/sampleCaliperApp//session-123456789",
        name: "session-123456789",
        user: actor,
        dateCreated: sessionStart,
        startedAtTime: sessionStart
      });

      // Create the Session Event (Uncomment and set references to objects)
      var event = Caliper.Events.EventFactory().create(Caliper.Events.SessionEvent, {
        id: id,
        actor: actor,
        action: action,
        object: obj,
        eventTime: new Date().toISOString(),
        target: target,
        edApp: edApp,
        group: group,
        membership: membership,
        session: session
      });

      /**
      var event = new Caliper.Events.SessionEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setGenerated(generated);
      event.setTarget(target);
      event.setEdApp(edApp);
      event.setGroup(group);
      event.setMembership(membership);
      event.setEventTime(new Date().toISOString());
       */

      // console.log('created session event %O', event);

      $scope.currentEventType = 'Session Event (LOGGED IN)';
      $scope.currentEvent = event;

      // Send event
      var opts = {sensor: sampleAppSensorService.getId, data: event};
      var envelope = sampleAppSensorService.createEnvelope(opts);
      sampleAppSensorService.sendEnvelope(envelope);
    };

    // Navigation Event
    $scope.navigateToHomePage = function() {

      // Event identifier
      var id = "urn:uuid:0067a052-9bb4-4b49-9d1a-87cd43da488a";

      // The Actor for the Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Event
      var action = Caliper.Actions.navigatedTo.term;

      // The Object being interacted with by the Actor
      var obj = sampleAppSensorService.syllabus;

      // The target object within the Event Object
      var target = sampleAppSensorService.courseHomePage;

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The actor's membership, roles and status
      var membership = sampleAppSensorService.membership;

      // Referrer
      var referrer = sampleAppSensorService.courseHomePage;

      // Reset if target value exists
      if ($scope.currentEvent.target) {
        referrer = $scope.currentEvent.target;
      }

      if (target != sampleAppSensorService.courseHomePage) {
        referrer = sampleAppSensorService.courseHomePage;
      }

      // The actor's session
      var sessionStart = new Date().toISOString();
      var session = Caliper.Entities.EntityFactory().create(Caliper.Entities.Session, {
        id: "https://imsglobal.org/sampleCaliperApp//session-123456789",
        name: "session-123456789",
        user: actor,
        dateCreated: sessionStart,
        startedAtTime: sessionStart
      });

      // Create the Navigation Event
      var event = Caliper.Events.EventFactory().create(Caliper.Events.NavigationEvent, {
        id: id,
        actor: actor,
        action: action,
        object: obj,
        eventTime: new Date().toISOString(),
        target: target,
        referrer: referrer,
        edApp: edApp,
        group: group,
        membership: membership,
        session: session
      });

      // Create the Navigation Event
      /**
      var event = new Caliper.Events.NavigationEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setTarget(target);
      event.setEdApp(edApp);
      event.setGroup(group);
      event.setMembership(membership);
      event.setEventTime(new Date().toISOString());
       */

      // console.log('created navigation event %O', event);

      $scope.currentEventType = 'Navigation Event';
      $scope.currentEvent = event;

      // Send event
      var opts = {sensor: sampleAppSensorService.getId, data: event};
      var envelope = sampleAppSensorService.createEnvelope(opts);
      sampleAppSensorService.sendEnvelope(envelope);
    };

    // Exercise 1: add missing Navigation Event properties (Caliper.Actions.NavigationActions.NAVIGATED_TO)
    $scope.navigateToReadingPage = function() {

      // Event identifier
      var id = "urn:uuid:3bdab9e6-11cd-4a0f-9d09-8e363994176b";

      // The Actor for the Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Event
      var action = Caliper.Actions.navigatedTo.term;

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

      // Default referrer
      var referrer = sampleAppSensorService.courseHomePage;

      // Reset if target value exists
      if ($scope.currentEvent.target) {
        referrer = $scope.currentEvent.target;
      }

      // The actor's session
      var sessionStart = new Date().toISOString();
      var session = Caliper.Entities.EntityFactory().create(Caliper.Entities.Session, {
        id: "https://imsglobal.org/sampleCaliperApp//session-123456789",
        name: "session-123456789",
        user: actor,
        dateCreated: sessionStart,
        startedAtTime: sessionStart
      });

      // Create the Navigation Event
      /**
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
       */

      // console.log('created navigation event %O', event);

      $scope.currentEventType = 'Navigation Event';
      $scope.currentEvent = event;

      // Send event
      var opts = {sensor: sampleAppSensorService.getId, data: event};
      var envelope = sampleAppSensorService.createEnvelope(opts);
      sampleAppSensorService.sendEnvelope(envelope);
    };

    // Exercise 2: add an Annotation Event (Caliper.Actions.AnnotationActions.TAGGED)
    $scope.addTagsToPage = function(tags) {

      // Event identifier
      var id = "urn:uuid:b2009c63-2659-4cd2-b71e-6e03c498f02b";

      // The Actor for the Caliper Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Caliper Event
      var action = Caliper.Actions.tagged.term;

      // The Object being interacted with by the Actor
      var obj = sampleAppSensorService.readingFrame;

      // The generated object (Tag annotation)
      var generated = Caliper.Entities.EntityFactory().create(Caliper.Entities.TagAnnotation, {
        id: "https://imsglobal.org/sampleCaliperApp/tags/7654",
        annotator: actor,
        annotated: obj,
        tags: tags,
        dateCreated: new Date().toISOString()
      });

      // The generated object (Tag annotation)
      /**
      var generated = new Caliper.Entities.TagAnnotation("https://imsglobal.org/sampleCaliperApp/tags/7654");
      generated.setTags(tags);
      generated.setDateCreated(new Date().toISOString());
       */

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The actor's membership, roles and status
      var membership = sampleAppSensorService.membership;

      // The actor's session
      var sessionStart = new Date().toISOString();
      var session = Caliper.Entities.EntityFactory().create(Caliper.Entities.Session, {
        id: "https://imsglobal.org/sampleCaliperApp//session-123456789",
        name: "session-123456789",
        user: actor,
        dateCreated: sessionStart,
        startedAtTime: sessionStart
      });

      // Create the Annotation Event
      var event = Caliper.Events.EventFactory().create(Caliper.Events.AnnotationEvent, {
        id: id,
        actor: actor,
        action: action,
        object: obj,
        eventTime: new Date().toISOString(),
        edApp: edApp,
        group: group,
        membership: membership,
        session: session
      });

      // Create the Annotation Event
      /**
      var event = new Caliper.Events.AnnotationEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setGenerated(generated);
      event.setEdApp(edApp);
      event.setGroup(group);
      event.setMembership(membership);
      event.setEventTime(new Date().toISOString());
       */

      console.log('created annotation event %O', event);

      $scope.currentEventType = 'Annotation Event';
      $scope.currentEvent = event;

      // Send event
      var opts = {sensor: sampleAppSensorService.getId, data: event};
      var envelope = sampleAppSensorService.createEnvelope(opts);
      sampleAppSensorService.sendEnvelope(envelope);
    };

    // Navigation Event
    $scope.navigateToQuizPage = function() {

      // Event identifier
      var id = "urn:uuid:27734504-068d-4596-861c-2315be33a2a2";

      // The Actor for the Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Event
      var action = Caliper.Actions.navigatedTo.term;

      // The Object (Reading) being interacted with by the Actor
      var obj = sampleAppSensorService.quiz;

      // The target object within the Event Object
      var target = sampleAppSensorService.quizPage;

      // Default referrer
      var referrer = sampleAppSensorService.courseHomePage;

      // Reset if target value exists
      if ($scope.currentEvent.target) {
        referrer = $scope.currentEvent.target;
      }

      // Default navigation page
      //var navigatedFrom = sampleAppSensorService.courseHomePage;

      // Reset if target value exists
      /**
      if ($scope.currentEvent.target) {
        navigatedFrom = $scope.currentEvent.target;
      }
       */

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The actor's membership, roles and status
      var membership = sampleAppSensorService.membership;

      // The actor's session
      var sessionStart = new Date().toISOString();
      var session = Caliper.Entities.EntityFactory().create(Caliper.Entities.Session, {
        id: "https://imsglobal.org/sampleCaliperApp//session-123456789",
        name: "session-123456789",
        user: actor,
        dateCreated: sessionStart,
        startedAtTime: sessionStart
      });

      // Create the Navigation Event
      var event = Caliper.Events.EventFactory().create(Caliper.Events.NavigationEvent, {
        id: "id",
        actor: actor,
        action: action,
        object: obj,
        eventTime: new Date().toISOString(),
        target: target,
        referrer: referrer,
        edApp: edApp,
        group: group,
        membership: membership,
        session: session
      });

      // Create the Navigation Event
      /**
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
       */

      // console.log('created navigation event %O', event);

      $scope.currentEventType = 'Navigation Event';
      $scope.currentEvent = event;

      // Send event
      var opts = {sensor: sampleAppSensorService.getId, data: event};
      var envelope = sampleAppSensorService.createEnvelope(opts);
      sampleAppSensorService.sendEnvelope(envelope);
    };

    // Exercise 3: add a Quiz Start Event (Caliper.Actions.AssessmentActions.STARTED)
    $scope.startQuiz = function() {

      // Event identifier
      var id = "urn:uuid:dad88464-0c20-4a19-a1ba-ddf2f9c3ff33";

      // The Actor for the Caliper Event
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Caliper Event
      var action = Caliper.Actions.started.term;

      // The Object being interacted with by the Actor
      var obj = sampleAppSensorService.quiz;

      // The generated object (Attempt) within the Event Object
      var attemptDate = new Date().toISOString();
      var generated = Caliper.Entities.EntityFactory().create(Caliper.Entities.Attempt, {
        id: "https://some-university.edu/deptOfPhysics/2014/physics101/assessment1/attempt1",
        assignee: actor,
        assignable: obj,
        count: 1,
        dateCreated: attemptDate,
        startedAtTime: attemptDate
      });

      // The generated object (Attempt) within the Event Object
      /**
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
       */

      // Assign to scope object so that the submit quiz event can reference it
      $scope.currentAttempt = generated;

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The actor's membership, roles and status
      var membership = sampleAppSensorService.membership;

      // The actor's session
      var sessionStart = new Date().toISOString();
      var session = Caliper.Entities.EntityFactory().create(Caliper.Entities.Session, {
        id: "https://imsglobal.org/sampleCaliperApp//session-123456789",
        name: "session-123456789",
        user: actor,
        dateCreated: sessionStart,
        startedAtTime: sessionStart
      });

      // Create the Assessment Event
      var event = Caliper.Events.EventFactory().create(Caliper.Events.AssessmentEvent, {
        id: id,
        actor: actor,
        action: action,
        object: obj,
        eventTime: new Date().toISOString(),
        generated: generated,
        edApp: edApp,
        group: group,
        membership: membership,
        session: session
      });

      // Create the Assessment Event
      /**
      var event = new Caliper.Events.AssessmentEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setGenerated(generated);
      event.setEdApp(edApp);
      event.setGroup(group);
      event.setMembership(membership);
      event.setEventTime(new Date().toISOString());
       */

      // console.log('created assessment event %O', event);

      $scope.currentEventType = 'Assessment Event (STARTED)';
      $scope.currentEvent = event;

      // Send event
      var opts = {sensor: sampleAppSensorService.getId, data: event};
      var envelope = sampleAppSensorService.createEnvelope(opts);
      sampleAppSensorService.sendEnvelope(envelope);
    };

    // Exercise 4: add a Quiz Submit Event (Caliper.Actions.AssessmentActions.SUBMITTED)
    $scope.submitQuizToSensor = function() {

      // Actor SUBMITTED Quiz Attempt

      // Event identifier
      var id = "urn:uuid:e5891791-3d27-4df1-a272-091806a43dfb";

      // The Actor for the Caliper Event 
      var actor = sampleAppSensorService.currentUser;

      // The Action for the Caliper Event (Hint: Use AssessmentActions)
      var action = Caliper.Actions.submitted.term;

      // The object (Attempt) being submitted
      var obj = $scope.currentAttempt;
      obj.setEndedAtTime(new Date().toISOString());
      $scope.currentAttempt = obj;

      // The edApp that is part of the Learning Context
      var edApp = sampleAppSensorService.edApp;

      // The LIS Course Section for the Event (part of Learning Context)
      var group = sampleAppSensorService.course;

      // The actor's membership, roles and status
      var membership = sampleAppSensorService.membership;

      // The actor's session
      var sessionStart = new Date().toISOString();
      var session = Caliper.Entities.EntityFactory().create(Caliper.Entities.Session, {
        id: "https://imsglobal.org/sampleCaliperApp//session-123456789",
        name: "session-123456789",
        user: actor,
        dateCreated: sessionStart,
        startedAtTime: sessionStart
      });

      // Create the Assessment Event
      var event = Caliper.Events.EventFactory().create(Caliper.Events.AssessmentEvent, {
        id: id,
        actor: actor,
        action: action,
        object: obj,
        eventTime: new Date().toISOString(),
        edApp: edApp,
        group: group,
        membership: membership,
        session: session
      });

      // Create the Assessment Event (Uncomment and set references to objects)
      /**
      var event = new Caliper.Events.AssessmentEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setEdApp(edApp);
      event.setGroup(group);
      event.setMembership(membership);
      event.setEventTime(new Date().toISOString());
       */

      // console.log('created assessment event %O', event);

      $scope.currentEventType = 'Assessment Event (SUBMITTED)';
      $scope.currentEvent = event;

      // Send event
      var opts = {sensor: sampleAppSensorService.getId, data: event};
      var envelope = sampleAppSensorService.createEnvelope(opts);
      sampleAppSensorService.sendEnvelope(envelope);
    };

    // Exercise 5: add an Outcome Event (Caliper.Actions.OutcomeActions.GRADED)
    $scope.gradeQuiz = function() {

      // Event identifier
      var id  = "urn:uuid:04e27704-73bf-4d3c-912c-1b2da40aef8f";

      // The Actor/Scorer for the Caliper Event.  No Event.membership is set for this actor.
      var actor = sampleAppSensorService.edApp;

      // The Action for the Caliper Event (Hint: Use AssessmentActions)
      var action = Caliper.Actions.graded.term;

      // The object (Attempt) being submitted
      var obj = $scope.currentAttempt;

      var generated = Caliper.Events.EntityFactory().create(Caliper.Entities.Result, {
        id: obj.id + "/result/1235",
        attempt: obj,
        normalScore: 1.0, // TODO Render score dynamic
        penaltyScore: 0.0,
        extraCreditScore: 0.0,
        curvedTotalScore: 0.0,
        curveFactor: 0.0,
        totalScore: 1.0, // TODO Render score dynamic
        comment: "Caliper rocks!",
        scoredBy: actor,
        dateCreated: new Date().toISOString()
      });

      // The generated object (Result)
      /**
      var generated = new Caliper.Entities.Result(obj['@id'] + "/result/1235");
      generated.setActor(actor['@id']);
      generated.setAssignable(obj.assignable);
      generated.setDateCreated(new Date().toISOString());
      generated.setNormalScore(1.0); // TODO Render score dynamic
      generated.setPenaltyScore(0.0);
      generated.setExtraCreditScore(0.0);
      generated.setTotalScore(1.0);
      generated.setCurvedTotalScore(1.0);
      generated.setCurveFactor(0.0);
      generated.setComment("Caliper rocks!");
      generated.setScoredBy(actor);
       */

      // Create the OutcomeEvent
      var event = Caliper.Events.EventFactory().create(Caliper.Events.OutcomeEvent, {
        id: id,
        actor: actor,
        action: action,
        object: obj,
        eventTime: new Date().toISOString(),
        generated: generated
      });

      // The Outcome Event
      /**
      var event = new Caliper.Events.OutcomeEvent();
      event.setActor(actor);
      event.setAction(action);
      event.setObject(obj);
      event.setGenerated(generated);
      event.setEdApp(actor);
      event.setGroup(group);
      event.setEventTime(new Date().toISOString());
       */

      $scope.currentEventType = 'Outcome Event (GRADED)';
      $scope.currentEvent = event;

      // Send event
      var opts = {sensor: sampleAppSensorService.getId, data: event};
      var envelope = sampleAppSensorService.createEnvelope(opts);
      sampleAppSensorService.sendEnvelope(envelope);
    };

    $scope.init();
  }
]);