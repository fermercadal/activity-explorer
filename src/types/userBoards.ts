export type BoardSummary = {
  label: string;
  slug: string;
};

export type UserBoardsResponse = {
  username: string;
  boards: BoardSummary[];
};
