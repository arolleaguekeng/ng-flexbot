const fs = require('fs').promises;
const path = require('path');

const dir = "environments";
const file = "environment.ts";
const prodFile = "environment.prod.ts"; // For production deployment

const content = `${process.env.ANGULAR_ENV || ''}`;

async function createEnvironmentFiles() {
    try {
        await fs.access(dir);
    } catch (err) {
        console.log(`${dir} doesn't exist, creating now`, process.cwd());
        try {
            await fs.mkdir(dir, { recursive: true });
        } catch (error) {
            console.error(`Error while creating ${dir}. Error: ${error.message}`);
            process.exit(1);
        }
    }

    try {
        const filePath = path.join(dir, file);
        const prodFilePath = path.join(dir, prodFile);

        await fs.writeFile(filePath, content);
        await fs.writeFile(prodFilePath, content);

        console.log("Created successfully in", process.cwd());

        if (await fs.access(filePath)) {
            console.log("File is created", path.resolve(filePath));
            const str = await fs.readFile(filePath, 'utf8');
            console.log(str);
        }
    } catch (error) {
        console.error(`Error while writing files. Error: ${error.message}`);
        process.exit(1);
    }
}

createEnvironmentFiles();