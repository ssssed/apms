interface BoardData {
  [user: string]: {
    [status: string]: Task[];
  };
}
