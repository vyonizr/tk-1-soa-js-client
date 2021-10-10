import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { BASE_URL } from 'src/utils/constants'
import CheckOutModal from 'src/components/CheckOutModal'

import {
  useDisclosure,
  Box,
  Text,
  Image,
  Flex,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

export default function ProductDetail(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { product } = props
  const [quantity, setQuantity] = useState(1)
  const handleQuantityChange = (value) => setQuantity(value)

  const calculateWeight = (weight, quantity) => {
    return (weight * quantity).toFixed(1)
  }

  const calculatePrice = (price, quantity) => {
    return price * quantity
  }

  return (
    <Box>
      <Head>
        <title>{product.name} | TK 1 SOA Store</title>
        <meta name="description" content={product.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        product && (
          <>
            <Text textAlign='center' fontSize="4xl">{product.name}</Text>
            <Flex align="flex-start" justify="center">
              <Box>
                <Image src={product.image_url} />
              </Box>
              <Box>
                <Text fontSize="xl">{product.description}</Text>
                <Text>IDR {calculatePrice(product.price, quantity)}</Text>
                <Text>Stock: {product.stock}</Text>
                <NumberInput
                  value={quantity}
                  min={1}
                  max={product.stock}
                  onChange={handleQuantityChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text>Weight: {calculateWeight(product.weight_in_kg, quantity)} kg</Text>
                <Button onClick={onOpen}>Buy</Button>
              </Box>
            </Flex>
          </>
        )
      }
      <Link href='/'>
        <a>
          <Button>Back</Button>
        </a>
      </Link>
      <CheckOutModal
        totalWeight={calculateWeight(product.weight_in_kg, quantity)}
        totalRawPrice={calculatePrice(product.price, quantity)}
        product={product}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  try {
    const response = await fetch(`${BASE_URL}/products/${params.productId}`)
    const responseJSON = await response.json()
    return {
      props: {
        product: responseJSON.data
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        product: null
      }
    }
  }
}
