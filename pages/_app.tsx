import "../styles/globals.css";
import type { AppProps } from "next/app";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import Head from "next/head";

const variants = {
  in: {
    opacity: 0,
    scale: 0.5,
  },
  out: {
    opacity: 1,
    scale: 1,
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ThemeProvider attribute="class">
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          variants={variants}
          initial="in"
          animate="out"
          exit="in"
          transition={{ duration: 2 }}
        >
          <Head>
            <link rel="shortcut icon" href="/algo-logo.png" />
          </Head>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;
