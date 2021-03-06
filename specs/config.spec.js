import { it, describe, expect } from 'vitest'
import { mergeConfigurations } from '../src/configuration.js'
import { defaultConfig } from '../src/defaultConfig.js'

describe('Configuration', () => {
  it('should return the default config if no external config is provided', async () => {
    expect(await mergeConfigurations(null)).toStrictEqual(defaultConfig)
  })

  it('should return the default config if non exisiting external config is provided', async () => {
    expect(
      await mergeConfigurations('./specs/fixtures/non-existing.config.js'),
    ).toStrictEqual(defaultConfig)
  })

  it('should override default config with external config', async () => {
    expect(
      await mergeConfigurations('./specs/fixtures/empty.config.js'),
    ).toStrictEqual({
      host: 'https://spec-host.com/',
      ...defaultConfig,
    })
  })

  it('should fail if a non-valid config is given', async () => {
    await expect(
      mergeConfigurations('./specs/fixtures/faulty.config.js'),
    ).rejects.toThrowError('Invalid configuration')
  })
})
