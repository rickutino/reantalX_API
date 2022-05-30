"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var CreateCategoryController_1 = require("@modules/cars/useCases/createCategory/CreateCategoryController");
var ImportCategoryController_1 = require("@modules/cars/useCases/importCategory/ImportCategoryController");
var ListCategoriesController_1 = require("@modules/cars/useCases/ListCategory/ListCategoriesController");
var ensureAdmin_1 = require("@shared/infra/http/middlewares/ensureAdmin");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var categoriesRoutes = express_1.Router();
exports.categoriesRoutes = categoriesRoutes;
var upload = multer_1.default({
    dest: "./tmp",
});
var listCategoriesController = new ListCategoriesController_1.ListCategoriesController();
var createCategoryController = new CreateCategoryController_1.CreateCategoryController();
var importCategoryController = new ImportCategoryController_1.ImportCategoryController();
categoriesRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/import", upload.single("file"), ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, importCategoryController.handle);
//# sourceMappingURL=categories.routes.js.map