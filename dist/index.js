"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const resolvers_1 = require("./resolvers");
const PORT = process.env.PORT || 5000;
const app = express_1.default();
(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.connect(process.env.MONGO_URI || "", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    mongoose_1.default.connection.on("error", console.error.bind(console, "connection error:"));
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [resolvers_1.CommentResolver, resolvers_1.MemberResolver],
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        introspection: true,
        playground: true,
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app });
    app.use(express_1.default.static("public"));
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}))();
//# sourceMappingURL=index.js.map