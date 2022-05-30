"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayjsDateProvider = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
var DayjsDateProvider = /** @class */ (function () {
    function DayjsDateProvider() {
    }
    // compara o dia de devolucao esperada com a data atual
    DayjsDateProvider.prototype.compareInHours = function (start_date, end_date) {
        var start_date_utc = this.convertToUTC(start_date);
        var end_date_utc = this.convertToUTC(end_date);
        return dayjs_1.default(end_date_utc).diff(start_date_utc, "hours");
    };
    // utc formata num horario que ao adicionar 1 day conta como 24 horas.
    DayjsDateProvider.prototype.convertToUTC = function (date) {
        return dayjs_1.default(date).utc().local().format();
    };
    DayjsDateProvider.prototype.dateNow = function () {
        return dayjs_1.default().toDate();
    };
    DayjsDateProvider.prototype.compareInDays = function (start_date, end_date) {
        var start_date_utc = this.convertToUTC(start_date);
        var end_date_utc = this.convertToUTC(end_date);
        return dayjs_1.default(end_date_utc).diff(start_date_utc, "days");
    };
    return DayjsDateProvider;
}());
exports.DayjsDateProvider = DayjsDateProvider;
//# sourceMappingURL=DayjsDateProvider.js.map