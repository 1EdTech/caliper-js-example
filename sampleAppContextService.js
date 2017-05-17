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
 * Sample App Context Service
 *
 * This service wraps the caliper-js sensor and provides a set of sample Caliper 
 * entities
 *
 * @author: Prashant Nayak, Intellify Learning; Anthony Whyte, University of Michigan
 */
angular.module('sampleCaliperApp')
  .service('sampleAppContextService', function() {

    const BASE_IRI = "https://example.edu";
    const COURSE_IRI = BASE_IRI + "/deptOfPhysics/2017/physics101";

    /**
     * Decrement date by n days in order to create faux historical dates for entities.
     * @param date
     * @param decrement
     */
    var decrementDate = function(date, decrement) {
      date.setDate(date.getDate() - decrement);
      return date.toISOString();
    };

    /**
     * Increment date by n days in order to create faux future dates for entities
     * @param date
     * @param increment
     */
    var incrementDate = function(date, increment) {
      date.setDate(date.getDate() + increment);
      return date.toISOString();
    };

    // Get the current user as a Caliper Actor
    var getUser = function() {
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.Person, {
        id: BASE_IRI + "/users/554433",
        dateCreated: decrementDate(new Date(), 45)
      });

      /**
      var actor = new Caliper.Entities.Person("https://example.edu/user/554433");
      actor.setDateCreated(decrementDate(new Date(), 45));
      return actor;
       */
    };

    // Get the Syllabus
    var getSyllabus = function() {
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.Document, {
        id: COURSE_IRI + "/syllabus",
        name: "Syllabus",
        version: "1.0",
        dateCreated: decrementDate(new Date(), 14),
        dateModified: decrementDate(new Date(), 7)
      });

      /**
      var syllabus = new Caliper.Entities.DigitalResource("https://example.edu/deptOfPhysics/2017/physics101/syllabus");
      syllabus.setName("Syllabus");
      syllabus.setVersion("1.0");
      syllabus.setDateCreated(decrementDate(new Date(), 14));
      syllabus.setDateModified(decrementDate(new Date(), 7));
      return syllabus;
       */
    };

    // Get the current Reading
    //var ePub = {};
    var getReading = function() {
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.Document, {
        id: "https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)", // TODO change URL
        name: "States of Matter - A Condensed History",
        version: "1.0",
        dateCreated: decrementDate(new Date(), 14),
        dateModified: decrementDate(new Date(), 7)
      });

      /**
      ePub = new Caliper.Entities.EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
      ePub.setName("States of Matter - A Condensed History");
      ePub.setVersion("1.0");
      ePub.setDateCreated(decrementDate(new Date(), 14));
      ePub.setDateModified(decrementDate(new Date(), 7));
      return ePub;
       */
    };

    var getReadingFrame = function() {
      var reading = getReading();
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.Frame, {
        id: "https://github.com/readium/readium-js-viewer/book/frame/34843#epubcfi(/4/3/1)", // TODO change URL
        name: "Introduction to the states of matter",
        index: 1,
        isPartOf: reading,
        version: reading.version,
        dateCreated: reading.dateCreated,
        dateModified: reading.dateModified
      });

      /**
      var ePubFrame = new Caliper.Entities.Frame("https://github.com/readium/readium-js-viewer/book/frame/34843#epubcfi(/4/3/1)");
      ePubFrame.setName("Introduction to the states of matter");
      ePubFrame.setIndex(1);
      ePubFrame.setIsPartOf(ePub);
      ePubFrame.setVersion(ePub.version);
      ePubFrame.setDateCreated(ePub.dateCreated);
      ePubFrame.setDateModified(ePub.dateModified);
      return ePubFrame;
       */
    };

    // Get the current edApp
    var getEdApp = function() {
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.SoftwareApplication, {
        id: "https://imsglobal.org/sampleCaliperApp",
        name: "Sample Caliper App",
        dateCreated: decrementDate(new Date(), 30)
      });

      /**
      var edApp = new Caliper.Entities.SoftwareApplication("https://imsglobal.org/sampleCaliperApp");
      edApp.setName("Sample Caliper App");
      edApp.setDateCreated(decrementDate(new Date(), 30));
      return edApp;
       */
    };

    // Get the current Course
    // var org = {};
    var getCourse = function() {
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.CourseSection, {
        id: COURSE_IRI,
        courseNumber: "Phy-101",
        academicSession: "Fall-2017",
        name: "Introductory Physics",
        description: "This is a Physics course for beginners.",
        dateCreated: decrementDate(new Date(), 30),
        dateModified: decrementDate(new Date(), 28)
      });

      /**
      org = new Caliper.Entities.CourseSection("https://example.edu/deptOfPhysics/2017/physics101");
      org.setCourseNumber("Phy-101");
      org.setName("Introductory Physics");
      org.setDescription("This is a Physics course for beginners.");
      org.setAcademicSession("Fall-2015");
      org.setDateCreated(decrementDate(new Date(), 30));
      org.setDateModified(decrementDate(new Date(), 28));
      return org;
       */
    };

    // Get the membership
    var getMembership = function() {
      var member = getUser();
      var organization = getCourse();

      return Caliper.Entities.EntityFactory().create(Caliper.Entities.Membership, {
        id: COURSE_IRI + "/roster/554433",
        description: "Roster entry",
        member: member,
        organization: organization,
        roles: [Caliper.Entities.Role.LEARNER],
        status: Caliper.Entities.Status.ACTIVE,
        dateCreated: decrementDate(new Date(), 21)
      });

      /**
      var membership = new Caliper.Entities.Membership("https://example.edu/deptOfPhysics/2017/physics101/roster/554433");
      membership.setDescription("Roster entry");
      membership.setMember(member['@id']);
      membership.setOrganization(course['@id']);
      membership.setRoles([Caliper.Entities.Role.LEARNER]);
      membership.setStatus(Caliper.Entities.Status.ACTIVE);
      membership.setDateCreated(decrementDate(new Date(), 21));
      return membership;
       */
    };

    // Get Home Page for current Course
    var getCourseHomePage = function() {
      var course = getCourse();
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.WebPage, {
        id: BASE_IRI + "/Physics101-Course-Homepage",
        name: "Physics101-Course-Homepage",
        isPartOf: course,
        dateCreated: decrementDate(new Date(), 28),
        dateModfied: decrementDate(new Date(), 25)
      });

      /**
      var courseHomePage = new Caliper.Entities.WebPage("Physics101-Course-Homepage");
      courseHomePage.setName("Physics101-Course-Homepage");
      courseHomePage.setIsPartOf(org);
      courseHomePage.setDateCreated(decrementDate(new Date(), 28));
      courseHomePage.setDateModified(decrementDate(new Date(), 25));
      return courseHomePage;
       */
    };

    // Get Quiz Page for current Course
    var getQuizPage = function() {
      var course = getCourse();
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.WebPage, {
        id: BASE_IRI + "/Physics101-Course-QuizPage",
        name: "Physics101-Course-QuizPage",
        isPartOf: course,
        dateCreated: decrementDate(new Date(), 28),
        dateModified: decrementDate(new Date(), 25)
      });

      /**
      var quizPage = new Caliper.Entities.WebPage("Physics101-Course-QuizPage");
      quizPage.setName("Physics101-Course-QuizPage");
      quizPage.setIsPartOf(org);
      quizPage.setDateCreated(decrementDate(new Date(), 28));
      quizPage.setDateModified(decrementDate(new Date(), 25));
      return quizPage;
       */
    };

    // Get Quiz
    var getQuiz = function() {
      var course = getCourse();
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.Assessment, {
        id: COURSE_IRI + "/assessment1",
        name: "States of Matter - Assessment",
        isPartOf: course,
        dateCreated: decrementDate(new Date(), 28),
        dateModified: decrementDate(new Date(), 27),
        datePublished: decrementDate(new Date(), 14),
        dateToActivate: decrementDate(new Date(), 13),
        dateToShow: decrementDate(new Date(), 12),
        dateToStartOn: incrementDate(new Date(), 7),
        dateToSubmit: incrementDate(new Date(), 14),
        maxAttempts: 2,
        maxSubmits: 2,
        maxScore: 3.0
      });

      /**
       var quiz = new Caliper.Entities.Assessment("https://example.edu/deptOfPhysics/2017/physics101/assessment1");
       quiz.setName("States of Matter - Assessment");
       quiz.setIsPartOf("https://some-university.edu/deptOfPhysics/2017/physics101");
       quiz.setDateCreated(decrementDate(new Date(), 28));
       quiz.setDateModified(decrementDate(new Date(), 27));
       quiz.setDatePublished(decrementDate(new Date(), 14));
       quiz.setDateToActivate(decrementDate(new Date(), 13));
       quiz.setDateToShow(decrementDate(new Date(), 12));
       quiz.setDateToStartOn(incrementDate(new Date(), 7));
       quiz.setDateToSubmit(incrementDate(new Date(), 14));
       quiz.setMaxAttempts(2);
       quiz.setMaxSubmits(2);
       quiz.setMaxScore(3.0);

       return quiz;
       */
    };

    // Get Quiz item
    var getQuizItem = function() {
      var quiz = getQuiz();
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.AssessmentItem, {
        id: COURSE_IRI + "/assessment1/item1",
        name: "Assessment Item 1",
        isPartOf: quiz,
        maxAttempts: quiz.maxAttempts,
        maxSubmits: quiz.maxSubmits,
        maxScore: 1.0,
        dateCreated: quiz.dateCreated,
        dateModified: quiz.dateModified
      });

      /**
      // The Quiz has one AssessmentItem
      var assessmentItem1 = new Caliper.Entities.AssessmentItem("https://example.edu/deptOfPhysics/2017/physics101/assessment1/item1");
      assessmentItem1.setName("Assessment Item 1");
      assessmentItem1.setIsPartOf("https://example.edu/deptOfPhysics/2017/physics101/assessment1");
      assessmentItem1.setMaxAttempts(2);
      assessmentItem1.setMaxSubmits(2);
      assessmentItem1.setMaxScore(1.0);
      assessmentItem1.setDateCreated(quiz.dateCreated);
      assessmentItem1.setDateModified(quiz.dateModified);

      return quiz;
       */
    };

    // Export the functions that will be used by other controllers and services
    var exports = {
      getUser: getUser,
      getSyllabus: getSyllabus,
      getReading: getReading,
      getReadingFrame: getReadingFrame,
      getEdApp: getEdApp,
      getCourse: getCourse,
      getMembership: getMembership,
      getCourseHomePage: getCourseHomePage,
      getQuizPage: getQuizPage,
      getQuiz: getQuiz,
      getQuizItem: getQuizItem
    };

    return exports;
  });