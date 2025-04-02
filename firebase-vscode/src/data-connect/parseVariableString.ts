
export function parseVariableString(variables: string): Record<string, any> {
    if (!variables) {
        return {};
    }
    try {
        return JSON.parse(variables);
    } catch (e: any) {
        throw new Error(
            "Unable to parse variables as JSON. Double check that that there are no unmatched braces or quotes, or unqouted keys in the variables pane."
        );
    }
}
