import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="shortcut icon"
            href="https://user-images.githubusercontent.com/86226736/234906784-da33555f-4122-4557-83f1-fa3befa3d94f.png"
            type="image/x-icon"
            sizes="16x16"
          />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Web site created using create-react-app"
          />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="/manifest" href="/manifest.json" />

          <script src="https://cdn.iamport.kr/v1/iamport.js"></script>

          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
