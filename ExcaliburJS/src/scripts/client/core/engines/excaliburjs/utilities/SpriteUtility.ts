import * as ex from 'excalibur';

export class SpriteUtility {
  public static resizeSpriteWithin(sprite: ex.Sprite, containerWidth: number, containerHeight: number): ex.Sprite {
    const originalAspectRatio = sprite.width / sprite.height;
    const containerAspectRatio = containerWidth / containerHeight;

    let newWidth, newHeight;

    if (originalAspectRatio > containerAspectRatio) {
      // Image is wider than the container, so we fit to width
      newWidth = containerWidth;
      newHeight = containerWidth / originalAspectRatio;
    } else {
      // Image is taller than the container, so we fit to height
      newHeight = containerHeight;
      newWidth = containerHeight * originalAspectRatio;
    }

    //TODO: Must I clone here?
    const resizedSprite = sprite.clone();
    resizedSprite.width = newWidth;
    resizedSprite.height = newHeight;

    return resizedSprite;
  }
}
