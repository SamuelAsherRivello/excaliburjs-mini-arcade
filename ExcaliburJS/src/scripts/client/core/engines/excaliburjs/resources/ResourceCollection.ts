// ResourceCollection.ts

import { IInitializableAsync } from '@client/core/interfaces/IInitializeAsync';
import { ImageSource, Sound, FontSource, Loader } from 'excalibur';

export type ImportedAsset = string | { default: string };

export class ResourceCollection implements IInitializableAsync {
  public get loader(): Loader {
    return this._loader;
  }

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  private _isInitialized: boolean = false;
  private resources: Record<string, ImageSource | Sound | FontSource> = {};
  private _loader: Loader;

  constructor() {
    this._loader = new Loader();
  }

  async initializeAsync(): Promise<void> {
    if (this._isInitialized) {
      return;
    }
    this._isInitialized = true;
  }

  requireIsInitialized() {
    if (!this._isInitialized) {
      throw new Error('ResourceCollection is not initialized. Call initializeAsync() first.');
    }
  }

  private nameOf(importPath: ImportedAsset): string {
    let path: string;
    if (typeof importPath === 'object' && importPath.default) {
      path = importPath.default;
    } else if (typeof importPath === 'string') {
      path = importPath;
    } else {
      throw new Error('Invalid import path');
    }
    const match = path.match(/([^\/]+)(?=\.\w+$)/);
    return match ? match[0] : path;
  }

  add<T extends ImageSource | Sound | FontSource>(nameOrImport: string | ImportedAsset, resource: T, customName?: string, options?: any): void {
    let name: string;
    if (customName) {
      name = customName;
    } else if (typeof nameOrImport === 'string') {
      name = this.nameOf(nameOrImport);
    } else {
      name = this.nameOf(nameOrImport);
    }

    if (this.has(name)) {
      throw new Error(`${this.constructor.name}.add() Failed. Name '${name}' already exists.`);
    }

    if (resource instanceof FontSource && options) {
      this.resources[name] = new FontSource(resource.path, name, options);
    } else {
      this.resources[name] = resource;
    }
    this.loader.addResource(this.resources[name]);
  }

  has(name: string): boolean {
    return name in this.resources;
  }

  get<T extends ImageSource | Sound | FontSource>(name: string): T {
    if (!this.has(name)) {
      throw new Error(`${this.constructor.name}.get() Failed. Name '${name}' not found.`);
    }

    const resource = this.resources[name] as T;
    if (!resource) {
      throw new Error(`${this.constructor.name}.get() Failed. Resource '${resource}' not found.`);
    }

    return resource;
  }

  getAll(): Record<string, ImageSource | Sound | FontSource> {
    return this.resources;
  }
}
