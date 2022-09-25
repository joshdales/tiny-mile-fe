export function formatMockedResponseUuid(uuid: string): string {
  return uuid.replace(/^urn:uuid:/, '')
}
