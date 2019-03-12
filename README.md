# Hospital Module
---
## Table of contents
- [About](#About)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Storing details in CSV](#storing-details-in-csv)
- [How to test](#how-to-test)
- [Changes made](#changes-made)
## About
This is the hospital module where the details of hospital can be entered and the hospital will be registered. After getting registered, the hospital authorities can login and add the details of the doctors.

Following doctor details are taken:
  - Name
  - Doctor id
  - Specialization
  - Availabe slot

The details of the hospital and doctor will be stored in the database under the collection names `hospitalsdata` and `doctorsdata` respectively.
## Installation
Git client and Node.js is required for this to work
```bash
# Clone this repository
$ https://github.com/akshat112/hospital-module.git

# Go into the repository
$ cd hospital-module

# Install dependencies
$ npm install

# Start mongo client
$ mongod

# Run the app
$ node index.js
```
## Dependencies

```
    "body-parser": "^1.18.3",
    "csv": "^5.1.1",
    "csv-writer": "^1.2.0",
    "ejs": "^2.6.1",
    "express": "^4.16.4",
    "fast-csv": "^2.4.1",
    "fs": "0.0.1-security",
    "mongodb": "^3.1.13"
```

## Storing data in CSV
For data to get stored in CSV, a file `doctors.csv` is made where following file header are set: `doctor_id` `doctor_name`	`specialization`	`free_from`	`free_to`	`hosp_id`
The csv file can be found in the root directory of the project

## How to use
After installing all the required node modules, the app is ready to run. Being in the root directory of the project, type
```
node index.js
```

The app will start listening in the port `3000`. Open up the browser and visit: http://localhost:3000/
The hospital registration and login page will will appear. Register with the hospital details and then login.
After logging in, add the details of the doctor and submit to see the results.

### Changes made
- Added fileds for doctor specialization, available from time and available to time.
- Added the feature where submitting the form with doctor details automatically updates the doctors.csv file and add the details of the doctor.
- Fixed the code where visiting `add_doctor` route automatically makes a blank entry in the database
- Fixed issue where even blank entries from the database are also visible

