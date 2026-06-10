export class RegexUtil {
    public static readonly name = (name: string, max: number, min?: number) =>
        RegExp(
            `^(?=.{${min ?? ""},${max}}$)[a-zA-ZÀ-ÿ]+(?:[ .\\-][a-zA-ZÀ-ÿ]+)*$`,
        ).test(name);

    public static readonly email = (email: string) =>
        RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/).test(email);

    public static readonly password = (
        password: string,
        max: number,
        min: number,
    ) =>
        RegExp(
            `^[0-9A-\\\\Za\\/-z+*&{}?%$ç@!"')(\\[\\].=£§áéíóúâêô~^àã#_-]{${min},${max}}$`,
        ).test(password);

    public static readonly cpf = (cpf: string) =>
        RegExp(/^[0-9]{11}$/).test(cpf);

    public static readonly cnpj = (cnpj: string) =>
        RegExp(/^[0-9]{14}$/).test(cnpj);

    public static readonly text = (text: string, max: number, min?: number) =>
        RegExp(`^.{${min ?? ""},${max}}$`).test(text);

    public static readonly uuid = (uuid: string) =>
        RegExp(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
        ).test(uuid);

    public static readonly numeric = (number: string) =>
        RegExp(/^\d+$/).test(number);
}
