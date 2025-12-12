import { useState, useEffect } from 'react';
import type { AddressData } from '../models/Address';
import { getUserId } from '../utils/functions';

type OnAddressDataChange = <K extends keyof AddressData>(field: K, value: AddressData[K]) => void;
type ToastType = "success" | "error" | "info";
type ShowToast = (message: string, type: ToastType) => void;

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Input = <K extends keyof AddressData>(
    {label, value, field, setter} : 
    {label: string, value: AddressData[K], field: K, setter: OnAddressDataChange}
) => {
    return <div className='flex flex-col'>
        <span className='text-left font-bold text-gray-300 text-xs py-1'>{label}</span>
        <input value={value as string} onChange={(e) => setter(field, e.target.value as AddressData[K])} type="text" className='text-black border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
    </div>
}

const AddressSelector = ({setOpen, setOpenForm, showToast, addressEditData} : {setOpen: React.Dispatch<React.SetStateAction<boolean>>, setOpenForm: React.Dispatch<React.SetStateAction<boolean>>, showToast: ShowToast, addressEditData: AddressData | null}) => {
    const [regions, setRegions] = useState<Array<Record<any, any>>>([]);
    const [provinces, setProvinces] = useState<Array<Record<any, any>>>([]);
    const [municipalities, setMunicipalities] = useState<Array<Record<any, any>>>([]);
    const [barangays, setBarangays] = useState<Array<Record<any, any>>>([]);

    const [addressData, setAddressData] = useState<AddressData>(addressEditData ? addressEditData : {
        id: '',
        recipient_fname: '', 
        recipient_lname: '', 
        contact_number: '', 
        region: '', 
        province: '', 
        municipality: '', 
        barangay: '', 
        nearest_landmark: '', 
        street: '', 
        house_no: '', 
        address_name: '', 
        is_default: true
    });

    const onAddressDataChange = <K extends keyof AddressData>(field: K, value: AddressData[K]) => {
        setAddressData((prev) => ({...prev, [field]: value}))
    };

    const uploadNewAddress = async () => {
        try {
            const response = await fetch(`${BASE_URL}/delivery_address`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payload: {
                        ...addressData,
                        user_id: getUserId()
                    }
                })
            });
                const data =  await response.json();
                console.log(data);
                return data;
            } catch (error) {
                console.error(`Error fetching products: ${error}`);
        }
    }

    const updateDeliveryAddress = async () => {
        try {
            const response = await fetch(`${BASE_URL}/delivery_address`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payload: {
                        ...addressData,
                        user_id: getUserId()
                    }
                })
            });
                const data =  await response.json();
                console.log(data);
                return data;
            } catch (error) {
                console.error(`Error fetching products: ${error}`);
        }
    }

    const fetchRegions = async () => {
        try {
            const response = await fetch('https://psgc.gitlab.io/api/regions.json');
            const data = await response.json();
            setRegions(data);
        } catch (error) {
            console.error('Error fetching regions:', error);
        }
    };

    const fetchProvinces = async (region: string) => {
        const regionCode = regions.find(r => r.name === region)?.code;
        if (regionCode) {
            try {
                const response = await fetch(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces.json`);
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.log('Error fetching provinces', error);
            }
        }
    }

    const fetchMunicipalities = async (province: string) => {
        const provinceCode = provinces.find(p => p.name === province)?.code;
        if (provinceCode) {
            try {
                const response = await fetch(`https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities.json`);
                const data = await response.json();
                setMunicipalities(data);
            } catch (error) {
                console.log('Error fetching municipalities', error);
            }
        }
    }

    const fetchBarangays = async (municipality: string) => {
        const municipalityCode = municipalities.find(m => m.name === municipality)?.code;
        if (municipalityCode) {
            try {
                const response = await fetch(`https://psgc.gitlab.io/api/cities-municipalities/${municipalityCode}/barangays.json`);
                const data = await response.json();
                setBarangays(data);
            } catch (error) {   
                console.log('Error fetching municipalities', error);
            }
        }
    }

    useEffect(() => {
        fetchRegions();
    }, []); 

    useEffect(() => {
        if (addressData.region) {
            fetchProvinces(addressData.region);
        }
    }, [regions]);

    useEffect(() => {
        if (addressData.province) {
            fetchMunicipalities(addressData.province);
        }
    }, [provinces]);

    useEffect(() => {
        if (addressData.municipality && municipalities.length > 0) {
            fetchBarangays(addressData.municipality);
        }
    }, [municipalities]);

    return (
         <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-gray-900 opacity-90"
                onClick={() => {
                    setOpenForm(false)
                    setOpen(true);
                }}
            />

            <div className="grid grid-cols-3 justify-center gap-y-2 gap-x-5 flex-col bg-gray-800 p-6 rounded-lg shadow-lg z-10 w-100">
                <div className='col-span-3 text-gray-200 font-bold text-md text-left border-b pb-2 '>Recipient Information</div>
                
                {/* First Name */}
                <Input label="First Name" value={addressData.recipient_fname} field='recipient_fname' setter={onAddressDataChange}/>

                {/* Last Name */}
                <Input label='Last Name' value={addressData.recipient_lname} field='recipient_lname' setter={onAddressDataChange}/>

                {/* Contact Number */}
                <Input label='Contact Number' value={addressData.contact_number} field='contact_number' setter={onAddressDataChange}/>

                <div className='col-span-3 text-gray-200 font-bold text-md mt-5 text-left border-b pb-2 '>Address of Delivery</div>
                
                {/* Region */}
                <div className='flex flex-col text-sm row-span-2'>
                    <span className='text-left font-bold text-gray-300 text-xs py-1'>Region</span>
                    <select value={addressData.region} onChange={(e) => {
                        onAddressDataChange('region', e.target.value as string);
                        setProvinces([]);
                        onAddressDataChange('province', '');
                        setMunicipalities([]);
                        onAddressDataChange('municipality', '');
                        setBarangays([]);
                        onAddressDataChange('barangay', '');
                        fetchProvinces(e.target.value as string);
                    }} className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'>
                        <option value="" >
                            {`${addressData.region}` || `Select Region`}
                        </option>
                        {regions.map((option : Record<string, string>) => (
                            <option key={option.code} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Province */}
                <div className='flex flex-col text-sm row-span-2'>
                    <span className='text-left font-bold text-gray-300 text-xs py-1'>Province</span>
                    <select value={addressData.province} onChange={(e) => {
                        onAddressDataChange('province', e.target.value as string);
                        setMunicipalities([]);
                        onAddressDataChange('municipality', '');
                        setBarangays([]);
                        onAddressDataChange('barangay', '');
                        fetchMunicipalities(e.target.value as string);
                    }} className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'>
                        <option value="" >
                            {`${addressData.province}` || `Select Province`}
                        </option>
                        {provinces.map((option : Record<string, string>) => (
                            <option key={option.code} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Municipality */}
                <div className='flex flex-col text-sm row-span-2'>
                    <span className='text-left font-bold text-gray-300 text-xs py-1'>Municipality</span>
                    <select value={addressData.municipality} onChange={(e) => {
                        onAddressDataChange('municipality', e.target.value as string);
                        setBarangays([]);
                        onAddressDataChange('barangay', '');
                        fetchBarangays(e.target.value as string);
                    }} className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'>
                        <option value="" >
                            {`${addressData.municipality}` || `Select Municipality`}
                        </option>
                        {municipalities.map((option : Record<string, string>) => (
                            <option key={option.code} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Barangay */}
                <div className='flex flex-col text-sm row-span-2'>
                    <span className='text-left font-bold text-gray-300 text-xs py-1'>Barangay</span>
                    <select value={addressData.barangay} onChange={(e) => {
                        onAddressDataChange('barangay', e.target.value as string);
                    }} className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'>
                        <option value="" >
                            {`${addressData.barangay}` || `Select Barangay`}
                        </option>
                        {barangays.map((option : Record<string, string>) => (
                            <option key={option.code} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Street */}
                <Input label='Street' value={addressData.street} field='street' setter={onAddressDataChange}/>

                {/* House Number */}
                <Input label='House Number' value={addressData.house_no} field='house_no' setter={onAddressDataChange}/>

                {/* Instruction / Nearest Landmark */}
                <div className='flex flex-col col-span-3'>
                    <span className='text-left font-bold text-gray-300 text-xs py-1'>Instruction / Nearest Landmark</span>
                    <textarea value={addressData.nearest_landmark} onChange={(e) => onAddressDataChange('nearest_landmark', e.target.value)} className='h-15 border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'></textarea>
                </div>
                
                {/* ADDRESS CATEGORY */}
                <div className="flex flex-col col-span-1">
                    <span className="text-sm text-left mb-1">Address Category</span>

                    <div className="flex gap-x-2">
                        {/* HOME */}
                        <label className="w-[50%] cursor-pointer">
                        <input
                            type="radio"
                            name="addressCategory"
                            value="Home"
                            className="peer hidden"
                            checked={addressData.address_name === 'Home'}
                            onChange={(e) => onAddressDataChange('address_name', e.target.value)}
                        />
                        <div
                            className="bg-white border border-gray-400 rounded py-1 text-center
                            text-gray-800 font-semibold text-sm
                            peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500"
                        >
                            Home
                        </div>
                        </label>

                        {/* OFFICE */}
                        <label className="w-[50%] cursor-pointer">
                        <input
                            type="radio"
                            name="addressCategory"
                            value="Office"
                            className="peer hidden"
                            checked={addressData.address_name === 'Office'}
                            onChange={(e) => onAddressDataChange('address_name', e.target.value)}
                        />
                        <div
                            className="bg-white border border-gray-400 rounded py-1 text-center
                            text-gray-800 font-semibold text-sm
                            peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500"
                        >
                            Office
                        </div>
                        </label>
                    </div>
                </div>

                {/* DEFAULT SHIPPING */}
                <div className="flex flex-col">
                    <span className="text-sm text-left mb-1">Default Shipping</span>

                    <div className="flex gap-x-2">
                        {/* YES */}
                        <label className="w-[50%] cursor-pointer">
                        <input
                            type="radio"
                            name="defaultShipping"
                            value="Yes"
                            checked={addressData.is_default}
                            className="peer hidden"
                            onChange={() => onAddressDataChange('is_default', true)}
                        />
                        <div
                            className="bg-white border border-gray-400 rounded py-1 text-center
                            text-gray-800 font-semibold text-sm
                            peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500"
                        >
                            Yes
                        </div>
                        </label>

                        {/* NO */}
                        <label className="w-[50%] cursor-pointer">
                        <input
                            type="radio"
                            name="defaultShipping"
                            value="No"
                            checked={!addressData.is_default}
                            className="peer hidden"
                            onChange={() => onAddressDataChange('is_default', false)}
                        />
                        <div
                            className="bg-white border border-gray-400 rounded py-1 text-center
                            text-gray-800 font-semibold text-sm
                            peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500"
                        >
                            No
                        </div>
                        </label>
                    </div>
                </div>

                <div className='flex gap-x-5 col-span-3'>
                    <button
                        onClick={async () => {
                            if (addressEditData === null) {
                                const response = await uploadNewAddress();
                                if (response.success) {
                                    showToast("Successfully saved!", "success");
                                    setOpenForm(false);
                                    setOpen(true);
                                } else {
                                    showToast("Failed to save!", "error");
                                }
                            } else {
                                const response = await updateDeliveryAddress();
                                if (response.success) {
                                    showToast("Successfully updated!", "success");
                                    setOpenForm(false);
                                    setOpen(true)
                                } else {
                                    showToast("Failed to update!", "error");
                                }
                            }
                        }}
                        className="bg-green-200 mt-5 text-black px-4 py-2 rounded hover:bg-green-300 w-[50%]"
                    >
                    Save
                    </button>
                    <button
                        onClick={async () => {
                            setOpenForm(false);
                            setOpen(true)
                        }}
                        className="bg-red-200 mt-5 text-black px-4 py-2 rounded hover:bg-red-300 w-[50%]"
                    >
                    Cancel
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default AddressSelector