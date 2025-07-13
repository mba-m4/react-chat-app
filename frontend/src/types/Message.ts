export type Message = {
    id: number;
    role: "user" | "ai";
    content: string;
  };