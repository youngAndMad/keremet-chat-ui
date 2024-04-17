interface KeremetChatClient {
  register(username: string, password: string): Promise<void>;
}
