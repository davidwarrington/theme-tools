import path from 'node:path';
import { AbsolutePath } from '@shopify/theme-check-common';
import { loadYamlConfig } from './loadYamlConfig';
import { mergeConfigs } from './mergeConfigs';
import { FullyResolvedThemeCheckYaml, ModernIdentifier, ModernIdentifiers } from '../types';

const modernConfigsPath = path.resolve(__dirname, '../../../configs');

/**
 * Given a modern identifier or absolute path, fully resolves and flattens
 * a yaml config. In other words, extends are all loaded and merged with
 * the config at the configPath.
 */
export async function resolveConfig(
  configPath: AbsolutePath | ModernIdentifier,
  isRootConfig: boolean = false,
): Promise<FullyResolvedThemeCheckYaml> {
  if (isModernIdentifier(configPath)) {
    const modernConfigPath = path.join(
      modernConfigsPath,
      configPath.replace(/^theme-check:/, '') + '.yml',
    );
    return resolveConfig(modernConfigPath);
  }

  const current = await loadYamlConfig(configPath, isRootConfig);
  const baseConfigs = await Promise.all(current.extends.map((extend) => resolveConfig(extend)));
  return mergeConfigs(baseConfigs, current);
}

function isModernIdentifier(thing: string): thing is ModernIdentifier {
  return ModernIdentifiers.includes(thing as any);
}
