import { useState, useEffect } from 'react'

const AddressSelector = () => {
    const [region, setRegion] = useState<string>('');
    const [regions, setRegions] = useState<Array<Record<any, any>>>([]);
    const [province, setProvince] = useState<string>('');
    const [provinces, setProvinces] = useState<Array<Record<any, any>>>([]);
    const [municipality, setMunicipality] = useState<string>('');
    const [municipalities, setMunicipalities] = useState<Array<Record<any, any>>>([]);
    const [barangay, setBarangay] = useState<string>('');
    const [barangays, setBarangays] = useState<Array<Record<any, any>>>([]);

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
    });

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
            setProvinces([]);
            setProvince('');
            setMunicipalities([]);
            setMunicipality('');
            setBarangays([]);
            setBarangay('');
        }
    }, [region, regions]);

    useEffect(() => {
        if (municipality) {
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
            setMunicipalities([]);
            setMunicipality("");
            setBarangays([]);
            setBarangay("");
        }
    }, [municipality, municipalities]);

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
    }, [municipality, municipalities])

    return (
        <div >
            sdfadfs jkbk kbgibkbh
        </div>
    )
}

export default AddressSelector