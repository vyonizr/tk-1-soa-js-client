import { useState, useEffect } from 'react'
import {
  Button,
  Text,
  Modal,
  Select,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckoutModal(props) {
  const {
    totalWeight,
    totalRawPrice,
    product,
    isOpen,
    onClose
  } = props

  const notify = () => toast.error('This feature is not available yet', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'dark',
  });

  const [couriers, setCouriers] = useState([])
  const [shipments, setShipments] = useState([])
  const [selectedCourierId, setSelectedCourierId] = useState('')
  const [selectedShipmentId, setSelectedShipmentId] = useState('')
  const [shipmentPrice, setShipmentPrice] = useState(0)

  const getRandomArbitrary = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2)
  }

  const [distance] = useState(getRandomArbitrary(1, 10))


  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const response = await fetch('/api/couriers')
        const responseJSON = await response.json()
        setCouriers(responseJSON.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCouriers()
  }, [])

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch(`/api/couriers/${selectedCourierId}`)
        const responseJSON = await response.json()
        setShipments(responseJSON.data)
      } catch (error) {
        console.error(error)
      }
    }

    if (selectedCourierId.length > 0) {
      fetchShipments()
    } else {
      setShipments([])
    }
  }, [selectedCourierId])

  useEffect(() => {
    if (shipments.length > 0) {
      const { price_per_kg, price_per_km } = shipments.find(shipment => String(shipment.id) === String(selectedShipmentId))
      const shipmentPrice = (price_per_kg * totalWeight) + (price_per_km * distance)
      setShipmentPrice(Math.round(shipmentPrice))
    }
  }, [selectedShipmentId]);

  const handleCourierChange = (event) => {
    if (event.target.value.length > 0) {
      setSelectedCourierId(event.target.value)
    }
  }

  const handleShipmentChange = (event) => {
    if (event.target.value.length > 0) {
      setSelectedShipmentId(event.target.value)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Checkout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{product.name}</Text>
          <Text>Distance: {distance} km</Text>
          <Text>Weight: {totalWeight} kg</Text>
          <Select
            placeholder="Pick courier"
            value={selectedCourierId}
            onChange={handleCourierChange}
          >
            {
              couriers.map(courier => (
                <option
                  key={courier.id}
                  value={courier.id}
                >
                  {courier.name}
                </option>
              ))
            }
          </Select>
          {
            selectedCourierId !== 0 &&
            shipments.length > 0 && (
              <Select
                placeholder="Pick shipment option"
                value={selectedShipmentId}
                onChange={handleShipmentChange}
              >
                {
                  shipments.map(shipment => (
                    <option
                      key={shipment.id}
                      value={shipment.id}
                    >
                      {shipment.name}
                    </option>
                  ))
                }
              </Select>
            )
          }
          <Text>Shipment Fee: IDR {selectedShipmentId.length !== 0 ? shipmentPrice : '-'}</Text>
          <Text>Total: IDR {selectedShipmentId.length !== 0 ? shipmentPrice + totalRawPrice : '-'}</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            colorScheme="blue"
            mr={3}
            isDisabled={selectedShipmentId.length === 0}
            onClick={notify}
          >
            Buy
          </Button>
        </ModalFooter>
      </ModalContent>
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
    </Modal>
  )
}

export default CheckoutModal