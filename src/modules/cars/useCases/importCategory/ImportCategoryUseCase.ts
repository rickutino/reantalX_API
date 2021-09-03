import csvParse from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    // Aqui vai fazer a leitura do arquivo passado em file.path.
    const stream = fs.createReadStream(file.path);

    // Realizarar a leitura do arquivo linha por linha.
    const parseFile = csvParse();

    // Será responsavel por passar parte a parte das linhas lidas para parseFile.
    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
