import * as FileSystem from 'expo-file-system';

const dir = FileSystem.documentDirectory;
const configFile = dir + "config.json";
const subjectFile = dir + "subjects.json";

const initialConfig = {"idCount": 0};

let config = "XD";
let subjects;

function readFile(filename) {
    return FileSystem.readAsStringAsync(filename, { encoding: FileSystem.EncodingType.UTF8});
}

function writeFile(filename, jsonContent) {
    return FileSystem.writeAsStringAsync(filename, JSON.stringify(jsonContent), { encoding: FileSystem.EncodingType.UTF8});
}

export function initialize() {
    let x = load(configFile, "config", initialConfig);
    x.then((c) => {
        config = c;
    }).catch(err => console.log(err));
}

function load(file, title, defaultContent) {
    return new Promise((resolve, reject) => {
        FileSystem.getInfoAsync(file).then(f => {
            if(f.exists) {
                let p = readFile(file);
                p.then((c) => {
                    resolve(JSON.parse(c));
                }).catch(() => {
                    reject("Error while reading " + title + ". Path: " + file);
                })
            } else {
                let p = writeFile(file, defaultContent);
                p.then((c) => {
                    resolve(defaultContent);
                }).catch(() => {
                    reject("Error while writing " + title + ". Path: " + file);
                })
            }
        })
    });
}