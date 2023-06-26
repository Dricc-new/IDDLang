import { readFileSync } from "fs";
export default class Lang {
    private static data: any
    private static folder: string = "./lang"

    public static SetFolderLaguages = (str: string) => this.folder = str

    public static SetLanguageCode = (str: string) => {
        try {
            this.data = JSON.parse(readFileSync(this.folder + '/' + str + '.json','utf-8'))
        } catch {
            this.data = null
        }
        return this
    };

    public static Translate = (str: string, params: string[] = []): string => {
        if (params.length) {
            var temp: string;
            if (temp = this.data[str]) {
                params.forEach((item: string) => {
                    if (temp.indexOf('|')) {
                        var split = temp.split('|')
                        split.forEach((element) => {
                            var operation = element.split(' ')[0]
                            if (operation[0] == '{') {
                                if ('{' + item[1] + '}' == operation) {
                                    temp = element.replaceAll(operation, '')
                                }
                            } else if (operation[0] == '[') {
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
            } else return str;
        } else
            return this.data[str] ? this.data[str] : str
    };
}