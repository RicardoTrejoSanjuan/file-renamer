const path = require('path'),
    fs = require('fs'),
    State = require('./log/State');

class RenameFiles {
    constructor() {
        this._dir = path.join(__dirname, 'files');         // Directory containing the files
        this._files = fs.readdirSync(this._dir);                // Files in the directory
        State.filesInDirectory = this._files.length;
        this._pattern = null;
        console.log(State.showInitialLog());
    }


    get files() {
        return this._files;
    }

    get dir() {
        return this._dir;
    }

    get pattern() {
        return this._pattern;
    }

    usePattern(patternClass) {
        this._pattern = patternClass;
    }


    shouldRename2 (file) {
        if(file.includes('Pantalla')){
            return file;
        }
    }

    renameFile2(file) {
        // Assign Extracted Info
        var name = file.split('Pantalla32');
        var newName = name[0] + 'Pantalla' + name[1];
        var filePath = path.join(this.dir, file);
        var newFilePath = path.join(this.dir, newName);

        // Rename
        fs.rename(filePath, newFilePath, error => {
            if(error) {
                State.logError(error);
            }
        });
        // Increase counter for renamed files
        State.filesRenamed++;
    }

    // Rename Files
    exec() {
        // Return a Promise
        return new Promise((resolve, reject) => {
            try {
                this.files
                    .filter(file => this.shouldRename2(file))
                    .forEach(file => this.renameFile2(file));
                resolve( State.showCompletionLog() );
            } catch (error) {
                State.logError(error);
                reject( State.showCompletionLog() );
            }
        });
    }
}

module.exports = new RenameFiles();
