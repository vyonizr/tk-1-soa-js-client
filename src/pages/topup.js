import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Text,
  Box,
  Button,
  HStack,
  useRadio,
  useRadioGroup
} from "@chakra-ui/react"

import { BASE_URL } from 'src/utils/constants'

const TOPUP_OPTIONS = ["50000", "100000", "250000", "500000", "1000000"]

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default function Topup({ user }) {
  const notifyError = () => toast.error('Something wrong happened. Please try again.', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'dark',
  });

  const notifySuccess = () => toast.success('Topup success! Please reload the page.', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'dark',
  });

  const router = useRouter()
  const [selectedTopupOption, setSelectedTopupOption] = useState("250000")

  const handleChangeOption = (value) => {
    setSelectedTopupOption(value)
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "topup-options",
    defaultValue: "250000",
    onChange: handleChangeOption,
  })

  const submitTopup = async () => {
    try {
      const body = {
        user_id: 1,
        amount: Number(selectedTopupOption),
      }
      const response = await fetch('/api/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      notifySuccess()
    } catch (error) {
      notifyError()
      console.error(error)
    }
  }


  const group = getRootProps()

  return (
    <Box>
      <Head>
        <title>Topup | TK 1 SOA Store</title>
        <meta name="description" content="TK 1 SOA Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text>Your current balance is</Text>
      <Text>IDR {user.balance}</Text>
      <Text>Please choose one of the topup options below:</Text>
      <HStack {...group}>
        {
          TOPUP_OPTIONS.map(value => {
            const radio = getRadioProps({ value })
            return (
              <RadioCard
                key={value}
                {...radio}
              >
                {value}
              </RadioCard>
            )
          })
        }
      </HStack>
      <Link href='/'>
        <a>
          <Button>Back</Button>
        </a>
      </Link>
      <Button
        onClick={submitTopup}
        colorScheme="teal"
        variant="solid"
      >
        Purchase
      </Button>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme='dark'
      />
    </Box>
  )
}

export async function getServerSideProps() {
  try {
    const responseUser = await fetch(`${BASE_URL}/users/1`)
    const responseUserJSON = await responseUser.json()
    return {
      props: {
        user: responseUserJSON.data,
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
      }
    }
  }
}
