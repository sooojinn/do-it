export interface ListItem {
  id: number;
  isCompleted: boolean;
  name: string;
}
export interface ListItemDetail extends ListItem {
  imageUrl: string;
  memo: string;
  tenantId: string;
}

export interface PatchIsCompletedParams {
  isCompleted: boolean;
}

export interface PatchItemParams {
  name: string;
  memo: string;
  imageUrl: string;
}

export type ListType = "todo" | "done";
