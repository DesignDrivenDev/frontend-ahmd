import { Provider } from "react-redux";
import "@/styles/globals.css";
import Layout from "@/components/layout";
import store from "@/app/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
