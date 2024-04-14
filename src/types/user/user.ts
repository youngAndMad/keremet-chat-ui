export type User = {
  id: number;
  email: string;
  username: string;
  emailVerified: boolean;
  authType: "GOOGLE" | "MANUAL";
  imageUrl: string;
  profileDescription: string;
  isActive: boolean;
};
