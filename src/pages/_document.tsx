
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Lovable Generated Project" />
        <meta name="author" content="Lovable" />
        <meta property="og:title" content="scoutos-revived-vision" />
        <meta property="og:description" content="Lovable Generated Project" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lovable_dev" />
        <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! */}
        <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
      </body>
    </Html>
  )
}
