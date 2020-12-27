import * as FileSystem from 'expo-file-system';

const dir = FileSystem.documentDirectory;
const configFile = dir + "config.json"; // Configuration-file
const subjectFile = dir + "subjects.json"; // Subject-file
const settingsFile = dir + "settings.json"; // Settings-file

// Initial config when starting the app for the first time
const initialConfig = {
    "idCount": 0
};
// Initial subjects (none)
const initialSubjects = {};
// Initial settings
const initialSettings = {
    "lightTheme": true
};

let config; // Current config
let subjects; // Current Subjects

// Reads the given file and returns the promise
function readFile(filename) {
    return FileSystem.readAsStringAsync(filename, { encoding: FileSystem.EncodingType.UTF8});
}

// Writes to the given file and returns the promise
function writeFile(filename, jsonContent) {
    return FileSystem.writeAsStringAsync(filename, JSON.stringify(jsonContent), { encoding: FileSystem.EncodingType.UTF8});
}

// Deletes all stored files
function resetAll() {
    FileSystem.deleteAsync(configFile).then(r => console.log("Deleted config-file"));
    FileSystem.deleteAsync(subjectFile).then(r => console.log("Deleted subject-file"));
    FileSystem.deleteAsync(settingsFile).then(r => console.log("Deleted settings-file"));
}

// Deletes subject with the given id
export function deleteSubject(id) {
    return new Promise((resolve, reject) => {
        delete subjects[id]; // Deleting given subject from the list

        // Writing changed subject-list to the file
        writeFile(subjectFile, subjects).then((c) => {
            resolve(subjects);
        }).catch((err) => {
            reject(err);
        })    
    })
}

// Adds new exercise to subject with given id
export function addExercise(id, index, points, max) {
    subjects[id].exercises[parseInt(index)] = [parseFloat(points), parseFloat(max)]; // Adding exercise to the list

    // Returning updated subject
    return new Promise((resolve, reject) => {
        writeFile(subjectFile, subjects).then((c) => {
            resolve(subjects[id]);
        }).catch((err) => {
            reject(err);
        })
    });
}

// Deletes exercise from subject
export function deleteExercise(id, index) {
    return new Promise((resolve, reject) => {
        subjects[id].exercises.splice(index, 1); // Removing exercise from the list 

        // Returning updated subject
        writeFile(subjectFile, subjects).then((c) => {
            resolve(subjects[id]);
        }).catch((err) => {
            reject(err);
        })    
    })
}

// Changes points in an existing exercise
export function changeExercisePoints(id, index, newPoints, newMax) {
    subjects[id].exercises[parseInt(index)] = [parseFloat(newPoints), parseFloat(newMax)]; // Parsing new values to exercise

    // Returning updated subject 
    return new Promise((resolve, reject) => {
        writeFile(subjectFile, subjects).then((c) => {
            resolve(subjects[id]);
        }).catch((err) => {
            reject(err);
        })
    });
}

export function editSubject(id, title, percent, number) {
    let s = subjects[id];
    s["title"] = title;
    s["needed"] = percent;
    s["number"] = number;
    subjects[id] = s;

    return new Promise((resolve, reject) => {
        writeFile(subjectFile, subjects).then((c) => {
            resolve(subjects[id]);
        }).catch((err) => {
            reject(err);
        })
    });
}

// Returns list of subjects or undefined if called before files are loaded
export function getSubjectList() {
    return subjects;
}

// Loads files (if needed) and stores the values in the variables, returning the values
export function initialize() {
    // If file(s) need to be loaded
    if(config === undefined || subjects === undefined) {
        console.log("Loading files...");
        let configLoad = load(configFile, "config", initialConfig); // Loading config
        let subjectLoad = load(subjectFile, "subjects", initialSubjects); // Loading subjects

        // Returns config and subjects if successfull
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
        // Files are already loaded
        console.log("Already loaded.");

        // Returns config and subjects
        return new Promise((resolve, reject) => {
            resolve({
                config,
                subjects
            });
        });
    }
}

// Loads file and returns it's value, if file does not exist it creates the file and writes the defaultContent to it
function load(file, title, defaultContent) {
    return new Promise((resolve, reject) => {
        FileSystem.getInfoAsync(file).then(f => {
            // If file exists already
            if(f.exists) {
                let p = readFile(file); // Reading content of the file

                // Parsing content als JSON and returning the object
                p.then((c) => {
                    resolve(JSON.parse(c));
                    console.log("Loaded " + title + " successfully");
                }).catch(() => {
                    reject("Error while reading " + title + ". Path: " + file);
                });
            } else {
                // If file doesn't exist, write defaultContent to it
                let p = writeFile(file, defaultContent);

                // Returning defaultContent
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

// Checks if a title already exists
export function titleExists(t, currentTitle = "") {
    t = t.trim().toLowerCase();

    if(t === currentTitle.toLowerCase()) return false;

    for(let x in subjects) {
        if(subjects[x].title.toLowerCase() === t) {
            return true;
        }
    }
    return false;
}

// Adds new subject to the list
export function addSubject(newTitle, newProzent, newAnzahl) {
    newTitle = newTitle.trim(); // Removing whitespaces around the title

    // Returning if the title already exists (case-insensitive)
    if(titleExists(newTitle)) return false;

    // Parsing values
    newProzent = parseInt(newProzent);
    newAnzahl = parseInt(newAnzahl);

    let newId = config.idCount; // Next id
    
    return new Promise((resolve, reject) => {
        // Creating subject with given values and empty exercise-list
        subjects[newId] = {
            title: newTitle,
            needed: newProzent,
            number: newAnzahl,
            exercises: []
        };
        let p = writeFile(subjectFile, subjects); // Writing new subject to file

        // If writing was successful
        p.then((c) => {
            console.log("Created subject with title " + newTitle);
            config.idCount = newId + 1; // Incrementing id
            let p = writeFile(configFile, config); // Writing updated config to file

            // If successful, return the new subject-list
            p.then((c) => {
                console.log("Incremented subject count to " + config.idCount);
                resolve(subjects);
            }).catch(() => {
                reject("Error while writing to to " + configFile + "\nError: " + err);
            })
        }).catch((err) => {
            reject("Error while writing to " + subjectFile + "\nError: " + err);
        });
    });
}