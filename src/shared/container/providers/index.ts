import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./DateProvider/MailProvider/IMailProvider";
import { EtherealMailProvider } from "./DateProvider/MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);


container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);
