# IMS Global Caliper Analytics &#0153; Sample Application

Sample application that utilizes the IMS Global Javascript sensor (caliper-js).

This application leverages the IMS Global Caliper information model and Caliper Javascript sensor (caliper-js) in order to generate a sequence of Caliper events.

The application is modeled as a simple course delivery app that provides a syllabus, reading to annotate and quiz.

### Prerequisites:
* Familiarity with Javascript
* Familiarity with AngularJS (or at least an understanding of MVC)

### To run / use:
* You need to run an HTTP server... for e.g. on a Mac or Linux box you could execute the following command
```
> python -m SimpleHTTPServer 9999
```
* Then in a web browser, navigate to http://localhost:9999/index.html

### Instructions for Caliper Bootcamp or for Developers looking to test out caliper-js capabilities:
1. **Fork**: create a copy of the sample app by clicking the *Fork* button.
2. **Update**: if required, update index.html, line 16, with the URL of the caliper-js library (URL to be provided by bootcamp facilitators).
3. **RequestBin**: visit http://requestb.in and create a new requestbin. This will serve as a target endpoint for sending events for review/inspection.
4. **Path**: update the sensor.initialize() path attribute in sampleAppSensorService.js, line 39 with your RequestBin id.
5. **Preview**: click the plunk eye icon (vertical menu) to view the sample app.
6. **Run**: click the Plunk *Run* button.
7. **Refresh**: refresh your RequestBin page.  It should display events emitted by the caliper-js sensor as you interact with the sample app.

### Bootcamp Exercises:

#### Caliper Bootcamp Exercise #1 - Add missing Tag Annotation event properties
* Insert missing event properties for a user tagging a reading.
* **app.js**: you will need to fill in the function ```$scope.addTagsToPage()```

#### Caliper Bootcamp Exercise #2 - add a quiz submission event
* Build a quiz submitted event indicating that a user submitted a quiz attempt
* **app.js**: you will need to fill in the function ```$scope.submitQuiz()```

#### Caliper Bootcamp Exercise #3 - add a quiz outcome event
* Build a quiz outcome event that simulates an auto-graded quiz event
* **app.js**: you will need to create a new function ```$scope.gradeQuiz()```

&copy; 2015 IMS Global Learning Consortium, Inc. All  Rights Reserved.

&#0153; [Trademark  Information](a href="http://www.imsglobal.org/copyright.html")