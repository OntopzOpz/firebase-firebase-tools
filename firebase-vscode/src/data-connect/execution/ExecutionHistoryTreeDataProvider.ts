import * as vscode from "vscode";
import { effect } from "@preact/signals-core";
import { executions } from "./execution-store";
import { ExecutionTreeItem } from "./ExecutionTreeItem";

/**
 * The TreeDataProvider for data connect execution history.
 */

export class ExecutionHistoryTreeDataProvider
    implements vscode.TreeDataProvider<ExecutionTreeItem>
{
    private readonly onDidChangeTreeDataEmitter = new vscode.EventEmitter<void>();
    readonly onDidChangeTreeData: vscode.Event<void> = this.onDidChangeTreeDataEmitter.event;
    executionItems: ExecutionTreeItem[] = [];

    constructor() {
        effect(() => {
            this.executionItems = Object.values(executions.value)
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((item) => new ExecutionTreeItem(item));

            this.onDidChangeTreeDataEmitter.fire();
        });
    }

    getTreeItem(element: ExecutionTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: ExecutionTreeItem): ExecutionTreeItem[] {
        if (element) {
            return element.children;
        } else {
            return this.executionItems;
        }
    }

    getParent(element?: ExecutionTreeItem): ExecutionTreeItem | undefined {
        return element?.parent;
    }
}
