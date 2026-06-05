import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { Interface } from "node:readline/promises";

const execAsync = promisify(exec);

function line() {
    return "-".repeat(50);
}

async function formatCommited(index: string, read: Interface): Promise<string | undefined> {
    const message = await read.question("Commit Message: ");

    return {
        "1": `"feat: ${message}"`,
        "2": `"migrate: ${message}"`,
        "3": `"chore: ${message}"`,
        "4": `"infra: ${message}"`,
        "5": `"refactor: ${message}"`,
        "6": `"doc: ${message}"`,
        "7": `"exception: ${message}"`,
        "8": `"fix: ${message}"`,
        "9": `"hotfix: ${message}"`,
        "10": `"test: ${message}"`
    }[index];
}

async function addAll() {
    console.log(line());
    console.log("Adding...");
    const { stdout, stderr } = await execAsync("git add .");

    if (stderr) {
        console.error(stderr);
        return;
    }

    console.log(stdout);
}

async function pull() {
    console.log(line());
    console.log("Pulling...");
    const { stdout, stderr } = await execAsync("git pull");

    if (stderr) {
        console.error(stderr);
        return;
    }

    console.log(stdout);
}

async function push() {
    console.log(line());
    console.log("Pushing...");
    const { stdout, stderr } = await execAsync("git push");

    if (stderr) {
        console.error(stderr);
        return;
    }

    console.log(stdout);
}

async function commit(read: Interface) {
    console.log(line());
    console.log("Commit Manager");
    console.log("1. Feature");
    console.log("2. Migrate");
    console.log("3. Chore");
    console.log("4. Infrastructure");
    console.log("5. Refactoring");
    console.log("6. Documentation");
    console.log("7. Exception");
    console.log("8. Fix");
    console.log("9. HotFix");
    console.log("10. Testing");

    const alternative = await read.question("Alternative: ");
    const message = await formatCommited(alternative, read);

    console.log(line());

    if (!message) {
        console.log("Invalid commit message...");
        return;
    }

    const { stdout, stderr } = await execAsync(`git commit -m ${message}`);

    if (stderr) {
        console.error(stderr);
        return;
    }

    console.info(stdout);
}

async function amend() {
    console.log(line());
    console.log("Amending...");

    const { stdout, stderr } = await execAsync("git commit --amend");

    if (stderr) {
        console.error(stderr);
        return;
    }

    console.info(stdout);
}

async function status() {
    console.log(line());
    console.log("Status...");
    const { stdout, stderr } = await execAsync("git status")

    if (stderr) {
        console.error(stderr);
        return;
    }

    console.info(stdout);
}

async function main() {
    const read: Interface = readline.createInterface({ input, output });

    let looping = true;

    while (looping) {
        console.log(line());
        console.log("Git Manager");
        console.log("1. Add All");
        console.log("2. Git Pull");
        console.log("3. Git Push");
        console.log("4. Git Commit");
        console.log("5. Git Amend");
        console.log("6. Git Status");
        console.log("0. Log Out");

        const answer = (await read.question("Alternativa: ")).trim();

        switch (answer) {
            case "0":
                console.log(line())
                console.log("Bye!");
                looping = false;
                break;
            case "1":
                await addAll();
                break
            case "2":
                await pull();
                break;
            case "3":
                await push();
                break;
            case "4":
                await commit(read);
                break;
            case "5":
                await amend();
                break;
            case "6":
                await status();
                break;
            default:
                console.log(line());
                console.log("One More Time!")
        }
    }

    read.close();
}

main().then();
