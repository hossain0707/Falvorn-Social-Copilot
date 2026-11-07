import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const required=["site/index.html","site/styles.css","site/app.js","site/core.mjs","site/favicon.svg","site/og.svg","site/vercel.json","plugin/plugin.json","plugin/mcp.json","README.md","LICENSE","AGENTS.md"];
for(const name of required){if(!fs.existsSync(path.join(root,name)))throw new Error("Missing: "+name);}
const html=fs.readFileSync(path.join(root,"site/index.html"),"utf8");
const app=fs.readFileSync(path.join(root,"site/app.js"),"utf8");
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const match of app.matchAll(/\$\("([A-Za-z0-9_-]+)"\)/g)){if(!ids.has(match[1]))throw new Error("Missing HTML ID: "+match[1]);}
const plugin=JSON.parse(fs.readFileSync(path.join(root,"plugin/plugin.json"),"utf8"));
JSON.parse(fs.readFileSync(path.join(root,"plugin/mcp.json"),"utf8"));
const skills=fs.readdirSync(path.join(root,"plugin/skills"),{withFileTypes:true}).filter(x=>x.isDirectory());
if(skills.length!==14)throw new Error("Expected exactly 14 skills; found "+skills.length);
if(plugin.name!=="falvorn-social-copilot")throw new Error("Plugin identity mismatch");
for(const word of ["human approval","demo","Instagram","Facebook"]){if(!html.toLowerCase().includes(word.toLowerCase()))throw new Error("Missing product copy: "+word);}
console.log("PASS: site assets, DOM references, plugin manifests and 14 skills.");
