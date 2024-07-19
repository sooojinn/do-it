export interface ListItem {
  id: number;
  isCompleted: boolean;
  name: string;
}

export type ListType = "todo" | "done";
