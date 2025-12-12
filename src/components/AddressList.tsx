import React, {useEffect} from 'react';
import {MapPinHouseIcon, Edit, Plus} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import type { AddressData } from '../models/Address';
import Toast from '../components/Toast';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AddressTile = ({
        data, 
        setEditAddressData, 
        setOpen, 
        setOpenForm,
    } 
        : 
    {
        data: Record<string, string | number | null>, 
        setEditAddressData: React.Dispatch<React.SetStateAction<AddressData | null>>, 
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        setOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    }) => {
    useEffect(() => {
        console.log(data);
    }, []);
    
    return <div className='flex mt-2 cursor-pointer rounded-md w-[500px] hover:bg-gray-700 p-2 items-center justify-between'>
        <div className='flex items-center'>
            <MapPinHouseIcon size={30} className=''/>
            <div className='px-4 items-start flex flex-col'>
                <span className='font-bold'>{data.address_name}</span>
                <span className='text-sm text-left'>{data.house_no}, {data.street || ''}., {data.barangay}, {data.municipality}, {data.province}</span>
            </div>
        </div>
        <div className='flex py-1 justify-end' onClick={() => {
            setEditAddressData({
                id: data.id as string,
                recipient_lname: (data.recipient_lname || '') as string,
                recipient_fname: (data.recipient_fname || '') as string,
                contact_number: (data.contact_number || '') as string,
                region: (data.region || '') as string,
                province: (data.province || '') as string,
                municipality: (data.municipality || '') as string,
                barangay: (data.barangay || '') as string,
                street: (data.street || '') as string,
                house_no: (data.house_no || '') as string,
                nearest_landmark: (data.nearest_landmark || '') as string,
                address_name: (data.address_name || '') as string,
                is_default: (data.is_default || false) as boolean
            });
            setOpen(false);
            setOpenForm(true);
        }}>
            <Edit className='hover:text-blue'/>
        </div>
    </div>
}

const AddressList = ({
        setOpen, 
        setOpenForm, 
        setEditAddressData,
        toast,
        setToast
    } : 
    {
        setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
        setOpenForm: React.Dispatch<React.SetStateAction<boolean>>, 
        setEditAddressData: React.Dispatch<React.SetStateAction<AddressData | null>>,
        toast: {message: string; type: "success" | "error" | "info"} | null,
        setToast: React.Dispatch<React.SetStateAction<{message: string; type: "success" | "error" | "info"} | null>>
    }) => {
    const userId = localStorage.getItem('userId');
    const fetchDeliveryAddresses = async () => {
        try {
            const response = await fetch(`${BASE_URL}/delivery_address/${userId}`, {
                method: 'GET'
            });
                const data =  await response.json();
                console.log(data);
                return data;
            } catch (error) {
                console.error(`Error fetching products: ${error}`);
        }
    }

    const {data: addresses = [], isLoading} = useQuery({
        queryKey: ['deliveryAddresses'],
        queryFn: fetchDeliveryAddresses,
    });

    if (addresses) {
        console.log(addresses)
    }

    if (isLoading) {
        return <div>Loading ...</div>
    }

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
            className="absolute inset-0 bg-gray-900 opacity-90"
            onClick={() => setOpen(false)}
        />

        {toast && (
            <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
            />
        )}

        <div className="flex flex-col justify-start gap-y-2 gap-x-5 flex-col bg-gray-800 p-3 rounded-lg shadow-lg z-10 w-100 h-[80vh]">
            <div className='flex border-b justify-between items-center'>
                <span className='text-left mx-1 py-2 text-lg font-bold'>Delivery Addresses List</span>
                <div className='flex gap-x-1 items-center cursor-pointer hover:text-blue-300' onClick={() => {
                    setEditAddressData(null);
                    setOpen(false);
                    setOpenForm(true);
                }}>
                    <span className='text-sm font-bold'>Add</span>
                    <Plus className=' font-bold mr-1' size={20} />
                </div>
                
            </div>
            {addresses && addresses.data.length !== 0 && addresses.data.map((data: Record<string, string | number | null>) => <AddressTile data={data} setEditAddressData={setEditAddressData} setOpen={setOpen} setOpenForm={setOpenForm}/>)}
        </div>
    </div>
  )
}

export default AddressList