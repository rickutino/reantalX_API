import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";
import fs from "fs";
import handlebars from "handlebars";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transport = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          },
        });

        this.client = transport;
      })
      .catch((err) => console.error(err));
  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateaHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentalx <noreplay@rentalx.com>",
      subject,
      html: templateaHTML,
    });

    console.log("MEssage sent: %s", message.messageId);
    console.log("MEssage sent: %s", nodemailer.getTestMessageUrl(message));
  }
    
}

export { EtherealMailProvider };
