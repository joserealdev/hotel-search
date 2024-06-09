export enum Environments {
  dev = "development",
  prod = "production",
}

export const isDevMode = (): boolean => process.env.NODE_ENV === Environments.dev;
