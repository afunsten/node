#!/usr/local/bin/node
/*jshint esversion: 6 */
// ./node_modules/jshint/bin/jshint ./lib/base.js
// eslint ./lib/base.js
const fs = require("fs");
const path = require('path');

const callback = err => {
    if (err) {throw err;}
};

module.exports.isArray = function(a) {
    // check if var is a array
    return (!!a) && (a.constructor === Array);
};

module.exports.isObject = function(a) {
    // check if var is a object
    return (!!a) && (a.constructor === Object);
};

module.exports.createDirectory = function(userDirectory) {
    //recursive create userDirectory
    if (fs.existsSync(userDirectory)) {
        //console.log(userDirectory + " directory already exists")
    } else {
        console.log("mkdir: " + userDirectory);
        fs.mkdirSync(userDirectory, { recursive: true });
        //fs.mkdir(userDirectory, callback)
    }
};

module.exports.writeJSONFile = function(filePath, userData) {
    // stringify a json object into a pretty file
    // test: node -e 'require("./base.js").writeJSONFile("./tests/testFile.json", []);'
    console.log("writeJSONFile: " + filePath);
    const userDirectory = path.dirname(filePath);
    exports.createDirectory(userDirectory);
    fs.writeFile(filePath, JSON.stringify(userData, null, 3), callback);
};

module.exports.readJSONFile = function(jsonFile) {
    // get a json object out of a file
    //node -e 'const fileContent = require("./base.js").readJSONFile("./tests/preview-cards/test-card.json"); console.log(fileContent)'
    let jsonData = require(jsonFile);
    return jsonData;
};

module.exports.listFilesWithExtension = function(userPath, userExtension) {
    //returns and Array of files matching a user defined (case insentive) file extension
    //test: node -e 'const jsonFileArray = require("./base.js").listFilesWithExtension("./tests/preview-cards", ".json"); console.log(jsonFileArray)'
    //example result: [ './tests/preview-cards//testService1-card copy.json', './tests/preview-cards//testService1-card.json' ]
    const files = fs.readdirSync(userPath);
    //console.log(files)
    var returnFileList = [];
    var EXTENSION = userExtension.toLowerCase();
    if (exports.isArray(files)) {
        files.filter(function(file) {
            if (path.extname(file).toLowerCase() === EXTENSION) {
                //console.log(file);
                returnFileList.push(`${userPath}/${file}`);
            }
        });
        //console.log(jsonFileList)
        return returnFileList;
    } else {
        return returnFileList;
    }
};

module.exports.listDirectoryFiles = function(directory) {
    //list every item in a directory; returns a list of sub lists
    //test: node -e 'require("./lib/base.js").listDirectoryFiles("./lib/tests");'
    var filesCollection = [];
    function readDirectorySynchronously(directory) {
        var currentDirectory = fs.readdirSync(directory, 'utf8');
        currentDirectory.forEach(file => {
            var pathOfCurrentItem = path.join(directory + '/' + file);
            if (fs.statSync(pathOfCurrentItem).isFile()) {
                filesCollection.push(pathOfCurrentItem);
            }
            else {
                var directorypath = path.join(directory + '/' + file);
                readDirectorySynchronously(directorypath);
            }
        });
        return filesCollection
    }
    var filesCollection=readDirectorySynchronously(directory);
    console.log(filesCollection)
    return filesCollection
};

module.exports.removeDir = function(userDirectory){
    //test: node -e 'require("./base.js").removeDir("./tests");'

    fs.rmdir(userDirectory, callback);
};

//console.log(exports)
