"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handler_resolver_1 = require("libs/handler-resolver");
const schema_1 = __importDefault(require("./schema"));
exports.default = {
    handler: `${(0, handler_resolver_1.handlerPath)(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'hello',
                request: {
                    schemas: {
                        'application/json': schema_1.default,
                    },
                },
            },
        },
    ],
};
//# sourceMappingURL=index.js.map