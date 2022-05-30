"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var DayjsDateProvider_1 = require("./DateProvider/implementations/DayjsDateProvider");
tsyringe_1.container.registerSingleton("DayjsDateProvider", DayjsDateProvider_1.DayjsDateProvider);
//# sourceMappingURL=index.js.map