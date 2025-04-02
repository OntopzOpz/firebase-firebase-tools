import * as vscode from "vscode";
import { firstWhere } from "../utils/signal";
import { currentOptions } from "../options";

export async function pickConnectors(
    connectorIds: string[] | undefined,
    serviceId: string
): Promise<Array<string> | undefined> {
    const options = firstWhere(
        currentOptions,
        (options) => options.project?.length !== 0
    ).then((options) => {
        return connectorIds?.map((connectorId) => {
            return {
                label: connectorId,
                options,
                picked: true,
            };
        });
    });

    const picked = await vscode.window.showQuickPick<{
        picked: boolean;
        label: string;
    }>(options as any, {
        title: `Select connectors to deploy for: ${serviceId}`,
        canPickMany: true,
    });

    return picked?.filter((e) => e.picked).map((c) => c.label);
}
