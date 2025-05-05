/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCreateDeviceMutation } from '@/app/redux/services/device.service';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const CASE_OPTIONS = [
  { label: '2D Case', value: '2d' },
  { label: '2D Max Case', value: '2d-max' },
  { label: 'Soft Case', value: 'soft' },
  { label: '3D Case', value: '3d-hard' },
];

const BRAND_OPTIONS = [
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


const CreateDeviceForm = () => {
  const [createDevide, {data,error,isLoading}] = useCreateDeviceMutation();
  const [form, setForm] = useState({
    brand: '',
    model: '',
    forCase: [] as string[],
  });

  const handleCaseChange = (selected: any) => {
    setForm({ ...form, forCase: selected.map((option: any) => option.value) });
  };

  const handleBrandChange = (selected: any) => {
    setForm({ ...form, brand: selected?.value || '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createDevide(form);
  };

  useEffect(() => {
    if (data) {
      alert("Device created successfully");
    }
    if (error) {
      alert("Failed to create device");
    }
  }, [error, data]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <div>
        <label className="block font-medium">Brand</label>
        <Select
          name="brand"
          options={BRAND_OPTIONS}
          onChange={handleBrandChange}
          value={BRAND_OPTIONS.find(option => option.value === form.brand) || null}
          className="basic-single"
          classNamePrefix="select"
          placeholder="Select brand"
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
          value={CASE_OPTIONS.filter(option => form.forCase.includes(option.value))}
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Device
      </button>
    </form>
  );
};

export default CreateDeviceForm;
