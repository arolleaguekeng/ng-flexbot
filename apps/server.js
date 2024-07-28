const fs = require('fs').promises;
const path = require('path');

const dir = "apps/flexbot-demo/src/environments";
const file = "environment.ts";
const prodFile = "environment.prod.ts"; // For production deployment

const content = `${process.env.ANGULAR_ENV || ''}`;

async function createEnvironmentFiles() {
    try {
        console.log("content", content);
        await fs.access(process.cwd() + "/" + dir);
    } catch (err) {
        console.log(`${dir} doesn't exist, creating now`, process.cwd());
        try {
            console.log("Creating directory", dir);
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

        console.log("Created successfully in", process.cwd() + "/" + dir);

        if (await fs.access(filePath)) {
            console.log("File is created", path.resolve(filePath));
            const str = await fs.readFile(filePath, 'utf8');
            console.log(str);
        }
        else {
            console.log("File is not created");
        }
    } catch (error) {
        console.error(`Error while writing files. Error: ${error.message}`);
        process.exit(1);
    }
}

createEnvironmentFiles();