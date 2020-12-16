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

export function deleteSubject(id) {
    return new Promise((resolve, reject) => {
        delete subjects[id];
        writeFile(subjectFile, subjects).then((c) => {
            resolve(subjects);
        }).catch((err) => {
            reject(err);
        })    
    })
}

export function addExercise(id, index, points, max) {
    subjects[id].exercises[parseInt(index)] = [parseFloat(points), parseFloat(max)];
    return new Promise((resolve, reject) => {
        writeFile(subjectFile, subjects).then((c) => {
            resolve(subjects[id]);
        }).catch((err) => {
            reject(err);
        })
    });
}

export function deleteExercise(id, index) {
    return new Promise((resolve, reject) => {
        subjects[id].exercises.splice(index, 1);
        writeFile(subjectFile, subjects).then((c) => {
            resolve(subjects[id]);
        }).catch((err) => {
            reject(err);
        })    
    })
}

export function changeExercisePoints(id, index, newPoints, newMax) {
    subjects[id].exercises[parseInt(index)] = [parseFloat(newPoints), parseFloat(newMax)];
    return new Promise((resolve, reject) => {
        writeFile(subjectFile, subjects).then((c) => {
            resolve(subjects[id]);
        }).catch((err) => {
            reject(err);
        })
    });
}

export function initialize() {
    if(config === undefined || subjects === undefined) {
        console.log("Loading files...");
        let configLoad = load(configFile, "config", initialConfig);
        let subjectLoad = load(subjectFile, "subjects", initialSubjects);

        return new Promise((resolve, reject) => {
            configLoad.then((con) => {
                config = con;
                subjectLoad.then((sub) => {
                    subjects = sub;
                    resolve({
                        config,
                        subjects
                    });
                }).catch(err => {console.log(err); reject(err)});
            }).catch(err => {console.log(err); reject(err)});
        });
    } else {
        console.log("Already loaded.");
        return new Promise((resolve, reject) => {
            resolve({
                config,
                subjects
            });
        });
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
            number: newAnzahl,
            exercises: [
                [12.0, 20.0],
                [5.5, 8.5],
                [13.0, 37.0],
                [15.0, 25.0],
                [5.8, 12.5],
                [40.0, 20.0],
                [22, 21.5]
            ]
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