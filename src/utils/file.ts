import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    // Conferir se existe arquivo no path filename;
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  // remove o filename passado.
  await fs.promises.unlink(filename);
};
