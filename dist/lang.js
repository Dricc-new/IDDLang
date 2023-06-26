"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class Lang {
    static data;
    static folder = "./lang";
    static SetFolderLaguages = (str) => this.folder = str;
    static SetLanguageCode = (str) => {
        try {
            this.data = JSON.parse((0, fs_1.readFileSync)(this.folder + '/' + str + '.json', 'utf-8'));
        }
        catch {
            this.data = null;
        }
        return this;
    };
    static Translate = (str, params = []) => {
        if (params.length) {
            var temp;
            if (temp = this.data[str]) {
                params.forEach((item) => {
                    if (temp.indexOf('|')) {
                        var split = temp.split('|');
                        split.forEach((element) => {
                            var operation = element.split(' ')[0];
                            if (operation[0] == '{') {
                                if ('{' + item[1] + '}' == operation) {
                                    temp = element.replaceAll(operation, '');
                                }
                            }
                            else if (operation[0] == '[') {
                                var limit = operation.replaceAll('[', '').replaceAll(']', '').split(',');
                                if (parseInt(item[1]) >= parseInt(limit[0]) && (limit[1] == '*' || parseInt(item[1]) >= parseInt(limit[1]))) {
                                    temp = element.replaceAll(operation, '');
                                }
                            }
                        });
                    }
                    temp = temp.replaceAll(':' + item[0], item[1]);
                });
                return temp;
            }
            else
                return str;
        }
        else
            return this.data[str] ? this.data[str] : str;
    };
}
exports.default = Lang;
//# sourceMappingURL=lang.js.map