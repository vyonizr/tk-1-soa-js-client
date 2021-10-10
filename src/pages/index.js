import Head from 'next/head'
import Link from 'next/link'
import { BASE_URL } from 'src/utils/constants'
import ProductCard from 'src/components/ProductCard'

import {
  Box,
  Text,
  Button,
} from '@chakra-ui/react'

export default function Home({ user, products }) {
  return (
    <div>
      <Head>
        <title>TK 1 SOA Store</title>
        <meta name="description" content="TK 1 SOA Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Text>
          {user.name}
        </Text>
        <Text>
          Balance: IDR {user.balance}
        </Text>
        <Link href={`/topup`}>
          <a>
            <Button colorScheme="blue">Topup</Button>
          </a>
        </Link>
      </Box>
      {
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </div >
  )
}

export async function getServerSideProps() {
  try {
    const responseUser = await fetch(`${BASE_URL}/users/1`)
    const responseUserJSON = await responseUser.json()
    const responseProducts = await fetch(`${BASE_URL}/products`)
    const responseProductsJSON = await responseProducts.json()
    return {
      props: {
        user: responseUserJSON.data,
        products: responseProductsJSON.data
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        user: {
          id: null,
          name: 'Guest',
          balance: 0,
        },
        products: []
      }
    }
  }
}
