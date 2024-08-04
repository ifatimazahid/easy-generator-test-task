"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let DatabaseService = class DatabaseService {
    constructor(configService) {
        this.configService = configService;
    }
    get mongodbConnectionString() {
        return this.configService.get('MONGO_URI');
    }
    async addItem(model, payload) {
        try {
            const saveItem = await model.create(payload);
            if (saveItem) {
                return saveItem;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map