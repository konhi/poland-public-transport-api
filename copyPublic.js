
import shell from "child_process";

shell.execSync("mkdir -p dist");
shell.execSync("cp -r src/public dist/");