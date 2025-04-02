import * as vscode from "vscode";
import { firstWhere } from "../utils/signal";
import { currentOptions } from "../options";

export async function pickServices(
    serviceIds: string[]
): Promise<Array<string> | undefined> {
    const options = firstWhere(
        currentOptions,
        function(options) {
            return options.project?.length !== 0;
        }
    ).then((options) => {
        return serviceIds.map((serviceId) => {
            return {
                label: serviceId,
                options,
                picked: true,
            };
        });
    });

    const picked = await vscode.window.showQuickPick(options, {
        title: "Select services to deploy",
        canPickMany: true,
    });

    return picked?.filter((e) => e.picked).map((service) => service.label);
}
