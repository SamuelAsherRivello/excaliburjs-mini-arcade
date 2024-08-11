import { EngineSingleton } from '@client/core/engines/excaliburjs/singletons/EngineSingleton';
import * as ex from 'excalibur';

export interface MaterialsConfiguration {}

const MaterialsConfigurationDefault: MaterialsConfiguration = {};

export interface OutlineMaterialsConfiguration extends MaterialsConfiguration {
  outlineColor?: ex.Color;
  outlineThickness?: number;
}

const OutlineMaterialsConfigurationDefault: OutlineMaterialsConfiguration = {
  ...MaterialsConfigurationDefault,
  outlineColor: new ex.Color(0, 0, 0, 0.8),
  outlineThickness: 1,
};

export interface ShadowMaterialsConfiguration extends MaterialsConfiguration {
  shadowColor?: ex.Color;
  shadowOffset?: [number, number];
  shadowBlur?: number;
}

const ShadowMaterialsConfigurationDefault: ShadowMaterialsConfiguration = {
  ...MaterialsConfigurationDefault,
  shadowColor: new ex.Color(0, 0, 0, 0.5),
  shadowOffset: [1, 1],
  shadowBlur: 1,
};

export class MiniGameMaterials {
  public static getMaterial_Outline(configuration: OutlineMaterialsConfiguration = OutlineMaterialsConfigurationDefault): ex.Material {
    configuration = { ...OutlineMaterialsConfigurationDefault, ...configuration };

    const outlineColor = configuration.outlineColor || ex.Color.Black;
    const thickness = configuration.outlineThickness || 2.0;

    const material = `#version 300 es
      precision mediump float;

      uniform sampler2D u_graphic;

      in vec2 v_uv;
      out vec4 fragColor;

      void main() {
        vec2 texSize = vec2(textureSize(u_graphic, 0));
        vec2 uv = v_uv;
        float thickness = ${thickness.toFixed(1)};

        vec4 outlineColor = vec4(${outlineColor.r}, ${outlineColor.g}, ${outlineColor.b}, ${outlineColor.a});
        vec4 texColor = texture(u_graphic, uv);

        float outline = 0.0;
        for (float y = -thickness; y <= thickness; y += 1.0) {
          for (float x = -thickness; x <= thickness; x += 1.0) {
            vec2 sampleUV = uv + vec2(x, y) / texSize;
            outline = max(outline, texture(u_graphic, sampleUV).a);
          }
        }

        outline = outline - texColor.a;
        vec4 outlineResult = mix(texColor, outlineColor, outline);
        fragColor = outlineResult;
      }
    `;

    return EngineSingleton.instance.graphicsContext.createMaterial({
      name: 'outline',
      fragmentSource: material,
    });
  }

  public static getMaterial_DropShadow(configuration: ShadowMaterialsConfiguration = ShadowMaterialsConfigurationDefault): ex.Material {
    configuration = { ...ShadowMaterialsConfigurationDefault, ...configuration };

    const shadowColor = configuration.shadowColor || ex.Color.fromHex('#00000080');
    const shadowOffset = configuration.shadowOffset || [4, 4];
    const shadowBlur = configuration.shadowBlur || 4;

    const material = `#version 300 es
      precision mediump float;

      uniform sampler2D u_graphic;
      uniform vec2 u_resolution;

      in vec2 v_uv;
      out vec4 fragColor;

      void main() {
        vec2 texSize = vec2(textureSize(u_graphic, 0));
        vec2 uv = v_uv;
        vec2 offset = vec2(${shadowOffset[0]}.0, ${shadowOffset[1]}.0) / texSize;
        float blur = ${shadowBlur.toFixed(1)};

        vec4 shadowColor = vec4(${shadowColor.r}, ${shadowColor.g}, ${shadowColor.b}, ${shadowColor.a});
        vec4 texColor = texture(u_graphic, uv);

        float shadow = 0.0;
        for (float y = -blur; y <= blur; y += 1.0) {
          for (float x = -blur; x <= blur; x += 1.0) {
            vec2 sampleUV = uv + offset + vec2(x, y) / texSize;
            shadow += texture(u_graphic, sampleUV).a;
          }
        }
        shadow /= (2.0 * blur + 1.0) * (2.0 * blur + 1.0);

        vec4 shadowResult = mix(vec4(0.0), shadowColor, shadow);
        fragColor = mix(shadowResult, texColor, texColor.a);
      }
    `;

    return EngineSingleton.instance.graphicsContext.createMaterial({
      name: 'dropshadow',
      fragmentSource: material,
    });
  }
}
