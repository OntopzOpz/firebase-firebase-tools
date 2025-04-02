import * as vscode from "vscode";
import { ExecutionItem, ExecutionState } from "./execution-store";
import { timeFormatter } from "./execution-history-provider";

/**
 * The TreeItem for an execution.
 */

export class ExecutionTreeItem extends vscode.TreeItem {
    parent?: ExecutionTreeItem;
    children: ExecutionTreeItem[] = [];

    constructor(readonly item: ExecutionItem) {
        super(item.label, vscode.TreeItemCollapsibleState.None);
        this.item = item;

        // Renders arguments in a single line
        const prettyArgs = this.item.args?.replaceAll(/[\n \t]+/g, " ");
        this.description = `${timeFormatter.format(
            item.timestamp
        )} | Arguments: ${prettyArgs}`;
        this.command = {
            title: "Show result",
            command: "firebase.dataConnect.selectExecutionResultToShow",
            arguments: [item.executionId],
        };
        this.updateContext();
    }

    updateContext() {
        this.contextValue = "executionTreeItem-finished";
        if (this.item.state === ExecutionState.FINISHED) {
            this.iconPath = new vscode.ThemeIcon(
                "pass",
                new vscode.ThemeColor("testing.iconPassed")
            );
        } else if (this.item.state === ExecutionState.CANCELLED) {
            this.iconPath = new vscode.ThemeIcon(
                "warning",
                new vscode.ThemeColor("testing.iconErrored")
            );
        } else if (this.item.state === ExecutionState.ERRORED) {
            this.iconPath = new vscode.ThemeIcon(
                "close",
                new vscode.ThemeColor("testing.iconFailed")
            );
        } else if (this.item.state === ExecutionState.RUNNING) {
            this.contextValue = "executionTreeItem-running";
            this.iconPath = new vscode.ThemeIcon(
                "sync~spin",
                new vscode.ThemeColor("testing.runAction")
            );
        }
    }
}
