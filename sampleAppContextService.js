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
      var actor = new Caliper.Entities.Person("https://example.edu/user/554433");
      actor.setDateCreated(decrementDate(new Date(), 45));
      return actor;
    };

    // Get the current Reading
    var ePub = {};
    var getReading = function() {
      ePub = new Caliper.Entities.EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
      ePub.setName("States of Matter - A Condensed History");
      ePub.setVersion("1.0");
      ePub.setDateCreated(decrementDate(new Date(), 14));
      ePub.setDateModified(decrementDate(new Date(), 7));
      return ePub;
    };

    var getReadingFrame = function() {
      var ePubFrame = new Caliper.Entities.Frame("https://github.com/readium/readium-js-viewer/book/frame/34843#epubcfi(/4/3/1)");
      ePubFrame.setName("Introduction to the states of matter");
      ePubFrame.setIndex(1);
      ePubFrame.setIsPartOf(ePub);
      ePubFrame.setVersion(ePub.version);
      ePubFrame.setDateCreated(ePub.dateCreated);
      ePubFrame.setDateModified(ePub.dateModified);
      return ePubFrame;
    };

    // Get the current edApp
    var getEdApp = function() {
      var edApp = new Caliper.Entities.SoftwareApplication("https://imsglobal.org/sampleCaliperApp");
      edApp.setName("Sample Caliper App");
      edApp.setDateCreated(decrementDate(new Date(), 30));
      return edApp;
    };

    // Get the current Course
    var org = {};
    var getCourse = function() {
      org = new Caliper.Entities.CourseSection("https://example.edu/deptOfPhysics/2014/physics101");
      org.setCourseNumber("Phy-101");
      org.setName("Introductory Physics");
      org.setDescription("This is a Physics course for beginners.");
      org.setAcademicSession("Fall-2015");
      org.setDateCreated(decrementDate(new Date(), 30));
      org.setDateModified(decrementDate(new Date(), 28));
      return org;
    };

    // Get the membership 
    var getMembership = function() {
      var member = getUser();
      var course = getCourse();

      var membership = new Caliper.Entities.Membership("https://example.edu/deptOfPhysics/2014/physics101/roster/554433"); 
      membership.setDescription("Roster entry"); 
      membership.setMember(member['@id']); 
      membership.setOrganization(course['@id']); 
      membership.setRoles([Caliper.Entities.Role.LEARNER]); 
      membership.setStatus(Caliper.Entities.Status.ACTIVE); 
      membership.setDateCreated(decrementDate(new Date(), 21)); 
      return membership; 
    };

      // Get Web Page for current Course
    var getCourseHomePage = function() {
      var courseHomePage = new Caliper.Entities.WebPage("Physics101-Course-Homepage");
      courseHomePage.setName("Physics101-Course-Homepage");
      courseHomePage.setIsPartOf(org);
      courseHomePage.setDateCreated(decrementDate(new Date(), 28));
      courseHomePage.setDateModified(decrementDate(new Date(), 25));
      return courseHomePage;
    };

    // Get Quiz (Assessment) for current Course
    var getQuiz = function() {
      var quiz = new Caliper.Entities.Assessment("https://example.edu/deptOfPhysics/2014/physics101/assessment1");
      quiz.setName("States of Matter - Assessment");
      quiz.setIsPartOf("https://some-university.edu/deptOfPhysics/2014/physics101");
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

      // The Quiz has one AssessmentItem
      var assessmentItem1 = new Caliper.Entities.AssessmentItem("https://example.edu/deptOfPhysics/2014/physics101/assessment1/item1");
      assessmentItem1.setName("Assessment Item 1");
      assessmentItem1.setIsPartOf("https://example.edu/deptOfPhysics/2014/physics101/assessment1");
      assessmentItem1.setMaxAttempts(2);
      assessmentItem1.setMaxSubmits(2);
      assessmentItem1.setMaxScore(1.0);
      assessmentItem1.setDateCreated(quiz.dateCreated);
      assessmentItem1.setDateModified(quiz.dateModified);

      return quiz;
    };

    // Export the functions that will be used by other controllers and services
    var exports = {
      getUser: getUser,
      getReading: getReading,
      getReadingFrame: getReadingFrame,
      getEdApp: getEdApp,
      getCourse: getCourse,
      getMembership: getMembership,
      getCourseHomePage: getCourseHomePage,
      getQuiz: getQuiz
    };

    return exports;
  });