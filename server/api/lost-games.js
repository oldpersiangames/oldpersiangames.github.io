import { globSync } from "glob";
export default defineEventHandler((event) => {
  const files = globSync("public/img/lost-games/*");
  return files;
});
