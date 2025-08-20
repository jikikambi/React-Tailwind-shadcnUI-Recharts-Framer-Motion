declare module "@/components/ui/*" {
  import type { FC, ComponentProps } from "react";
  const Component: FC<ComponentProps<any>>;
  export default Component;
}