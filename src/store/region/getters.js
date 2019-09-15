export function provinceOptions(state) {
  const opt = state.provinces.map(item => ({
    value: item.id,
    label: item.province_name,
  }));

  opt.push({ value: '0', label: 'Lainnya' });

  return opt;
}

export function cityOptions(state) {
  const opt = state.cities.map(item => ({
    value: item.id,
    label: item.city_name,
  }));

  opt.push({ value: '0', label: 'Lainnya' });

  return opt;
}
