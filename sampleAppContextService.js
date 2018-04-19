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
        id: "https://www.umich.edu/staff/arwhyte",
        dateCreated: decrementDate(new Date(), 45)
      });
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
    };
    
    // Get the current Reading
    var getReading = function() {
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.Document, {
        id: "https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)", // TODO change URL
        name: "States of Matter - A Condensed History",
        version: "1.0",
        dateCreated: decrementDate(new Date(), 14),
        dateModified: decrementDate(new Date(), 7)
      });
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
    };
    
    // Get the current edApp
    var getEdApp = function() {
      return Caliper.Entities.EntityFactory().create(Caliper.Entities.SoftwareApplication, {
        id: "https://imsglobal.org/sampleCaliperApp",
        name: "Sample Caliper App",
        dateCreated: decrementDate(new Date(), 30)
      });
    };
    
    // Get the current Course
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
        roles: [Caliper.Entities.Role.learner.term],
        status: Caliper.Entities.Status.active.term,
        dateCreated: decrementDate(new Date(), 21)
      });
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