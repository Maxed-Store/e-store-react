import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../globalReduxStore/actions';
import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Skeleton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useFetchCartData } from '../../globalReduxStore/reducers/cartOperations';
import { useAuth } from 'react-oidc-context';
import { useProfile } from '../../auth/profileProvider';


const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&::before, &::after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });

export default function Checkout() {
  const navigate = useNavigate();
  const { userPreferences } = useProfile();
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userID = user?.profile?.sub || null;
  const { loading, error, data, refetch } = useFetchCartData(userID);
  const cart = useSelector((state) => state.cart.cart);
  const outerTheme = useTheme();
  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleAddressSelection = (index) => {
    setSelectedAddressIndex(index);
  };
  useEffect(() => {
    if (data && data.getCartItems) {
      dispatch(actionCreators.setCart(data.getCartItems.products));
    }
  }, [dispatch, data]);
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading || !data || !userPreferences.defaultAddress || userPreferences.defaultAddress.length === 0) {
    return (
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-6">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 md:p-6">
              <Skeleton variant="text" width={200} height={30} />
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <Skeleton variant="rectangular" width={200} height={30} />
              <Skeleton variant="rectangular" width={200} height={30} />
              <Skeleton variant="rectangular" width={200} height={30} />
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 md:p-6">
              <Skeleton variant="text" width={200} height={30} />
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <Skeleton variant="rectangular" width="100%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={30} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (error) return <p>Error: {error.message}</p>;
  const selectedAddress = userPreferences.defaultAddress[selectedAddressIndex];
  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-6">
        <div className="rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 md:p-6">
            <h3 className="text-lg font-medium">Address and Payment</h3>
          </div>
          {userPreferences.defaultAddress && userPreferences.defaultAddress.map((address, index) => (
            <div key={index} className="border border-gray-200 m-2 ml-5 mr-5 space-x-3 rounded-md p-4 mb-4">
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    checked={index === selectedAddressIndex}
                    onChange={() => handleAddressSelection(index)}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                }
                label={
                  <div>
                    <p className="text-sm font-medium text-gray-900"> {address.streetAddress}</p>
                    <p className="text-sm text-gray-500"><LocationOnIcon/> {address.city}</p>
                    <p className="text-sm text-gray-500"><LocalPhoneIcon/> {address.phone}</p>
                  </div>
                }
                className="flex items-start"
              />
            </div>
          ))}
          <div className="p-4 md:p-6 space-y-4 relative">
            <div className="right-6 top-10 absolute mb-3">
              <Button color="success" size="small" variant="outlined" onClick={() => navigate("/your_profile")}>
                <AddLocationAltIcon />
              </Button>
            </div>
            <div className="space-x-8 flex flex-row">
              <TextField
                id="outlined-basic"
                label="Name"
                value={userPreferences.userName || ''}
                variant="outlined"
                size="small"
              />
            </div>
            <div className="space-y-2">
              <TextField
                id="outlined-basic"
                label="Email"
                value={userPreferences.email || ''}
                className="block w-full rounded-md sm:text-sm"
                variant="outlined"
                size="small"
              />
            </div>
            <div className="space-x-11 flex flex-row">
              <TextField
                id="Phone"
                label="Phone"
                value={selectedAddress.phone || ''}
                variant="outlined"
                size="small"
              />
              <TextField
                id="City"
                label="City"
                value={selectedAddress.city || ''}
                variant="outlined"
                size="small"
              />
            </div>
            <div className="space-y-2">
              <TextField
                className="block w-full rounded-md sm:text-sm"
                label="Street Address"
                id="address"
                value={selectedAddress.streetAddress}
                multiline
                rows={2}
                size="small"
              />
            </div>
            <div className="flex items-center gap-2">
              <FormControl>
                <h2 className="font-medium">Payment Method</h2>
                <RadioGroup
                  aria-labelledby="payment-method"
                  name="controlled-radio-buttons-group"
                  value={paymentMethod}
                  onChange={handlePaymentMethod}
                >
                  <FormControlLabel value="Cash on Delivery" control={<Radio color="default" />} label="Cash on Delivery" />
                  <FormControlLabel value="Card" control={<Radio color="default" />} label="Pay with Card" />
                </RadioGroup>
              </FormControl>
            </div>
             
              {paymentMethod === 'Card' && <div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4" />
                <div className="mb-3">
                  <TextField id="outlined-basic" label="Card Number" placeholder="0000 0000 0000 0000" className="block w-full rounded-md   sm:text-sm" variant="outlined" size="small" />
                </div>

                <div className="space-x-8 flex flex-row">
                  <TextField id="outlined-basic" label="Expiry Date" placeholder="MM/YY" variant="outlined" size="small" />
                  <TextField id="outlined-basic" label="CVC" variant="outlined" placeholder="000" size="small" />
                </div>
                <div class="flex items-center gap-2">
                  <label for="myCheckbox">
                    <Checkbox id="myCheckbox" color="default" />
                    save card for future payments
                  </label>
                </div>
              </div>
              }
            </div>

          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 md:p-6">
              <h3 className="text-lg font-medium">Order Summary</h3>
            </div>
            {cart.length > 0 && cart.map(({ name, price, imageUrl, quantity, description, discount }) => (
              <div className="p-4 md:p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        alt="Product "
                        className="rounded-md"
                        height={60}
                        src={imageUrl}
                        style={{
                          aspectRatio: "60/60",
                          objectFit: "cover",
                        }}
                        width={60}
                      />
                      <div>
                        <h4 className="font-medium">{name}</h4>
                        <p className="text-sm text-gray-500 ">{description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{price}</p>
                      <p className="text-sm text-gray-500 ">Qty: {quantity}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4" />
                </div>
                <div className="border-t border-gray-200  pt-4" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p>Subtotal</p>
                    <p className="font-medium">{data.getCartItems.totalPrice}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Shipping</p>
                    <p className="font-medium"></p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Discount</p>
                    <p className="font-medium text-green-500">{discount}%</p>
                  </div>
                  <div className="border-t border-gray-200  pt-4" />
                  <div className="flex items-center justify-between font-medium text-lg">
                    <p>Total</p>
                    <p>{data.getCartItems.totalPrice - (data.getCartItems.totalPrice * (discount / 100))}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="  p-4 md:p-6">
              <button
                className="inline-flex justify-center w-full rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 "
                type="button"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}