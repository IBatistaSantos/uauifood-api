export interface HasherComparer {
  compare: (value: string, hash: string) => Promise<boolean>
}
