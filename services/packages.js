const editJsonFile = require("edit-json-file");
const extraDependencies = [
  "axios",
  "devextreme",
  "devextreme-react",
  "@progress/kendo-data-query",
  "@progress/kendo-react-excel-export",
  "file-saver",
  "i18next",
  "i18next-browser-languagedetector",
  "i18next-xhr-backend",
  "jwt-decode",
  "moment",
  "node-sass",
  "normalize.css",
  "react-addons-shallow-compare",
  "react-fa",
  "react-i18next@9.0.10",
  "react-multiselect-box",
  "rxjs",
  "redux",
  "react-redux",
  "redux-thunk",
  "redux-devtools-extension"
];

const installPackages = (appDirectory, shell) => {
  return new Promise(resolve => {
    console.log(`\nInstalling ${extraDependencies.join(" ")}\n`.cyan);
    shell.exec(
      `npm install --save ${extraDependencies.join(" ")} --loglevel info`,
      { cwd: appDirectory },
      () => {
        console.log("\nFinished installing packages\n".green);
        resolve();
      }
    );
  });
};

const editPackageJSON = appDirectory => {
  return new Promise(resolve => {
    let file = editJsonFile(`${appDirectory}/package.json`);
    file.set("homepage", "./");
    file.set("proxy", "http://localhost/iODSReports/");
    file.save(() => resolve());
  });
};

module.exports = {
  editPackageJSON,
  installPackages
};
