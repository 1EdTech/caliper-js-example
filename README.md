# IMS Global caliper-js-example sample app
This is a sample application that utilizes the IMS Global Javascript sensor 
_caliper-js_, a Javascript client for [Caliper](http://www.imsglobal.org) that 
provides an implementation of the Caliper SensorAPI™.  This is a toy 
application modeled as a simple course delivery app that provides a syllabus, 
reading to annotate and quiz.

## Branches
* __master__: stable, deployable branch that stores the official release history.  
* __develop__: unstable development branch.  Current work that targets a future release is merged to this branch.

## Tags
*caliper-js-example* releases are tagged and versioned MAJOR.MINOR
.PATCH\[-label\] 
(e.g., 1.2.0).  Pre-release tags are identified with an extensions label (e.g., "1.2.0-RC01").  The tags are stored in this repository.

## Prerequisites
* Familiarity with Javascript
* Familiarity with AngularJS (or at least an understanding of MVC)

## Creating a Test Endpoint
One option is to use Runscope's [RequestBin](https://github.com/Runscope/requestbin/blob/master/README.md).
Previously Runscope provided a public version of the service but has since 
discontinued it due to "ongoing abuse".  However, one can set up a 
self-hosted instance of RequestBin using Heroku.  If you use a Mac, do 
the following:

1. Sign up for a free Heroku [account](https://signup.heroku.com/).
2. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

    ```
    $ brew install heroku/brew/heroku

    $ heroku --version
    heroku-cli/6.16.14-583e9cb (darwin-x64) node-v9.10.1
    ```

3. Create a local directory for the RequestBin source code then clone the 
Github repo:

    ```
    $ git clone git://github.com/Runscope/requestbin.git

    ```  

4. From your local RequestBin project directory create a Heroku application, 
including adding Heroku's Redis addon and setting the the REALM environment 
variable to production:

    ```
    $ heroku login
    $ heroku create
    $ heroku addons:add heroku-redis
    $ heroku config:set REALM=prod
    ```

5. Do a Git push to deploy to Heroku and return a URL to your private 
RequestBin instance:

    ```
    $ git push heroku master
    ... 
    https://some_random_subdomain.herokuapp.com/ deployed to Heroku
    ```

## Provide HTTP Request Header Field Values
In caliper-js-example's _sampleAppContextService.js_ uncomment the 
`options` variable and define, minimally, the endpoint `uri` value.

```
var options = {
      uri: 'https://some_random_subdomain.herokuapp.com/123abc12',
      withCredentials: false,
      headers: {
        "Authorization": "Y2FsaXBlcnYxcDFib290Y2FtcDIwMTc=", <-- optional Bearer Token
        "Content-Type": "application/json"
      },
      method: "POST"
    };
```

## Running the Demo
Run an HTTP server or drop the code into a [Plunker](https://plnkr.co/) 
instance.  On a Mac or Linux box you can run Python's _SimpleHTTServer_ by 
executing the following command:

```
$ python -m SimpleHTTPServer 9999
```

Then in a web browser, navigate to http://localhost:9999/index.html.  Remember 
to enable CORS in the browser before running the demo.

## License
This project is licensed under the terms of the GNU Lesser General Public 
License (LGPL), version 3.  See the [LICENSE](./LICENSE) file for details.

©2018 IMS Global Learning Consortium, Inc. All Rights Reserved.
Trademark Information - http://www.imsglobal.org/copyright.html