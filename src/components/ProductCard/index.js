import { Box, Image, Text } from "@chakra-ui/react"

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
      cursor='pointer'
    >
      <Image src={product.image_url} />
      <Text fontSize="xl" textAlign='center'>{product.name}</Text>
      <Text fontSize="md" textAlign='center'>IDR {product.price}</Text>
    </Box >
  )
}

export default ProductCard