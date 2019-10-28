# Create PG Report

Report generator using create-react-app

## Creating a Report

### Using NPX

```sh
npx https://github.com/FIT4Software/create-pg-report.git report-name
```

### Using NPM

#### Install

```sh
npm install --save https://github.com/FIT4Software/create-pg-report.git -g
```

#### Create a Report

```sh
create-pg-report report-name
```

## Translation by DB

To configure the translation by DB make the next steps:

1- Go to .env file in the root path of the generated proyect and set the report name in the variable "REACT_APP_REPORT_NAME"

2- Go to the database and add the translation json file of the report in the table "Translations" of database "OpsDataStore"
