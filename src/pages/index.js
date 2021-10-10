import Head from 'next/head'
import Link from 'next/link'
import styles from 'src/styles/Home.module.css'
import { BASE_URL } from 'src/utils/constants'
import ProductCard from 'src/components/ProductCard'

export default function Home({ products }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>TK 1 SOA Store</title>
        <meta name="description" content="TK 1 SOA Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        products.map(product => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <a>
              <ProductCard product={product} />
            </a>
          </Link>
        ))
      }
    </div>
  )
}

export async function getStaticProps() {
  try {
    const response = await fetch(`${BASE_URL}/products`)
    const responseJSON = await response.json()
    return {
      props: {
        products: responseJSON.data
      }
    }
  } catch (error) {
    return {
      props: {
        products: []
      }
    }
  }
}
