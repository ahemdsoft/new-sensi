'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useFindOneDeviceQuery, useUpdateDeviceMutation } from '@/app/redux/services/device.service';
import { useParams, useRouter } from 'next/navigation';

interface DeviceData {
  brand: string;
  model: string;
  forCase: string[];
}

interface OptionType {
  label: string;
  value: string;
}

const CASE_OPTIONS: OptionType[] = [
  { label: '2D Case', value: '2d' },
  { label: '2D Max Case', value: '2d-max' },
  { label: 'Soft Case', value: 'soft' },
  { label: '3D Case', value: '3d-hard' },
];

const BRAND_OPTIONS: OptionType[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Samsung', value: 'samsung' },
  { label: 'Xiaomi', value: 'xiaomi' },
  { label: 'Redmi', value: 'redmi' },
  { label: 'Oppo', value: 'oppo' },
  { label: 'OnePlus', value: 'oneplus' },
  { label: 'Vivo', value: 'vivo' },
  { label: 'Realme', value: 'realme' },
  { label: 'Google Pixel', value: 'googlepixel' },
  { label: 'Tecno', value: 'tecno' },
  { label: 'Motorola', value: 'motorola' },
  { label: 'Poco', value: 'poco' },
  { label: 'Huawei', value: 'huawei' },
  { label: 'Nokia', value: 'nokia' },
  { label: 'Honor', value: 'honor' }
];

const EditDeviceForm = () => {
  const router = useRouter();
  const {id} = useParams();
  const { 
    data: deviceData, 
    error: fetchError, 
    isLoading: isFetching 
  } = useFindOneDeviceQuery(id);
  
  const [updateDevice, { isLoading: isUpdating }] = useUpdateDeviceMutation();

  const [form, setForm] = useState<DeviceData>({
    brand: '',
    model: '',
    forCase: [],
  });

  console.log(deviceData);
  // Set initial form data when data is fetched
  useEffect(() => {
    if (deviceData) {
      setForm({
        brand: deviceData.brand || '',
        model: deviceData.model || '',
        forCase: deviceData.forCase || [],
      });
    }
  }, [deviceData]);

  const handleCaseChange = (selected: readonly OptionType[] | null) => {
    setForm(prev => ({
      ...prev,
      forCase: selected ? selected.map(option => option.value) : [],
    }));
  };

  const handleBrandChange = (selected: OptionType | null) => {
    setForm(prev => ({
      ...prev,
      brand: selected?.value || '',
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDevice({ id, body: form }).unwrap();
      router.push('/admin/alldevices');

    } catch (err) {
      console.error('Failed to update device:', err);
      alert('Failed to update device.');
    }
  };

  // Get current selected values for Select components
  const selectedBrand = BRAND_OPTIONS.find(option => option.value === form.brand);
  const selectedCases = form.forCase
    .map(value => CASE_OPTIONS.find(option => option.value === value))
    .filter(Boolean) as OptionType[];

  if (isFetching) return <p>Loading device data...</p>;
  if (fetchError) return <p className="text-red-500">Failed to fetch device.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <div>
        <label className="block font-medium">Brand</label>
        <Select
          name="brand"
          options={BRAND_OPTIONS}
          onChange={handleBrandChange}
          value={selectedBrand}
          className="basic-single"
          classNamePrefix="select"
          placeholder="Select brand"
          isClearable
        />
      </div>

      <div>
        <label className="block font-medium">Model</label>
        <input
          type="text"
          name="model"
          value={form.model}
          onChange={handleInputChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium">For Case(s)</label>
        <Select
          isMulti
          name="forCase"
          options={CASE_OPTIONS}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleCaseChange}
          value={selectedCases}
          placeholder="Select case types"
        />
      </div>

      <button
        type="submit"
        disabled={isUpdating}
        className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
          isUpdating ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isUpdating ? 'Updating...' : 'Update Device'}
      </button>
    </form>
  );
};

export default EditDeviceForm;