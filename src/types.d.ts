import { Resource } from 'i18next'

export {}
declare global {
  namespace globalThis  {
    var store: Resource | undefined | null;
  }
}