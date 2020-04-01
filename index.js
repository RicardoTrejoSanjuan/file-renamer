const RenameFiles = require('./RenameFiles');

const { log } = console; // Destructure the console object

// RenameFiles is a singleton
// Call usePattern(pattern) to declare pattern to use
// and call exec() to rename files in the directory
// You can pass an option: exec({ usePattern: zLibraryBookPattern })
// NB: exec() returns a Promise which resolves to State.showLog()
// RenameFiles.usePattern(zLibraryBookPattern);
RenameFiles
    .exec()
    .then(log)
    .catch(console.error);

