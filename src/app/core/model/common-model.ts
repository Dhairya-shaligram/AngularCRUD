export interface ApiResponse {
  Success: boolean;
  Message: string;
  Data: any;
  TAID: number;
}

export interface TableColumn {
  columnDef: string;
  title: string;
  isShow: boolean;
  buttons: Array<ButtonsConfig>;
}

export interface ApiConfigModel {
  url: string;
  requestData: any;
  type: string;
}

export interface PaginationModel {
  PageNumber: number;
  PageSize: number;
  StrSearch: string;
  SortColumn: string;
  SortOrder: string;
}

export interface ButtonsConfig {
  Text: string;
  Icon: string;
  Type: string;
  Title: string;
  IsConfirm: boolean;
}

export interface ActionEvent {
  Type: string;
  Data: any;
}
