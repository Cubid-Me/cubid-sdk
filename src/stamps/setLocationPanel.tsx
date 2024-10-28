import React from "react"
import axios from "axios"
import debounce from "lodash.debounce"
import { toast } from "react-toastify"

import { Button } from "../component/button"
import { Input } from "../component/input"
import 'react-phone-input-2/lib/style.css'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../component/alert-dialog"

export const LocationSearchPanel = ({
  open,
  onClose,
  apikey,
  page_id,
  uuid,
  fetchStamps
}: {
  open: boolean
  onClose: () => void
  apikey: string
  page_id?: string
  uuid: string
  fetchStamps: () => void
}) => {
  const [locationInput, setLocationInput] = React.useState("")
  const [allLocations, setAllLocations] = React.useState([])
  const [selectedLocation, setSelectedLocation] = React.useState<any>(null)

  // Debounced function for location search
  const handleLocationSearch = debounce(async (input) => {
    setSelectedLocation(null)
    if (input.length >= 2) {
      try {
        const response = await axios.post(`https://passport.cubid.me/api/v2/search-location`, { location_input: input, apikey })
        setAllLocations(response.data)
      } catch (error) {
        toast.error("Error fetching locations.")
      }
    }
  }, 500)

  const handleLocationChange = (e) => {
    setLocationInput(e.target.value)
    handleLocationSearch(e.target.value)
  }

  return (
    <>
      {open && (
        <AlertDialog open={open}>
          <AlertDialogContent
            style={{ borderRadius: 10 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm h-[400px] mx-auto p-6"
          >
            <AlertDialogHeader className="mb-4">
              <AlertDialogTitle className="text-2xl font-bold text-gray-800">
                Location Search
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-gray-600">
                <Input
                  placeholder="Search and select home or work address"
                  value={locationInput}
                  onChange={handleLocationChange}
                  className="mt-4 w-full border border-gray-300 rounded-lg p-2 shadow focus:outline-none focus:shadow-outline"
                />
                <div className="h-[200px] overflow-y-auto mt-3">
                  {
                    allLocations.map((item: any) => (
                      <div
                        key={item.name}
                        onClick={() => {
                          setLocationInput(item.formatted_address)
                          setSelectedLocation(item)
                        }}
                        className={`cursor-pointer pb-2 ${selectedLocation?.formatted_address === item.formatted_address ? "font-bold" : ""
                          }`}
                      >
                        {item.formatted_address}
                      </div>
                    ))}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex absolute bottom-[10px] right-[10px] justify-between space-x-2">
              <AlertDialogCancel
                onClick={onClose}
                style={{ borderRadius: 10 }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogCancel
                onClick={async () => {
                  await axios.post('https://passport.cubid.me/api/v2/identity/add_stamp', {
                    page_id,
                    stamp_type: "address",
                    stampData: { uniquevalue: `${uuid}-${selectedLocation?.formatted_address}`, identity: selectedLocation?.formatted_address, ...selectedLocation },
                    user_data: { uuid },
                  });
                  onClose()
                  fetchStamps()
                }}
                style={{ borderRadius: 10 }}
                disabled={!Boolean(selectedLocation)}
                className="bg-blue-500 hover:bg-gray-400 text-white py-2 px-4 rounded-md"
              >
                Save Location
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
