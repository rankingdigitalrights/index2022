/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const content: ReactComponent;

  export {ReactComponent};
  export default content;
}

declare module "*.png" {
  const value: any;
  export = value;
}
