import { Box, Image, Text, Button } from "@chakra-ui/react"
import Link from 'next/link'

function ProductCard(props) {
  const { product } = props

  return (
    <Box
      maxW="sm"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection='column'
      alignItems='center'
    >
      <Image src={product.image_url} />
      <Text fontSize="xl" textAlign='center'>{product.name}</Text>
      <Text fontSize="md" textAlign='center'>IDR {product.price}</Text>
      <Link href={`/products/${product.id}`}>
        <a>
          <Button colorScheme="blue">Buy</Button>
        </a>
      </Link>
    </Box >
  )
}

export default ProductCard