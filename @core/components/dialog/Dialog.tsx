import dynamic from "next/dynamic";

// ! To avoid 'Window is not defined' error
import { Rnd } from "react-rnd";

export default dynamic(() => Promise.resolve(Rnd), {
  ssr: false,
});
