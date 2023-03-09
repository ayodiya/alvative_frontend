import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

export default function PayConfirmation () {
  const { search } = useLocation()
  const [loading, setLoading] = useState(false)
  const [payStatus, setPayStatus] = useState({})
  const navigate = useNavigate()

  const reference = search.split('=')[2]

  const getPaymentSuccess = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_PROD_MODE === 'test'
                    ? process.env.REACT_APP_API_URL_TEST
                    : process.env.REACT_APP_API_URL_LIVE}/payment/verify-payment`, {
        reference, productName: 'The courage to be disliked'
      })

      setPayStatus({ ...data })
    } catch (error) {
      Notify.failure(error?.response?.data.message)
    }
    setLoading(false)
  }, [reference])

  useEffect(() => {
    getPaymentSuccess()
  }, [getPaymentSuccess])

  return (
    <Box
      sx={{
        backgroundColor: '#A4CED9',
        minHeight: '100vh'
      }}
    >
      {loading &&
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '150px'
          }}
        >
          <CircularProgress />
        </Box>}

      {!loading && payStatus?.status === 'success' &&
        <Container maxWidth='lg'>
          <Box
            sx={{ paddingTop: '150px' }}
          >
            <Box
              sx={{
                padding: '50px'
              }}
              component={Paper}
            >
              <Stack
                justifyContent='center'
                spacing={4}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      fill: '#4BB543',
                      fontSize: '80px'
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {payStatus?.message}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    onClick={() => navigate('/')}
                    variant='contained'
                  > Go Home
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Container>}

      {!loading && payStatus?.status === 'failed' &&
        <Container maxWidth='lg'>
          <Box
            sx={{ paddingTop: '150px' }}
          >
            <Box
              sx={{
                padding: '50px'
              }}
              component={Paper}
            >
              <Stack
                justifyContent='center'
                spacing={4}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      fill: '#fa113d',
                      fontSize: '80px'
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {payStatus?.message}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    onClick={() => navigate('/')}
                    variant='contained'
                  > Go Home
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Container>}
    </Box>
  )
}
