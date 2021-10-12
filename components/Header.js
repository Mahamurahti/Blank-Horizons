import Head from "next/head";

export default function Footer(props) {

    const { title, description } = props

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/horizon-logo.png" />
        </Head>
    )
}