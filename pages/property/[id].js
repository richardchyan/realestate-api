import {Avatar, Box, Flex, Spacer, Text} from '@chakra-ui/react'
import { FaBed, FaBath} from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'

import { baseUrl, fetchApi }  from '../../utils/fetchApi'
import ImageScrollbar from '../../components/ImageScrollbar'
import millify from 'millify'

const PropertyDetails = ({ PropertyDetails : {
   price, rentFrequency, rooms, title,
   baths, area, agency, isVerified, description, type, purpose,
   furnishingStatus, amenities, photos
}}) => {

   console.log(photos)

   return (
      <Box maxWidth="1000px" margin="auto" p="4">
         {photos && <ImageScrollbar data={photos}/>}
         <Box w="full" p="6">
            <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
               <Flex alignItems="center">
                  <Box paddingRight="3" color="green.400">
                     {isVerified &&   <GoVerified />}
                  </Box>
                  <Text fontWeight="bold" fontSize="lg">AED {millify(price)} {rentFrequency && `/${rentFrequency}`}</Text>
               </Flex>
               <Box>
                  <Avatar size="sm" src={agency?.logo?.url} />
               </Box>
            </Flex>
            <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
               {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
            </Flex>
            <Box marginTop="2" fontSize="lg" marginBottom="2" fontWeight="bold">
               <Text fontSize="lg">{title }</Text>
            </Box>
            <Text lineHeight="2" color="gray.600">{description}</Text>
            <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
               <Flex justifyContent="space-between" w="400px" borderBottom="1px" p="3" borderBottom="gray.100">
                  <Text>Type</Text>
                  <Text fontWeight="bold">{type}</Text>
               </Flex>
               <Flex justifyContent="space-between" w="400px" borderBottom="1px" p="3" borderBottom="gray.100">
                  <Text>Purpose</Text>
                  <Text fontWeight="bold">{purpose}</Text>
               </Flex>
               {furnishingStatus && (
                  <Flex justifyContent="space-between" w="400px" borderBottom="1px" p="3" borderBottom="gray.100">
                     <Text>Furnishing Status</Text>
                     <Text fontWeight="bold">{furnishingStatus}</Text>
                  </Flex>
               )}
            </Flex>
            <Box>
               {amenities.length && <Text fontSize="2xl" fontWeight="black" marginTop="5">Amenities</Text>}
               <Flex flexWrap="wrap">
                  {amenities.map(item => (
                     item.amenities.map(amenity => (
                        <Text key={amenity.text} fontWeight="bold" color="blue.400" fontSize="l" padding="2" bg="gray.200" m="1" borderRadius="4">{amenity.text}</Text>
                     ))
                  ))}
               </Flex>
            </Box>
         </Box>
      </Box>
   )
}

export default PropertyDetails

export async function getServerSideProps({ params: { id }}){
   const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)

   return {
      props: {
         PropertyDetails: data
      }
   }
}