declare module "store_remote/Store" {
  import { Dispatch, SetStateAction } from "react";

  export const useStore: () => {
    cart: any[];
    setCart: Dispatch<SetStateAction<any[]>>;
  };
}

declare module "nav/Navbar" {
  const Component: React.ComponentType;
  export default Component;
}
