// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decodeJsonWebToken = (token: string): any => {
  const [, body] = token.split('.');

  const json = decodeURIComponent(
    window
      .atob(body)
      .split('')
      .map(chunk => `%${chunk.charCodeAt(0).toString(16).padStart(2, '0')}`)
      .join(''),
  );

  return JSON.parse(json)
};
