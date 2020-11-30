import * as FileSystem from 'expo-file-system';

const dir = FileSystem.documentDirectory;
const configFile = dir + "config.json";
const subjectFile = dir + "subjects.json";

const initialConfig = {"idCount": 0};
const initialSubjects = {};

let config;
let subjects;

function readFile(filename) {
    return FileSystem.readAsStringAsync(filename, { encoding: FileSystem.EncodingType.UTF8});
}

function writeFile(filename, jsonContent) {
    return FileSystem.writeAsStringAsync(filename, JSON.stringify(jsonContent), { encoding: FileSystem.EncodingType.UTF8});
}

function resetAll() {
    FileSystem.deleteAsync(configFile);
    FileSystem.deleteAsync(subjectFile);
}

export function initialize() {
    if(config === undefined || subjects === undefined) {
        console.log("Loading files...");
        load(configFile, "config", initialConfig).then((c) => {config = c;}).catch(err => console.log(err));
        load(subjectFile, "subjects", initialSubjects).then((c) => {subjects = c; console.log(subjects)}).catch(err => console.log(err));
    } else {
        console.log("Already loaded.");
    }
}

function load(file, title, defaultContent) {
    return new Promise((resolve, reject) => {
        FileSystem.getInfoAsync(file).then(f => {
            if(f.exists) {
                let p = readFile(file);
                p.then((c) => {
                    resolve(JSON.parse(c));
                    console.log("Loaded " + title + " successfully");
                }).catch(() => {
                    reject("Error while reading " + title + ". Path: " + file);
                });
            } else {
                let p = writeFile(file, defaultContent);
                p.then((c) => {
                    resolve(defaultContent);
                    console.log("Created " + title);
                }).catch(() => {
                    reject("Error while writing " + title + ". Path: " + file);
                });
            }
        })
    });
}

export function titleExists(t) {
    t = t.trim().toLowerCase();
    for(let x in subjects) {
        if(x.toLowerCase() === t) {
            return true;
        }
    }
    return false;
}

export function addSubject(newTitle, newProzent, newAnzahl) {
    newTitle = newTitle.trim();
    if(titleExists(newTitle)) return false;
    newProzent = parseInt(newProzent);
    newAnzahl = parseInt(newAnzahl);

    let newId = config.idCount;
    
    return new Promise((resolve, reject) => {
        subjects[newId] = {
            title: newTitle,
            needed: newProzent,
            number: newAnzahl 
        };
        let p = writeFile(subjectFile, subjects);
        p.then((c) => {
            resolve(subjects);
            console.log("Created subject with title " + newTitle);
            config.idCount = newId + 1;
            let p = writeFile(configFile, config);
            p.then((c) => {
                console.log("Incremented subject count to " + config.idCount);
            }).catch(() => {
                reject("Error while writing to to " + configFile + "\nError: " + err);
            })
        }).catch((err) => {
            reject("Error while writing to " + subjectFile + "\nError: " + err);
        });
    });
}