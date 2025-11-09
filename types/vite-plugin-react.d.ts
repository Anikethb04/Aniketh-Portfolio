declare module '@vitejs/plugin-react' {
  import type { Plugin } from 'vite';
  type Options = any;
  export default function reactPlugin(options?: Options): Plugin;
}
