declare module 'zadarma' {
  const api: <Response, Params>(args: {
    api_method: string;
    api_user_key?: string;
    api_secret_key?: string;
    params?: Params;
  }) => Promise<Response>;
}
