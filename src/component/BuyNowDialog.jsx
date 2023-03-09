import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { Button } from '@mui/material'

export default function BuyNowDialog ({ handleOpenDialog, openDialog, initializePayment, loading }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (error || email === '') { return setError(true) }

    initializePayment(email, '1000000')
  }

  return (
    <Dialog onClose={() => handleOpenDialog()} open={openDialog}>
      <DialogTitle
        sx={{
          paddingTop: {
            xs: '40px',
            fontWeight: 600
          }
        }}
      >Please , enter your email
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <form>
            <Box>
              <TextField
                onChange={(e) => {
                  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
                    setError(false)
                  } else {
                    setError(true)
                  }
                  setEmail(e.target.value)
                }}
                id='outlined-basic'
                fullWidth
                label='Email'
                variant='outlined'
                value={email}
              />
              <Box
                sx={{
                  paddingTop: '5px',
                  color: 'red',
                  fontSize: '12px'
                }}
              >
                {error ? 'Invalid Email' : ''}
              </Box>
            </Box>
            <Box
              sx={{
                paddingTop: '30px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Button
                onClick={(e) => handleSubmit(e)}
                type='submit'
                variant='contained'
              >
                {loading ? 'Submitting' : 'Pay'}
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
