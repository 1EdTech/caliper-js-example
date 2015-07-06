# IMS Global Caliper Analytics &#0153; Sample Application

Sample application that utilzes the Caliper Javascript sensor.

This application leverages the Caliper Metric Profiles to generate sequences of events.

The application is modeled as a simple Course delivery app, that delivers a syllabus, reading and quiz.


##### Prerequisites:
* Familiarity with Javascript
* Familiarity with AngularJS (or atleast an understanding of MVC)

### To run / use:
* You need to run a HTTP server... for e.g. on a Mac or Linux box you could execute the following command
```
> python -m SimpleHTTPServer 9999
```
* Then in a web browser, navigate to http://localhost:9999/index.html

### Instructions for Caliper Bootcamp or for Developers looking to test out caliper-js capabilities:

* Update line 16 in index.html with the URL of the caliper-js library (this will be provided to you by IMS)
* Create a new request bin that you will use to send/inspect Caliper Events during the bootcamp (http://requestb.in/)
* Update the 'path' attribute on line 39 in sampleAppSensorService.js with your request bin id
* Reload your browser
* Refresh the request bin page - you should see Caliper Events sent by the sample app as you navigate through the app.


### Bootcamp Exercises:

#### Caliper Bootcamp Exercise #1 - User Engagement (Logging in to application)
* Add a SessionEvent indicating user logging in to application to interact with course
* You will need to fill in the function $scope.startSession() in app.js

#### Caliper Bootcamp Exercise #2 - Quiz Submission 
* Add a Quiz Submitted event indicating user submitting an attempt on the quiz
* You will need to fill in the function $scope.submitQuiz() in app.js

#### Caliper Bootcamp Exercise #3 - [BONUS] Quiz Grading  
* Add a Quiz Graded event indicating system graded an attempt on the quiz
* You will need to create a new function $scope.gradeQuiz() in app.js

&copy; 2015 IMS Global Learning Consortium, Inc. All  Rights Reserved. 

&#0153; [Trademark  Information](a href="http://www.imsglobal.org/copyright.html")
