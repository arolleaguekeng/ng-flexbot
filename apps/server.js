/* server.js in root directory */
const fs = require('fs');
const path = require('path');

const dir = "environments";
const file = "environment.ts";
const prodFile = "environment.prod.ts"; // For production deployment

const content = `${process.env.ANGULAR_ENV || ''}`;

fs.access(dir, fs.constants.F_OK, (err) => {
    try {
        fs.writeFileSync(dir + "/" + file, content);
        fs.writeFileSync(dir + "/" + prodFile, content);
        console.log("Created successfully in", process.cwd());
        if (fs.existsSync(dir + "/" + file)) {
            console.log("File is created", path.resolve(dir + "/" + file));
            const str = fs.readFileSync(dir + "/" + file).toString();
            console.log(str);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});