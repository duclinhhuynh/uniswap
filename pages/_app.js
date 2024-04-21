import "@/styles/globals.css";
import Navbar from "./component/Navbar/Navbar";
export default function App({ Component, pageProps }) {
  return <div>
    <Navbar/>
    <Component {...pageProps} />
  </div>;
}
