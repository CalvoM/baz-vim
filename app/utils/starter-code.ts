export type Lang = "js" | "py";
interface LangMeta {
  label: string;
  file_name: string;
  starterCode: string;
}

interface LangDetailsMeta {
  [key in Lang]: LangMeta;
}

export const LangMetaDetails: LangDetailsMeta = {
  js: {
    label: "JavaScript",
    file_name: "scratch.js",
    starterCode: `console.log("Hello World")`,
  },
  py: {
    label: "Python",
    file_name: "scratch.py",
    starterCode: `print("Hello World")`,
  },
};
