import { useState, useEffect } from 'react';

const Selector = (
        {label, location, locations, setLocation, disabled=false} : 
        {label: string, location: string, locations: Array<Record<string, string>>, setLocation: React.Dispatch<React.SetStateAction<string>>, disabled: boolean}) => {
    return <div className='flex flex-col text-sm row-span-2'>
        <span className='text-left font-bold text-gray-300 text-xs py-1'>{label}</span>
        <select disabled={disabled} value={location} onChange={(e) => setLocation(e.target.value)} className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'>
            <option value="" disabled>
                Select {label}
            </option>
            {locations.map((option : Record<string, string>) => (
                <option key={option.code} value={option.name}>
                    {option.name}
                </option>
            ))}
        </select>
    </div>
}

const Input = (
    {label, value, setter} : 
    {label: string, value: string, setter: React.Dispatch<React.SetStateAction<string>>}
) => {
    return <div className='flex flex-col'>
        <span className='text-left font-bold text-gray-300 text-xs py-1'>{label}</span>
        <input value={value} onChange={(e) => setter(e.target.value)} type="text" className='text-black border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
    </div>
}

const AddressSelector = ({setOpenDeliveryAddress} : {setOpenDeliveryAddress: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [region, setRegion] = useState<string>('');
    const [regions, setRegions] = useState<Array<Record<any, any>>>([]);
    const [province, setProvince] = useState<string>('');
    const [provinces, setProvinces] = useState<Array<Record<any, any>>>([]);
    const [municipality, setMunicipality] = useState<string>('');
    const [municipalities, setMunicipalities] = useState<Array<Record<any, any>>>([]);
    const [barangay, setBarangay] = useState<string>('');
    const [barangays, setBarangays] = useState<Array<Record<any, any>>>([]);
    const [fname, setFname] = useState<string>('');
    const [lname, setLname] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [houseno, setHouseno] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [nearestLandmark, setNearestLandmark] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [defaultAddress, setDefaultAddress] = useState<boolean>(true);

    const createDeliverAddressPayload = () => {
        const payload = {fname, lname, contact, region, province, municipality, barangay, nearestLandmark, street, houseno, category, defaultAddress}
        return payload;
    }

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await fetch('https://psgc.gitlab.io/api/regions.json');
                const data = await response.json();
                setRegions(data);
            } catch (error) {
                console.error('Error fetching regions:', error);
            }
        };
        fetchRegions();
    }, []);

    useEffect(() => {
        if (region) {
            const regionCode = regions.find(r => r.name === region)?.code;
            if (regionCode) {
                const fetchProvinces = async () => {
                    try {
                        const response = await fetch(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces.json`);
                        const data = await response.json();
                        setProvinces(data);
                        setProvince('');
                        setMunicipalities([]);
                        setMunicipality('');
                        setBarangays([]);
                        setBarangay('');
                    } catch (error) {
                        console.log('Error fetching provinces', error);
                    }
                }
                fetchProvinces();
            }
        } else {
            setMunicipalities([]);
            setMunicipality('');
            setBarangays([]);
            setBarangay('');
        }
    }, [region, regions]);

    useEffect(() => {
        if (province) {
            const provinceCode = provinces.find(p => p.name === province)?.code;
            if (provinceCode) {
                const fetchMunicipalities = async () => {
                    try {
                        const response = await fetch(`https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities.json`);
                        const data = await response.json();
                        setMunicipalities(data);
                        setMunicipality("");
                        setBarangays([]);
                        setBarangay("");
                    } catch (error) {
                        console.log('Error fetching municipalities', error);
                    }
                }
                fetchMunicipalities();
            }
        } else {
            setBarangays([]);
            setBarangay("");
        }
    }, [province, provinces]);

    useEffect(() => {
        if (municipality) {
            const municipalityCode = municipalities.find(m => m.name === municipality)?.code;
            if (municipalityCode) {
                const fetchBarangays = async () => {
                    try {
                        const response = await fetch(`https://psgc.gitlab.io/api/cities-municipalities/${municipalityCode}/barangays.json`);
                        const data = await response.json();
                        setBarangays(data);
                        setBarangay("")
                    } catch (error) {   
                        console.log('Error fetching municipalities', error);
                    }
                } 
                fetchBarangays();
            }
        } else {
            setBarangays([]);
            setBarangay("");
        }
    }, [municipality, municipalities]);

    return (
         <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-gray-900 opacity-90"
                onClick={() => setOpenDeliveryAddress(false)}
            />

            <div className="grid grid-cols-3 justify-center gap-y-2 gap-x-5 flex-col bg-gray-800 p-6 rounded-lg shadow-lg z-10 w-100">
                <div className='col-span-3 text-gray-200 font-bold text-md text-left border-b pb-2 '>Recipient Information</div>
                
                {/* First Name */}
                <Input label="First Name" value={fname} setter={setFname}/>

                {/* Last Name */}
                <Input label='Last Name' value={lname} setter={setLname}/>

                {/* Contact Number */}
                <Input label='Contact Number' value={contact} setter={setContact}/>

                <div className='col-span-3 text-gray-200 font-bold text-md mt-5 text-left border-b pb-2 '>Address of Delivery</div>
                
                {/* Region */}
                {<Selector label="Region" location={region} locations={regions} setLocation={setRegion} disabled={false}/>}

                {/* Province */}
                {<Selector label="Province" location={province} locations={provinces} setLocation={setProvince} disabled={!region}/>}

                {/* Municipality */}
                {<Selector label="Municipality" location={municipality} locations={municipalities} setLocation={setMunicipality} disabled={!province}/>}

                {/* Barangay */}
                {<Selector label="Barangay" location={barangay} locations={barangays} setLocation={setBarangay} disabled={!municipality}/>}

                {/* Street */}
                <Input label='Street' value={street} setter={setStreet}/>

                {/* House Number */}
                <Input label='House Number' value={houseno} setter={setHouseno}/>

                {/* Instruction / Nearest Landmark */}
                <div className='flex flex-col col-span-3'>
                    <span className='text-left font-bold text-gray-300 text-xs py-1'>Instruction / Nearest Landmark</span>
                    <textarea value={nearestLandmark} onChange={(e) => setNearestLandmark(e.target.value)} className='h-15 border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'></textarea>
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
                            onChange={(e) => setCategory(e.target.value)}
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
                            onChange={(e) => setCategory(e.target.value)}
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
                            className="peer hidden"
                            onChange={() => setDefaultAddress(true)}
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
                            className="peer hidden"
                            onChange={() => setDefaultAddress(false)}
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


                <button
                    onClick={() => {
                        console.log(createDeliverAddressPayload());
                    }}
                    className="bg-gray-200 mt-5 text-black px-4 py-2 rounded hover:bg-gray-300 col-span-3"
                >
                Save
                </button>
            </div>
        </div>
    )
}

export default AddressSelector