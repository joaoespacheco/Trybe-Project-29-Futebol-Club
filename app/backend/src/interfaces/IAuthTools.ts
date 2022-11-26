interface IAuthTools {
  generateToken(payload: { id: number, role: string }): Promise<string>;
}

export default IAuthTools;
