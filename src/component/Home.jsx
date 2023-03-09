import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import axios from 'axios'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { useState } from 'react'

import bookImage from '../assets/courage_dislike.jpg'
import BuyNowDialog from './BuyNowDialog'

export default function Home () {
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => setOpenDialog(!openDialog)

  function openPage (url) {
    const win = window.open(url, '_blank')
    if (win != null) {
      win.focus()
    }
  }

  const initializePayment = async (email, amount) => {
    setLoading(true)

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_PROD_MODE === 'test'
                    ? process.env.REACT_APP_API_URL_TEST
                    : process.env.REACT_APP_API_URL_LIVE}/payment/initialize-payment`, {
        email, amount
      })

      openPage(data?.paymentData?.data?.authorization_url)
    } catch (error) {
      Notify.failure(error?.response?.data.message)
    }
    setLoading(false)
  }

  return (
    <Box
      sx={{
        backgroundColor: '#A4CED9',
        minHeight: '100vh'
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          paddingTop: { xs: '150px', md: '100px' },
          paddingBottom: '100px'
        }}
      >
        <Stack
          justifyContent='center'
          alignItems='center'
          spacing={4}
        >
          <Box
            sx={{
              width: { md: '20%' }
            }}
          >
            <img src={bookImage} alt='' width='100%' height='100%' />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontWeight: 700,
              textAlign: 'center',
              fontSize: '20px',
              color: 'white',
              width: { md: '50%' }
            }}
          >
            The Courage to Be Disliked: The Japanese Phenomenon That Shows You How to Change Your Life and Achieve Real Happiness
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
              color: 'white',
              fontStyle: 'italic'
            }}
          >
            Price: ₦10,000
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: ' center'
            }}
          >
            <Button
              onClick={handleOpenDialog}
              variant='contained'
            >
              Buy NOw
            </Button>
          </Box>
        </Stack>
      </Container>
      <BuyNowDialog
        loading={loading}
        setLoading={setLoading}
        handleOpenDialog={handleOpenDialog}
        openDialog={openDialog}
        initializePayment={initializePayment}
      />
    </Box>

  )
}
