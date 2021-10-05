import Image from "next/image";

export default function Footer() {
    return (
        <footer className="footer">
            <a
                href="https://giphy.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
              <span className="logo">
                <Image src="/giphy_long.png" alt="Giphy Logo" width={182} height={26} />
              </span>
            </a>
            {' '}&{' '}
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
              <span className="logo">
                <Image src="/vercel.svg" alt="Vercel Logo" width={92} height={26} />
              </span>
            </a>
        </footer>
    )
}