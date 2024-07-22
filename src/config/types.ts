export interface ListItem {
  id: number;
  isCompleted: boolean;
  name: string;
}

export interface PatchItemParams {
  isCompleted: boolean;
}

export type ListType = "todo" | "done";
