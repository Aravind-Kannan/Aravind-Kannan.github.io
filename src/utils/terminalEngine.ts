import { personalInfo } from "../data/info";
import { projects } from "../data/projects";
import { journey } from "../data/journey";

export interface TerminalState {
  cwd: string;
  history: { type: "input" | "output" | "error" | "system"; text: string; isHtml?: boolean }[];
}

export type CommandResult = {
  output: string;
  isHtml?: boolean;
  newCwd?: string;
  clear?: boolean;
  exit?: boolean;
};

const resolvePath = (pwd: string, target: string): string | null => {
  if (target === "~" || target === "/") return "~";
  
  const currentSegments = pwd === "~" ? [] : pwd.replace("~/", "").split("/");
  const targetSegments = target.split("/");

  let newSegments = [...currentSegments];

  for (const seg of targetSegments) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") {
      newSegments.pop();
    } else {
      newSegments.push(seg);
    }
  }

  const finalPath = newSegments.length === 0 ? "~" : `~/${newSegments.join("/")}`;
  
  const validPaths = ["~", "~/projects", "~/journey"];
  if (validPaths.includes(finalPath)) {
    return finalPath;
  }
  return null;
};

export const executeCommand = (cmdStr: string, state: TerminalState): CommandResult => {
  const args = cmdStr.trim().split(" ").filter(Boolean);
  if (args.length === 0) return { output: "" };

  const command = args[0].toLowerCase();
  const pwd = state.cwd;

  switch (command) {
    case "help":
      return {
        output: `<div class="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
  <div class="text-primary-500">cat [file]</div><div>Print file contents</div>
  <div class="text-primary-500">cd [dir]</div><div>Change directory</div>
  <div class="text-primary-500">ls [dir]</div><div>List directory contents</div>
  <div class="text-primary-500">whoami</div><div>Current user</div>
  <div class="text-primary-500">projects</div><div>List featured projects</div>
  <div class="text-primary-500">journey</div><div>List timeline milestones</div>
  <div class="text-primary-500">contact</div><div>Get contact information</div>
  <div class="text-primary-500">clear</div><div>Clear the terminal screen</div>
  <div class="text-primary-500">exit</div><div>Return to website GUI</div>
</div>`,
        isHtml: true,
      };

    case "whoami":
      return { output: "guest_user" };

    case "clear":
      return { output: "", clear: true };

    case "exit":
      return { output: "Closing terminal session...", exit: true };

    case "contact":
      return {
        output: `Email:   ${personalInfo.socials.email.replace("mailto:", "")}\nGitHub:  ${personalInfo.socials.github}\nLinkedIn:${personalInfo.socials.linkedin}`,
      };

    case "ls": {
      let targetDir = pwd;
      if (args[1]) {
        const resolved = resolvePath(pwd, args[1]);
        if (!resolved) return { output: `ls: cannot access '${args[1]}': No such file or directory` };
        targetDir = resolved;
      }

      if (targetDir === "~") {
        return { output: `<span class="text-blue-400 font-bold">projects/</span>  <span class="text-blue-400 font-bold">journey/</span>  about.txt  contact.txt  skills.txt`, isHtml: true };
      } else if (targetDir === "~/ परियोजनाओं" || targetDir === "~/projects") {
        return { output: projects.map(p => `${p.id}.md`).join("  ") };
      } else if (targetDir === "~/journey") {
        return { output: journey.map(j => `${j.id}.md`).join("  ") };
      }
      return { output: "" };
    }

    case "cd": {
      if (!args[1]) return { output: "", newCwd: "~" };
      const resolved = resolvePath(pwd, args[1]);
      if (!resolved) return { output: `cd: ${args[1]}: No such file or directory` };
      return { output: "", newCwd: resolved };
    }

    case "cat": {
      if (!args[1]) return { output: "cat: missing file operand" };
      let targetFile = args[1];
      let targetDir = pwd;

      if (targetFile.includes("/")) {
        const segments = targetFile.split("/");
        targetFile = segments.pop() || "";
        targetDir = resolvePath(pwd, segments.join("/")) || pwd;
      }

      if (targetDir === "~") {
        if (targetFile === "about.txt") {
          return { output: personalInfo.about.join("\n\n") };
        }
        if (targetFile === "contact.txt") {
          return { output: `Email:   ${personalInfo.socials.email.replace("mailto:", "")}\nGitHub:  ${personalInfo.socials.github}\nLinkedIn:${personalInfo.socials.linkedin}` };
        }
        if (targetFile === "skills.txt") {
          return { output: "Kubernetes, Rust, Go, Distributed Systems, Docker, Terraform" };
        }
      } else if (targetDir === "~/projects") {
        const proj = projects.find(p => `${p.id}.md` === targetFile);
        if (proj) {
          return {
            output: `\n# ${proj.title}\n\n${proj.description}\n\nStack: ${proj.tags.join(" | ")}\nLinks: ${proj.github || 'N/A'}`,
          };
        }
      } else if (targetDir === "~/journey") {
        const j = journey.find(j => `${j.id}.md` === targetFile);
        if (j) {
          return {
            output: `\n[${j.date}] ${j.title}\n${j.description}`,
          };
        }
      }

      return { output: `cat: ${args[1]}: No such file or directory` };
    }

    case "projects": {
      let out = `<div class="mt-2 grid gap-4">`;
      projects.forEach(p => {
        out += `<div><span class="text-primary-400 font-bold">${p.title}</span><br/><span class="text-zinc-400 text-sm">${p.description}</span></div>`;
      });
      out += `</div>`;
      return { output: out, isHtml: true };
    }

    case "journey": {
      let out = `<div class="mt-2 space-y-3">`;
      journey.forEach(j => {
        out += `<div class="flex gap-4"><span class="text-primary-400 w-24 shrink-0">${j.date}</span><span>${j.title}</span></div>`;
      });
      out += `</div>`;
      return { output: out, isHtml: true };
    }

    case "sudo":
      return { output: `aravind is not in the sudoers file. This incident will be reported.` };

    default:
      return { output: `command not found: ${command}` };
  }
};
