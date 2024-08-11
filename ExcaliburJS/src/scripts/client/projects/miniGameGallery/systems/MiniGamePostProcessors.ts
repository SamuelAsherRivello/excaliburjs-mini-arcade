import { EngineSingleton } from '@client/core/engines/excaliburjs/singletons/EngineSingleton';
import * as ex from 'excalibur';

export interface PostProcessingConfiguration {}

const PostProcessingConfigurationDefault: PostProcessingConfiguration = {};

export interface RetroPostProcessingConfiguration extends PostProcessingConfiguration {
  pixelSize?: number;
  colorLevels?: number;
  scanlineIntensity?: number;
  bulgeIntensity?: number;
}

const RetroPostProcessingConfigurationDefault: RetroPostProcessingConfiguration = {
  ...PostProcessingConfigurationDefault,
  pixelSize: 4,
  colorLevels: 5,
  scanlineIntensity: 0.1,
  bulgeIntensity: -0.2,
};

export class MiniGamePostProcessors {
  public static getPostProcessor_ColorBlindness(configuration: PostProcessingConfiguration = PostProcessingConfigurationDefault): ex.PostProcessor {
    configuration = { ...PostProcessingConfigurationDefault, ...configuration };

    const postProcessor = new ex.ColorBlindnessPostProcessor(ex.ColorBlindnessMode.Deuteranope, true);
    return postProcessor;
  }

  public static getPostProcessor_GrayScale(configuration: PostProcessingConfiguration = PostProcessingConfigurationDefault): ex.PostProcessor {
    configuration = { ...PostProcessingConfigurationDefault, ...configuration };

    const postProcessor = new (class implements ex.PostProcessor {
      private _shader!: ex.ScreenShader;
      initialize(gl: WebGL2RenderingContext): void {
        this._shader = new ex.ScreenShader(
          gl,
          `#version 300 es
        precision mediump float;
        // our texture
        uniform sampler2D u_image;
        // the texCoords passed in from the vertex shader.
        in vec2 v_texcoord;
        out vec4 fragColor;
        void main() {
          vec4 tex = texture(u_image, v_texcoord);
          float avg = 0.2126 * tex.r + 0.7152 * tex.g + 0.0722 * tex.b;
          fragColor = vec4(avg, avg, avg, 1.0);
        }`,
        );
      }
      getLayout(): ex.VertexLayout {
        return this._shader.getLayout();
      }
      getShader(): ex.Shader {
        return this._shader.getShader();
      }
    })();
    return postProcessor;
  }

  public static getPostProcessor_Retro(configuration: RetroPostProcessingConfiguration = RetroPostProcessingConfigurationDefault): ex.PostProcessor {
    configuration = { ...RetroPostProcessingConfigurationDefault, ...configuration };

    const pixelSize = configuration.pixelSize || 4;
    const colorLevels = configuration.colorLevels || 5;
    const scanlineIntensity = configuration.scanlineIntensity || 0.1;
    const bulgeIntensity = configuration.bulgeIntensity || 0.1;

    const postProcessor = new (class implements ex.PostProcessor {
      private _shader!: ex.ScreenShader;
      initialize(gl: WebGL2RenderingContext): void {
        this._shader = new ex.ScreenShader(
          gl,
          `#version 300 es
        precision mediump float;
        uniform sampler2D u_image;
        uniform vec2 u_resolution;
        in vec2 v_texcoord;
        out vec4 fragColor;

        vec2 bulge(vec2 uv) {
          vec2 center = vec2(0.5, 0.5);
          vec2 d = uv - center;
          float r = length(d);
          float bulgeAmount = ${bulgeIntensity};
          
          // Adjust the bulge function to be less pronounced near the edges
          float bulge = 1.0 + bulgeAmount * (1.0 - r * r);
          
          // Smoothstep to further reduce the effect near the edges
          float edgeFade = smoothstep(0.7, 0.0, r);
          bulge = mix(1.0, bulge, edgeFade);
          
          return center + d * bulge;
        }

        void main() {
          vec2 uv = v_texcoord;
          
          // Apply screen bulge
          uv = bulge(uv);
          
          // Pixelation
          vec2 pixels = vec2(${pixelSize}.0, ${pixelSize}.0);
          uv = floor(uv * u_resolution / pixels) * pixels / u_resolution;
          
          vec4 tex = texture(u_image, uv);
          
          // Color quantization
          float colorLevels = ${colorLevels}.0;
          tex = floor(tex * colorLevels) / colorLevels;
          
          // Scanline effect
          float scanline = sin(uv.y * u_resolution.y * 2.0) * ${scanlineIntensity};
          tex.rgb -= scanline;

          fragColor = tex;
        }`,
        );
      }
      getLayout(): ex.VertexLayout {
        return this._shader.getLayout();
      }
      getShader(): ex.Shader {
        return this._shader.getShader();
      }
    })();
    return postProcessor;
  }
}
