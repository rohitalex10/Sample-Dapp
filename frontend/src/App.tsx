import { useState, useRef } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Text,
  Center,
  useDisclosure,
  VStack,
  Select,
  SimpleGrid,
  Box,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';

import './index.css'; // Import the CSS file

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    checkInDate: '',
    checkOutDate: ''
  });
  const [data, setData] = useState<any>({});
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (!Object.values(formData).every(value => value.trim())) {
      alert("Please fill all fields");
      return
    }
    try {
      const res = await axios.post('http://localhost:3000/api/register', formData);
      setData(res.data);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        checkInDate: '',
        checkOutDate: ''
      })
    } catch (error) {
      alert("Error " + error);
    }
    onOpen();
  };

  return (
    <Center>
      <VStack m={4} className="container">
        <Heading as="h3" size="xl">Hotel Booking Registration</Heading>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={8}
          boxShadow="md"
          bg="white"
          flex={0.6}
          m={4}
          className="form-container"
        >
          <Heading mb={4} className="form-heading">Booking Information</Heading>
          <Divider mb={2} />
          <VStack spacing={4} align="center" width="100%">
            <FormControl id="fullName" isRequired>
              <FormLabel className="form-label">Full Name</FormLabel>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel className="form-label">Email Address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </FormControl>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel className="form-label">Phone Number</FormLabel>
              <Input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-input"
              />
            </FormControl>
            <SimpleGrid columns={2} spacing={6} width="100%">
              <FormControl id="checkInDate" isRequired>
                <FormLabel className="form-label">Check-In Date</FormLabel>
                <Input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </FormControl>
              <FormControl id="checkOutDate" isRequired>
                <FormLabel className="form-label">Check-Out Date</FormLabel>
                <Input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </FormControl>
            </SimpleGrid>
            <Button type="submit" colorScheme="blue" width={"100%"} onClick={handleSubmit} className="form-button">Book Now</Button>
          </VStack>
        </Box>
      </VStack>
      <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Box p={4} className="drawer-container">
            <ListCard title="Full Name" value={data?.fullName} />
            <ListCard title="Email Address" value={data?.email} />
            <ListCard title="Phone Number" value={data?.phoneNumber} />
            <ListCard title="Check-In Date" value={data?.checkInDate} />
            <ListCard title="Check-Out Date" value={data?.checkOutDate} />
          </Box>
        </DrawerContent>
      </Drawer>
    </Center>
  );
}

const ListCard = (props: any) => {
  return (
    <VStack spacing={1} align="flex-start" justifyContent={"flex-start"} my={2}>
      <Text as={"b"} className="drawer-item-label">{props.title}</Text>
      <Text className="drawer-item-value">{props.value}</Text>
    </VStack>
  );
};

export default App;
