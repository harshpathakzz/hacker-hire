import { createContext, useContext } from "react";

export const THEME_PREFIX = "sp";

/**
 * <ClassNamesContext classes={{
 *     "sp-wrapper": "custom-wrapper",
 *     "sp-layout": "custom-layout",
 *     "sp-tab-button": "custom-tab",
 *  }}>
 *  ...
 * </ClassNamesContext>
 */
const ClassNamesContext = createContext<Record<string, string>>({});

export const useClassNames = () => {
  const contextClassNames = useContext(ClassNamesContext);

  return function sandpackClassNames(
    customClassName: string,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    allClassNames: any[] = []
  ): string {
    const custom = `${THEME_PREFIX}-${customClassName}`;

    return joinClassNames(...allClassNames, custom, contextClassNames[custom]);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const joinClassNames = (...args: any[]): string => {
  return args.filter(Boolean).join(" ");
};